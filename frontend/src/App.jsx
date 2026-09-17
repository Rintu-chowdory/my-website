import { useEffect, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import WorldClock from './components/tools/WorldClock';
import PasswordGenerator from './components/tools/PasswordGenerator';
import Base64Tool from './components/tools/Base64Tool';
import WeatherWidget from './components/tools/WeatherWidget';
import ColorPalette from './components/tools/ColorPalette';
import SystemPanel from './components/tools/SystemPanel';

const projects = [
  {
    id: 8,
    title: 'My Portfolio V1',
    description: 'My previous portfolio website showcasing my early work and journey as a developer.',
    link: 'https://my-portfolio-hazel-mu-71.vercel.app/',
    isImportant: true,
    tags: ['HTML', 'CSS', 'Vercel'],
  },
  {
    id: 2,
    title: 'Phishing Lab',
    description: 'A cybersecurity project demonstrating common vulnerabilities and secure engineering practices.',
    repo: 'https://github.com/rintuchowdory/phishing-lab',
    tags: ['Security', 'Node.js'],
  },
  {
    id: 9,
    title: 'Project Tesla',
    description: 'A web application providing insights and analytics for Tesla ecosystems.',
    repo: 'https://github.com/rintuchowdory/project-tesla',
    tags: ['React', 'Analytics'],
  },
  {
    id: 7,
    title: 'Tesla Chatbot',
    description: 'An AI-powered conversational agent designed to handle dynamic queries about Tesla vehicles.',
    repo: 'https://github.com/rintuchowdory/tesla-chatbot',
    tags: ['AI', 'Python'],
  },
  {
    id: 1,
    title: 'Recipe Vault',
    description: 'A comprehensive recipe management application designed to organize your favorite culinary creations.',
    repo: 'https://github.com/rintuchowdory/recipevault',
    tags: ['Full Stack', 'API'],
  },
  {
    id: 13,
    title: 'Current Weather App',
    description: 'A sleek, real-time application using third-party APIs to deliver accurate weather forecasts.',
    repo: 'https://github.com/rintuchowdory/CurrentWeatherApp',
    tags: ['API', 'JavaScript'],
  },
  {
    id: 4,
    title: 'OpenClow',
    description: 'An open-source cloud management interface focused on streamlining deployments.',
    link: 'https://openclow.vercel.app/',
    tags: ['Cloud', 'Vercel'],
  },
  {
    id: 10,
    title: 'Skills Hello GitHub Actions',
    description: 'A CI/CD implementation showcasing proficiency with automated GitHub workflows.',
    repo: 'https://github.com/rintuchowdory/skills-hello-github-actions',
    tags: ['CI/CD', 'GitHub Actions'],
  },
  {
    id: 11,
    title: 'ARM Performance Lab',
    description: 'A testing environment geared towards evaluating code performance on ARM architectures.',
    repo: 'https://github.com/rintuchowdory/arm-performance-lab',
    tags: ['ARM', 'Benchmarking'],
  },
  {
    id: 6,
    title: 'Project Flutter Android',
    description: 'A modern mobile application developed using Flutter for high-performance cross-platform capabilities.',
    repo: 'https://github.com/rintuchowdory/Project-Flutter-Android',
    tags: ['Flutter', 'Mobile'],
  },
  {
    id: 12,
    title: 'My App',
    description: 'A modular React application designed as a template for scalable web development.',
    repo: 'https://github.com/rintuchowdory/my-app',
    tags: ['React', 'Vite'],
  },
  {
    id: 3,
    title: 'Funcall',
    description: 'A utility application focused on functional programming paradigms and clean execution.',
    repo: 'https://github.com/rintuchowdory/funcall',
    tags: ['Functional', 'JS'],
  },
  {
    id: 5,
    title: 'Rintu Project',
    description: 'Personal project demonstrating core coding principles and structural design.',
    repo: 'https://github.com/rintuchowdory/Rintu-project',
    tags: ['Design', 'JS'],
  },
  {
    id: 14,
    title: 'Rintu Chowdory GitHub Page',
    description: 'Static hosting utilizing GitHub pages for portfolio and documentation distribution.',
    repo: 'https://github.com/rintuchowdory/Rintu-Chowdory.github.io',
    tags: ['GitHub Pages'],
  },
];

const skills = [
  { name: 'DevOps & CI/CD', level: 88 },
  { name: 'Docker & Containers', level: 84 },
  { name: 'Linux Administration', level: 86 },
  { name: 'React / Frontend', level: 80 },
  { name: 'Node.js / APIs', level: 78 },
  { name: 'Cybersecurity', level: 74 },
];

function App() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    observerRef.current = observer;
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />

      <Navbar onNavigate={scrollToSection} />

      {/* Hero */}
      <section id="home" className="section-wrapper hero-section reveal">
        <div className="hero-avatar-wrap">
          <img
            src="https://github.com/rintuchowdory.png"
            alt="Rintu Chowdory"
            className="minimal-profile"
          />
          <span className="hero-ring" />
        </div>
        <div className="status-pill">
          <span className="pulse-dot" />
          Available for new opportunities
        </div>
        <h1 className="elegant-title">
          Where Logic <br /> Creates <span className="gradient-text">Beauty</span>
        </h1>
        <p className="elegant-subtitle">
          Rintu Chowdory — Full Stack Developer & Architect. Crafting seamless digital experiences
          through modern engineering, robust architecture, and minimalist design.
        </p>
        <div className="hero-actions">
          <button className="solid-btn" onClick={() => scrollToSection('dashboard')}>
            Open Dashboard
          </button>
          <button className="ghost-btn" onClick={() => scrollToSection('work')}>
            Explore Projects
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat"><span className="hero-stat-n">14+</span><span className="hero-stat-l">Projects</span></div>
          <div className="hero-stat"><span className="hero-stat-n">6</span><span className="hero-stat-l">Live Tools</span></div>
          <div className="hero-stat"><span className="hero-stat-n">∞</span><span className="hero-stat-l">Curiosity</span></div>
        </div>
      </section>

      {/* About */}
      <section className="section-wrapper reveal">
        <p className="section-label" style={{ textAlign: 'center' }}>Dissolving Boundaries</p>
        <div className="glass-panel centered-text">
          <p className="elegant-subtitle" style={{ margin: 0 }}>
            "I am deeply passionate about cybersecurity, software engineering, and artificial intelligence.
            My philosophy is rooted in building lightweight, highly secure, and elegant systems. From bare-metal
            Docker configurations to fully automated CI/CD pipelines, I thrive on constructing solutions that
            are completely transparent to the user, yet incredibly resilient underneath."
          </p>
        </div>
        <div className="skills-row">
          {skills.map((s) => (
            <div key={s.name} className="skill-chip">
              <span className="skill-name">{s.name}</span>
              <span className="skill-bar"><span className="skill-fill" style={{ width: `${s.level}%` }} /></span>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard */}
      <section id="dashboard" className="section-wrapper reveal">
        <p className="section-label">Engineer&apos;s Toolkit</p>
        <h2 className="elegant-title section-title">Live Dashboard</h2>
        <p className="section-sub">Six tools that run entirely in your browser — no accounts, no tracking, no backend required.</p>
        <div className="dashboard-grid">
          <WorldClock />
          <WeatherWidget />
          <PasswordGenerator />
          <Base64Tool />
          <ColorPalette />
          <SystemPanel />
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="section-wrapper reveal">
        <p className="section-label">Creative Exploration</p>
        <h2 className="elegant-title section-title">Professional Journey</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="glass-panel project-panel reveal"
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
            >
              {project.isImportant && <span className="badge-featured">Featured</span>}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              {project.tags && (
                <div className="project-tags">
                  {project.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
              )}
              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Explore App →
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
                    Source Code →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-wrapper reveal" style={{ marginTop: '0', paddingBottom: '4rem' }}>
        <p className="section-label">Handshake Protocols</p>
        <h2 className="elegant-title section-title">Establish Connection</h2>
        <div className="contact-matrix">
          <a href="mailto:Rintuchowdory@outlook.de" className="contact-node">
            <span className="node-label">Transmissions</span>
            <span className="node-value">Rintuchowdory@outlook.de</span>
          </a>
          <a href="tel:017666621563" className="contact-node">
            <span className="node-label">Voice</span>
            <span className="node-value">017666621563</span>
          </a>
          <a href="https://www.linkedin.com/in/rintu-chowdory/" target="_blank" rel="noopener noreferrer" className="contact-node">
            <span className="node-label">Professional</span>
            <span className="node-value">LinkedIn Profile</span>
          </a>
          <a href="https://github.com/rintuchowdory" target="_blank" rel="noopener noreferrer" className="contact-node">
            <span className="node-label">Repositories</span>
            <span className="node-value">GitHub Account</span>
          </a>
          <a href="https://hub.docker.com/u/riinnttuu?_g" target="_blank" rel="noopener noreferrer" className="contact-node">
            <span className="node-label">Containers</span>
            <span className="node-value">Docker Hub</span>
          </a>
          <div className="contact-node" style={{ cursor: 'default' }}>
            <span className="node-label">Location Base</span>
            <span className="node-value">Aachen, Germany</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Rintu Chowdory</span>
        <span className="footer-sep">·</span>
        <span>React + Vite · Docker · Deployed on GitHub Pages</span>
      </footer>
    </div>
  );
}

export default App;
