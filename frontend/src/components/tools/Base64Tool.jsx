import { useState } from 'react';

const enc = (s) => { try { return btoa(unescape(encodeURIComponent(s))); } catch { return '⚠ Invalid input'; } };
const dec = (s) => { try { return decodeURIComponent(escape(atob(s.trim()))); } catch { return '⚠ Not valid Base64'; } };

export default function Base64Tool() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const run = (m = mode, val = input) => {
    setOutput(val ? (m === 'encode' ? enc(val) : dec(val)) : '');
    setCopied(false);
  };

  return (
    <div className="tool">
      <div className="tool-head">
        <span className="tool-icon">🧬</span>
        <h3>Base64 Lab</h3>
      </div>
      <div className="b64-modes">
        <button className={`chip chip-lg ${mode === 'encode' ? 'chip-on' : ''}`} onClick={() => { setMode('encode'); run('encode'); }}>Encode</button>
        <button className={`chip chip-lg ${mode === 'decode' ? 'chip-on' : ''}`} onClick={() => { setMode('decode'); run('decode'); }}>Decode</button>
      </div>
      <textarea
        className="b64-io"
        placeholder={mode === 'encode' ? 'Type text to encode…' : 'Paste Base64 to decode…'}
        value={input}
        onChange={(e) => { setInput(e.target.value); run(mode, e.target.value); }}
      />
      <textarea className="b64-io b64-out" readOnly value={output} placeholder="Result appears here…" />
      <button
        className="tool-btn"
        onClick={() => { navigator.clipboard?.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        disabled={!output}
      >
        {copied ? '✓ Copied to clipboard' : 'Copy result'}
      </button>
    </div>
  );
}
