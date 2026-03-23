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
  const [status, setStatus] = useState('Connecting to backend server...');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch backend status
    fetch('http://localhost:3000/api/status')
      .then((res) => {
        if (res.ok) setIsConnected(true);
        return res.json();
      })
      .then((data) => setStatus(data.message))
      .catch((err) => setStatus('Backend server is currently offline'));

    // Intersection Observer for scroll animations
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

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container">
      <div className="background-blur"></div>
      
      {/* Hero Section */}
      <section className="hero-section reveal">
        <div className="glass-card header-card split-layout">
          <div className="text-content">
            <h1 className="title">
              <span className="highlight">Rintu</span> Chowdory
            </h1>
            <p className="subtitle">Full Stack Developer | Architecting Elegant Solutions</p>
            
            <div className="status-badge">
              <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
              {status}
            </div>
            <br/>
            <button className="interactive-btn" onClick={scrollToProjects}>
              View My Work
            </button>
          </div>
          <div className="image-content">
            <img 
              src="https://github.com/rintuchowdory.png" 
              alt="Rintu Chowdory" 
              className="main-profile" 
            />
          </div>
        </div>
      </section>

      {/* About Section with Generated Image */}
      <section className="about-section reveal">
         <div className="glass-card full-width">
           <div className="split-layout reverse">
             <div className="text-content">
               <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem" }}>A Passion for Technology</h2>
               <p className="project-description" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                 I am deeply passionate about cybersecurity, software engineering, and artificial intelligence. My goal is to build secure, scalable, and high-performance applications that make a tangible difference. From configuring Docker containers to deploying automated CI/CD workflows via GitHub Actions, I strive to master the full software development lifecycle.
               </p>
             </div>
             <div className="image-content">
               <img src="/hacker.png" alt="Futuristic coding setup" className="feature-image float-animation" />
             </div>
           </div>
         </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="projects-section reveal">
        <h2 className="section-title">Professional Journey</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card reveal ${project.isImportant ? 'important' : ''}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {project.isImportant && <span className="important-badge">Featured</span>}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    Live Demo ↗
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="project-link">
                    GitHub Repo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section with Parallax Image Background */}
      <section className="contact-section relative-container reveal">
        <img src="/server.png" alt="Server room" className="parallax-bg" />
        <div className="glass-card contact-card">
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Get In Touch</h2>
          <p className="subtitle" style={{ fontSize: "1rem", color: "#e2e8f0" }}>Feel free to reach out for collaborations or just a friendly hello!</p>
          
          <div className="contact-grid">
            <a href="mailto:Rintuchowdory@outlook.de" className="contact-item reveal">
              <span className="contact-label">Email</span>
              <span className="contact-value">Rintuchowdory@outlook.de</span>
            </a>
            
            <a href="tel:017666621563" className="contact-item reveal" style={{ transitionDelay: '100ms' }}>
              <span className="contact-label">Phone</span>
              <span className="contact-value">017666621563</span>
            </a>
            
            <a href="https://www.linkedin.com/in/rintu-chowdory/" target="_blank" rel="noopener noreferrer" className="contact-item reveal" style={{ transitionDelay: '200ms' }}>
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">rintu-chowdory</span>
            </a>
            
            <a href="https://github.com/rintuchowdory" target="_blank" rel="noopener noreferrer" className="contact-item reveal" style={{ transitionDelay: '300ms' }}>
              <span className="contact-label">GitHub</span>
              <span className="contact-value">rintuchowdory</span>
            </a>
            
            <a href="https://hub.docker.com/u/riinnttuu?_g" target="_blank" rel="noopener noreferrer" className="contact-item reveal" style={{ transitionDelay: '400ms' }}>
              <span className="contact-label">Docker Hub</span>
              <span className="contact-value">riinnttuu</span>
            </a>

            <div className="contact-item reveal" style={{ cursor: "default", transitionDelay: '500ms' }}>
              <span className="contact-label">Address</span>
              <span className="contact-value">Breite Strasse</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
