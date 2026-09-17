import { useState } from 'react';

// Simple HSL harmony generator — no dependencies.
const SCHEMES = [
  { name: 'Analogous', fn: (h) => [h, (h + 30) % 360, (h + 60) % 360, (h + 330) % 360, (h + 300) % 360] },
  { name: 'Complement', fn: (h) => [h, (h + 180) % 360, (h + 20) % 360, (h + 200) % 360, (h + 160) % 360] },
  { name: 'Triadic', fn: (h) => [h, (h + 120) % 360, (h + 240) % 360, (h + 60) % 360, (h + 300) % 360] },
  { name: 'Mono', fn: (h) => [h, h, h, h, h] },
];

export default function ColorPalette() {
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 360));
  const [scheme, setScheme] = useState(0);
  const [copied, setCopied] = useState('');

  const hues = SCHEMES[scheme].fn(seed);
  const colors = hues.map((h, i) => {
    const s = SCHEMES[scheme].name === 'Mono' ? 60 - i * 8 : 65;
    const l = SCHEMES[scheme].name === 'Mono' ? 20 + i * 15 : [58, 48, 66, 40, 72][i];
    return `hsl(${h} ${s}% ${l}%)`;
  });

  return (
    <div className="tool">
      <div className="tool-head">
        <span className="tool-icon">🎨</span>
        <h3>Palette Forge</h3>
      </div>
      <div className="palette">
        {colors.map((c) => (
          <button
            key={c}
            className="palette-swatch"
            style={{ background: c }}
            onClick={() => { navigator.clipboard?.writeText(c); setCopied(c); setTimeout(() => setCopied(''), 1200); }}
            title={copied === c ? 'Copied!' : `Copy ${c}`}
          />
        ))}
      </div>
      <p className="strength-label">{copied ? `Copied ${copied}` : 'Click a swatch to copy its HSL'}</p>
      <div className="pw-opts">
        {SCHEMES.map((s, i) => (
          <button key={s.name} className={`chip ${i === scheme ? 'chip-on' : ''}`} onClick={() => setScheme(i)}>{s.name}</button>
        ))}
      </div>
      <button className="tool-btn" onClick={() => setSeed(Math.floor(Math.random() * 360))}>Generate New Palette</button>
    </div>
  );
}
