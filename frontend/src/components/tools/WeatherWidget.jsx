import { useEffect, useState } from 'react';

const WMO = {
  0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Icy fog', 51: 'Light drizzle', 53: 'Drizzle', 55: 'Dense drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Showers', 82: 'Violent showers', 95: 'Thunderstorm', 96: 'Storm + hail',
};

const ICONS = { sun: '☀️', moon: '🌙', cloud: '☁️', rain: '🌧️', snow: '❄️', storm: '⛈️', fog: '🌫️' };

function pick(code, isDay) {
  if (code === 0 || code === 1) return isDay ? ICONS.sun : ICONS.moon;
  if ([45, 48].includes(code)) return ICONS.fog;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return ICONS.rain;
  if ([71, 73, 75].includes(code)) return ICONS.snow;
  if ([95, 96].includes(code)) return ICONS.storm;
  return ICONS.cloud;
}

export default function WeatherWidget() {
  const [city, setCity] = useState('Aachen');
  const [query, setQuery] = useState('Aachen');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`).then((r) => r.json());
        const loc = geo?.results?.[0];
        if (!loc) throw new Error('not found');
        const wx = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,is_day`).then((r) => r.json());
        if (cancelled) return;
        setData({ name: loc.name, country: loc.country, ...wx.current });
      } catch {
        if (!cancelled) { setData(null); setError(`No results for "${query}"`); }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="tool">
      <div className="tool-head">
        <span className="tool-icon">🌦️</span>
        <h3>Live Weather</h3>
      </div>
      <form
        className="wx-form"
        onSubmit={(e) => { e.preventDefault(); setQuery(city.trim() || 'Aachen'); }}
      >
        <input className="wx-input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search any city…" />
        <button className="tool-btn" type="submit" disabled={loading}>{loading ? '…' : 'Go'}</button>
      </form>
      {error && <p className="wx-error">{error}</p>}
      {data && (
        <div className="wx-main">
          <span className="wx-icon">{pick(data.weather_code, data.is_day)}</span>
          <span className="wx-temp">{Math.round(data.temperature_2m)}°C</span>
        </div>
      )}
      {data && (
        <>
          <p className="wx-city">{data.name}{data.country ? `, ${data.country}` : ''}</p>
          <div className="wx-grid">
            <div className="wx-stat"><span className="wx-k">Condition</span><span className="wx-v">{WMO[data.weather_code] ?? '—'}</span></div>
            <div className="wx-stat"><span className="wx-k">Humidity</span><span className="wx-v">{data.relative_humidity_2m}%</span></div>
            <div className="wx-stat"><span className="wx-k">Wind</span><span className="wx-v">{data.wind_speed_10m} km/h</span></div>
          </div>
        </>
      )}
    </div>
  );
}
