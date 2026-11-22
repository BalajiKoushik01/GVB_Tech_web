import { useEffect, useRef, useState } from 'react';

const origin = 'https://www.photopea.com';
type Status = 'closed' | 'loading' | 'ready' | 'sending' | 'receiving' | 'failed';

export function LayerWorkspace({ snapshot, onArtwork }: {
  snapshot: () => Promise<ArrayBuffer>;
  onArtwork: (file: File) => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<Status>('closed');
  const [message, setMessage] = useState('');
  const pending = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== origin || event.source !== frame.current?.contentWindow) return;
      if (event.data === 'done') {
        if (status === 'receiving' && pending.current) setMessage('The editor returned no artwork. Check the active document and try again.');
        pending.current = false;
        if (status !== 'failed') setStatus('ready');
      } else if (pending.current && event.data instanceof ArrayBuffer) {
        pending.current = false;
        const bytes = new Uint8Array(event.data);
        if (bytes.length > 20 * 1024 * 1024 || ![137,80,78,71,13,10,26,10].every((v,i) => bytes[i] === v)) {
          setMessage('Return a PNG under 20 MB.');
          return;
        }
        onArtwork(new File([bytes], 'layer-composite.png', { type: 'image/png' }));
        setMessage('Composite loaded as source artwork. Review its dimensions and palette before extracting.');
      }
    }
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [status, onArtwork]);
  useEffect(() => {
    if (!['loading','sending','receiving'].includes(status)) return;
    const id = setTimeout(() => {
      pending.current = false;
      setStatus('failed');
      setMessage('The hosted editor did not respond. Save any open PSD before closing and reopening.');
    }, 45000);
    return () => clearTimeout(id);
  }, [status]);
  async function send() {
    const target = frame.current?.contentWindow;
    setStatus('sending');
    setMessage('');
    try {
      const buffer = await snapshot();
      if (target && target === frame.current?.contentWindow) target.postMessage(buffer, origin, [buffer]);
    } catch {
      if (mounted.current) { setStatus('ready'); setMessage('Could not render the current design.'); }
    }
  }
  return <section><h2>Layer workspace</h2>
    <p>Use Photopea for masks, text, brushes and layered PSD files. Sending a copy shares the visible design with the hosted editor. Returned artwork is a flattened PNG with a new palette assignment.</p>
    {status === 'closed' ? <button onClick={() => { setStatus('loading'); setMessage(''); }}>Open Photopea workspace</button> : <>
      <div className="button-row">
        <button disabled={status !== 'ready'} onClick={send}>Send current design copy</button>
        <button disabled={status !== 'ready'} onClick={() => {
          setStatus('receiving'); pending.current = true; setMessage('');
          frame.current?.contentWindow?.postMessage('app.activeDocument.saveToOE("png");', origin);
        }}>Return active artwork</button>
        <button onClick={() => { if (window.confirm('Close the layer workspace? Save your layered PSD first.')) {
          pending.current = false; setStatus('closed'); setMessage('');
        } }}>Close workspace</button>
      </div>
      <iframe ref={frame} title="Photopea layer editor" src={origin} sandbox="allow-scripts allow-same-origin allow-downloads" referrerPolicy="no-referrer" style={{width:'100%',height:'72vh',border:0}} />
      <p role="status">{message || (status === 'loading' ? 'Loading Photopea…' : '')}</p>
    </>}
  </section>;
}
