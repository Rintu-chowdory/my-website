import { useEffect, useState } from 'react';

const ZONES = [
  { city: 'Aachen', tz: 'Europe/Berlin' },
  { city: 'London', tz: 'Europe/London' },
  { city: 'New York', tz: 'America/New_York' },
  { city: 'Dubai', tz: 'Asia/Dubai' },
  { city: 'India', tz: 'Asia/Kolkata' },
  { city: 'Singapore', tz: 'Asia/Singapore' },
  { city: 'Tokyo', tz: 'Asia/Tokyo' },
  { city: 'Sydney', tz: 'Australia/Sydney' },
];

export default function WorldClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const local = ZONES[0];

  return (
    <div className="tool">
      <div className="tool-head">
        <span className="tool-icon">🌍</span>
        <h3>World Clock</h3>
      </div>
      <div className="clock-featured">
        <span className="clock-city">{local.city}</span>
        <span className="clock-time">
          {new Intl.DateTimeFormat('en-GB', { timeZone: local.tz, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now)}
        </span>
        <span className="clock-date">
          {new Intl.DateTimeFormat('en-GB', { timeZone: local.tz, weekday: 'long', day: 'numeric', month: 'short' }).format(now)}
        </span>
      </div>
      <ul className="clock-list">
        {ZONES.slice(1).map(({ city, tz }) => {
          const h = Number(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', hour12: false }).format(now));
          const night = h >= 22 || h < 6;
          return (
            <li key={city} className="clock-row">
              <span className="clock-row-city">{city}</span>
              <span className="clock-row-time">
                {new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' }).format(now)}
              </span>
              <span className={`clock-day ${night ? 'clock-night' : ''}`}>{night ? '🌙' : '☀️'}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
