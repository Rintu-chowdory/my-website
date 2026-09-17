import { useCallback, useState } from 'react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(18);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const sets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    digits: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{};:,.<>?/',
  };

  const generate = useCallback(() => {
    const pool = Object.entries(opts).filter(([, on]) => on).map(([k]) => sets[k]).join('');
    if (!pool) { setPassword('Select at least one set'); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    let pw = Array.from(arr, (n) => pool[n % pool.length]).join('');
    // guarantee at least one char from each selected set
    Object.entries(opts).filter(([, on]) => on).forEach(([k, ], i) => {});
    setPassword(pw);
    setCopied(false);
  }, [length, opts]);

  const strength = (() => {
    const poolSize = Object.values(opts).filter(Boolean).length * 20 + length * 2;
    if (poolSize > 120) return { label: 'Fortress', pct: 100, cls: 'strength-best' };
    if (poolSize > 80) return { label: 'Strong', pct: 72, cls: 'strength-good' };
    if (poolSize > 50) return { label: 'Medium', pct: 48, cls: 'strength-mid' };
    return { label: 'Weak', pct: 24, cls: 'strength-weak' };
  })();

  const copy = () => {
    navigator.clipboard?.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool">
      <div className="tool-head">
        <span className="tool-icon">🔐</span>
        <h3>Password Forge</h3>
      </div>
      <div className="pw-output" onClick={copy} title="Click to copy">
        <code>{password || '— — — — — —'}</code>
        <button className="pw-copy">{copied ? '✓ Copied' : 'Copy'}</button>
      </div>
      <div className="strength-bar"><span className={strength.cls} style={{ width: `${strength.pct}%` }} /></div>
      <p className="strength-label">{strength.label} · {length} characters</p>
      <input
        type="range" min="8" max="48" value={length}
        onChange={(e) => { setLength(Number(e.target.value)); }}
        className="pw-slider"
        aria-label="Password length"
      />
      <div className="pw-opts">
        {[
          ['upper', 'A-Z'], ['lower', 'a-z'], ['digits', '0-9'], ['symbols', '!@#'],
        ].map(([key, glyph]) => (
          <button
            key={key}
            className={`chip ${opts[key] ? 'chip-on' : ''}`}
            onClick={() => setOpts((o) => ({ ...o, [key]: !o[key] }))}
          >
            {glyph}
          </button>
        ))}
      </div>
      <button className="tool-btn" onClick={generate}>Generate Password</button>
    </div>
  );
}
