import type { Metadata } from 'next';
import Studio from './Studio';

export const metadata: Metadata = {
  title: 'Try WeaveCore',
  description: 'Edit indexed saree artwork, reuse motifs and export an 8-bit BMP with the WeaveCore browser trial.',
  alternates: { canonical: '/tools/weavecore' },
};

export default function WeaveCoreTrial() {
  return (
    <>
      <section className="weavecore-intro">
        <div>
          <p className="weavecore-kicker">GVB TECH · TEXTILE DESIGN</p>
          <h1>Try WeaveCore</h1>
          <p>Edit silk saree artwork, inspect repeats, and export an indexed BMP. Start with the sample design or open an image from your device.</p>
        </div>
      </section>
      <Studio />
    </>
  );
}
