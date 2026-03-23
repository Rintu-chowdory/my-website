import { useState, useEffect } from 'react';
import './App.css';

const projects = [
  {
    id: 8,
    title: 'My Portfolio V1',
    description: 'My previous portfolio website showcasing my early work and journey as a developer.',
    link: 'https://my-portfolio-hazel-mu-71.vercel.app/',
    isImportant: true,
  },
  {
    id: 1,
    title: 'Recipe Vault',
    description: 'A comprehensive recipe management application designed to organize your favorite culinary creations.',
    repo: 'https://github.com/rintuchowdory/recipevault',
  },
  {
    id: 2,
    title: 'Phishing Lab',
    description: 'A cybersecurity project demonstrating common vulnerabilities and secure engineering practices.',
    repo: 'https://github.com/rintuchowdory/phishing-lab',
  },
  {
    id: 3,
    title: 'Funcall',
    description: 'A utility application focused on functional programming paradigms and clean execution.',
    repo: 'https://github.com/rintuchowdory/funcall',
  },
  {
    id: 4,
    title: 'OpenClow',
    description: 'An open-source cloud management interface focused on streamlining deployments.',
    link: 'https://openclow.vercel.app/',
  },
  {
    id: 5,
    title: 'Rintu Project',
    description: 'Personal project demonstrating core coding principles and structural design.',
    repo: 'https://github.com/rintuchowdory/Rintu-project',
  },
  {
    id: 6,
    title: 'Project Flutter Android',
    description: 'A modern mobile application developed using Flutter for high-performance cross-platform capabilities.',
    repo: 'https://github.com/rintuchowdory/Project-Flutter-Android',
  },
  {
    id: 7,
    title: 'Tesla Chatbot',
    description: 'An AI-powered conversational agent designed to handle dynamic queries about Tesla vehicles.',
    repo: 'https://github.com/rintuchowdory/tesla-chatbot',
  },
  {
    id: 9,
    title: 'Project Tesla',
    description: 'A web application providing insights and analytics for Tesla ecosystems.',
    repo: 'https://github.com/rintuchowdory/project-tesla',
  },
  {
    id: 10,
    title: 'Skills Hello GitHub Actions',
    description: 'A CI/CD implementation showcasing proficiency with automated GitHub workflows.',
    repo: 'https://github.com/rintuchowdory/skills-hello-github-actions',
  },
  {
    id: 11,
    title: 'ARM Performance Lab',
    description: 'A testing environment geared towards evaluating code performance on ARM architectures.',
    repo: 'https://github.com/rintuchowdory/arm-performance-lab',
  },
  {
    id: 12,
    title: 'My App',
    description: 'A modular React application designed as a template for scalable web development.',
    repo: 'https://github.com/rintuchowdory/my-app',
  },
  {
    id: 13,
    title: 'Current Weather App',
    description: 'A sleek, real-time application using third-party APIs to deliver accurate weather forecasts.',
    repo: 'https://github.com/rintuchowdory/CurrentWeatherApp',
  },
  {
    id: 14,
    title: 'Rintu Chowdory GitHub Page',
    description: 'Static hosting utilizing GitHub pages for portfolio and documentation distribution.',
    repo: 'https://github.com/rintuchowdory/Rintu-Chowdory.github.io',
  }
];

function App() {
  const [status, setStatus] = useState('Verifying connection...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // API Check
    fetch('http://localhost:3000/api/status')
      .then((res) => {
        if (res.ok) setIsConnected(true);
        return res.json();
      })
      .then((data) => setStatus(data.message))
      .catch(() => setStatus('System Offline. Proceed locally.'));

    // Reveal Animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      {/* Abstract Background Lines */}
      <div className="flow-background">
        <div className="flow-line"></div>
        <div className="flow-line"></div>
        <div className="flow-line"></div>
      </div>

      {/* Hero Section */}
      <section className="section-wrapper hero-section reveal">
        <div className="status-pill">
          <span className="pulse-dot"></span>
          {status}
        </div>
        
        <img 
          src="https://github.com/rintuchowdory.png" 
          alt="Rintu Chowdory" 
          className="minimal-profile" 
        />
        
        <h1 className="elegant-title">
          Where Logic <br /> Creates <span className="gradient-text">Beauty</span>
        </h1>
        
        <p className="elegant-subtitle">
          Rintu Chowdory — Full Stack Developer & Architect. Crafting seamless digital experiences through modern engineering, robust architecture, and minimalist design.
        </p>
        
        <button className="ghost-btn" onClick={() => scrollToSection('work')}>
          Explore Projects
        </button>
      </section>

      {/* About Section */}
      <section className="section-wrapper reveal">
        <p className="section-label" style={{ textAlign: "center" }}>Dissolving Boundaries</p>
        <div className="glass-panel centered-text">
          <p className="elegant-subtitle" style={{ margin: 0 }}>
            "I am deeply passionate about cybersecurity, software engineering, and artificial intelligence. My philosophy is rooted in building lightweight, highly secure, and elegant systems. From bare-metal Docker configurations to fully automated CI/CD pipelines, I thrive on constructing solutions that are completely transparent to the user, yet incredibly resilient underneath."
          </p>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="work" className="section-wrapper reveal">
        <p className="section-label">Creative Exploration</p>
        <h2 className="elegant-title" style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>Professional Journey</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`glass-panel project-panel reveal`}
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
            >
              {project.isImportant && <span className="badge-featured">Featured</span>}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              
              <div style={{ display: 'flex', gap: '1.5rem' }}>
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

      {/* Contact Matrix */}
      <section className="section-wrapper reveal" style={{ marginTop: '0', paddingBottom: '6rem' }}>
        <h2 className="elegant-title" style={{ fontSize: '2.5rem', marginBottom: '4rem', textAlign: 'center' }}>Establish Connection</h2>
        
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
            <span className="node-value">Breite Strasse</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
