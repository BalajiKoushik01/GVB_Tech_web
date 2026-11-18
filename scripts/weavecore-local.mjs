import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { setTimeout as delay } from 'node:timers/promises';

const model = process.env.WEAVECORE_VISION_MODEL || 'qwen3-vl:4b';
const endpoint = 'http://127.0.0.1:11434';
const require = createRequire(import.meta.url);
const ollamaEnv = { ...process.env, OLLAMA_HOST: '127.0.0.1:11434' };

async function isOllamaRunning() {
  try {
    const response = await fetch(endpoint + '/api/version', {
      signal: AbortSignal.timeout(1000),
      redirect: 'error',
    });
    return response.ok && typeof (await response.json()).version === 'string';
  } catch {
    return false;
  }
}

let activeChild;
function run(command, args, env) {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { stdio: 'inherit', env });
    activeChild = process;
    process.once('error', reject);
    process.once('exit', (code, signal) => {
      activeChild = undefined;
      if (code === 0) resolve();
      else reject(Error(`${command} exited with ${signal || code}.`));
    });
  });
}

let service;
function stopOwnedService() {
  if (service && service.exitCode === null) service.kill();
}
process.once('exit', stopOwnedService);
for (const [signal, code] of [['SIGINT', 130], ['SIGTERM', 143]]) {
  process.once(signal, () => {
    activeChild?.kill(signal);
    process.exit(code);
  });
}

try {
  if (!await isOllamaRunning()) {
    const available = spawnSync('ollama', ['--version'], { stdio: 'ignore', env: ollamaEnv });
    if (available.error?.code === 'ENOENT') {
      throw Error('Install Ollama from https://ollama.com/download and run this command again.');
    }
    if (available.error) throw available.error;
    service = spawn('ollama', ['serve'], { stdio: 'ignore', env: ollamaEnv });
    service.on('error', error => console.error(`Ollama service: ${error.message}`));
    let ready = false;
    for (let attempt = 0; attempt < 24; attempt++) {
      if (await isOllamaRunning()) {
        ready = true;
        break;
      }
      if (service.exitCode !== null) break;
      await delay(500);
    }
    if (!ready) throw Error('Ollama could not start on 127.0.0.1:11434.');
  }

  const tags = await fetch(endpoint + '/api/tags', { signal: AbortSignal.timeout(3000), redirect: 'error' });
  if (!tags.ok) throw Error('Could not read installed Ollama models.');
  const installed = (await tags.json()).models;
  if (!installed?.some(entry => entry.name === model)) {
    console.log(`Downloading ${model} for the first run…`);
    await run('ollama', ['pull', model], ollamaEnv);
  }

  console.log('Open http://127.0.0.1:3000/tools/weavecore to analyze a saree photo on this computer.');
  await run(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', '3000'], {
    ...process.env,
    WEAVECORE_VISION_ENABLED: 'true',
    WEAVECORE_VISION_PROVIDER: 'ollama',
    WEAVECORE_VISION_MODEL: model,
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  stopOwnedService();
}
