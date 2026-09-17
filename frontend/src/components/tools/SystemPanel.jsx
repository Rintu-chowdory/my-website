import { useEffect, useState } from 'react';

export default function SystemPanel() {
  const [status, setStatus] = useState('Checking…');
  const [online, setOnline] = useState(null);
  const [uptime, setUptime] = useState(0);
  const [visits, setVisits] = useState(null);

  useEffect(() => {
    fetch('/api/status')
      .then((r) => { setOnline(r.ok); return r.ok ? r.json() : Promise.reject(); })
      .then((d) => setStatus(d.message))
      .catch(() => { setOnline(false); setStatus('Static deployment — client mode'); });

    try {
      const v = Number(localStorage.getItem('rc-visits') || '0') + 1;
      localStorage.setItem('rc-visits', String(v));
      setVisits(v);
    } catch { setVisits(null); }

    const t = setInterval(() => setUptime((u) => u + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const hhmmss = (s) => `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="tool">
      <div className="tool-head">
        <span className="tool-icon">📡</span>
        <h3>System Panel</h3>
      </div>
      <div className="sys-status">
        <span className={`pulse-dot ${online === false ? 'dot-off' : ''}`} />
        <span>{status}</span>
      </div>
      <div className="sys-grid">
        <div className="sys-stat">
          <span className="wx-k">Session uptime</span>
          <span className="sys-v">{hhmmss(uptime)}</span>
        </div>
        <div className="sys-stat">
          <span className="wx-k">Your visits</span>
          <span className="sys-v">{visits ?? '—'}</span>
        </div>
        <div className="sys-stat">
          <span className="wx-k">Local time</span>
          <span className="sys-v">{new Date().toLocaleTimeString('en-GB')}</span>
        </div>
        <div className="sys-stat">
          <span className="wx-k">Connection</span>
          <span className="sys-v">{online ? 'API Online' : online === false ? 'Client Mode' : '…'}</span>
        </div>
      </div>
    </div>
  );
}
