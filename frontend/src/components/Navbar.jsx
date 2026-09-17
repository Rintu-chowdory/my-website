import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'work', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function Navbar({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
      const current = sections.find((s) => s.getBoundingClientRect().top <= 120);
      if (current) setActive(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav-solid' : ''}`}>
      <button className="nav-logo" onClick={() => onNavigate('home')}>
        RC<span className="nav-logo-dot">.</span>
      </button>
      <div className="nav-links">
        {LINKS.map((l) => (
          <button
            key={l.id}
            className={`nav-link ${active === l.id ? 'nav-link-active' : ''}`}
            onClick={() => onNavigate(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <a className="nav-cta" href="https://github.com/rintuchowdory" target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </nav>
  );
}

export default Navbar;
