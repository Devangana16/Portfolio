import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── section accent colours ─── */
const ACCENTS = {
  home: '#e8b84b',
  about: '#5b8cf7',
  skills: '#e05252',
  training: '#4dc9a0',
  work: '#2ecc71',
  certs: '#3bcab5',
  feats: '#b87ef7',
  history: '#9b59b6',
  contact: '#f0855a',
};

const SECTIONS = ['home', 'about', 'skills', 'training', 'work', 'certs', 'feats', 'history', 'contact'];
const LABELS = ['Intro', 'About', 'Expertise', 'Training', 'Work', 'Certs', 'Feats', 'Education', 'Contact'];

/* ─── animation preset ─── */
const rise = (d = 0) => ({
  initial: { opacity: 0, y: 40, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: .9, delay: d, ease: [.25, 1, .5, 1] },
});

function Preloader() {
  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, transition: { duration: .8, ease: 'easeInOut' } }}
    >
      <motion.div
        className="loader-logo"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Devangana Suresh
      </motion.div>
      <div className="loader-bar-wrap">
        <motion.div
          className="loader-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, ease: [.65, 0, .35, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const [active, setActive] = useState('home');
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const acc = ACCENTS[active] || ACCENTS.home;

  /* ── track active section via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { root: mainRef.current, threshold: 0.4 }
    );
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ══════════════════════════ RENDER ══════════════════════════ */
  return (
    <div className="layout">

      {/* ═══ SIDEBAR ═══ */}
      <aside className="sidebar">
        {/* background glow blob that changes with accent */}
        <div className="sidebar-accent" style={{ background: acc }} />

        <div>
          <p className="sidebar-logo">D.S</p>

          {/* Profile photo */}
          <div className="sidebar-photo-wrap">
            <div
              className="sidebar-photo-ring"
              style={{
                backgroundImage: `linear-gradient(#0e0e11, #0e0e11), linear-gradient(135deg, ${acc}, transparent 60%)`
              }}
            />
            <img src="/avatar.png" alt="Devangana Suresh" className="sidebar-photo" />
          </div>

          <h1 className="sidebar-name">Devangana<br />Suresh</h1>
          <p className="sidebar-role">
            <span style={{ color: acc, transition: 'color 1s' }}>Developer · Security Analyst</span>
          </p>

          <nav className="dot-nav">
            {SECTIONS.map((id, i) => (
              <a key={id} className={`dot-item ${active === id ? 'active' : ''}`}
                href={`#${id}`}
                onClick={e => { e.preventDefault(); scrollTo(id); }}>
                <span className="dot" style={active === id ? { background: acc, boxShadow: `0 0 10px ${acc}80` } : {}} />
                {LABELS[i]}
              </a>
            ))}
          </nav>
        </div>

        <div className="sidebar-links" style={{ marginTop: '2.2rem' }}>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <a href="https://github.com/Devangana16" target="_blank" rel="noopener noreferrer" className="sidebar-link" title="GitHub">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://linkedin.com/in/devangana-suresh-" target="_blank" rel="noopener noreferrer" className="sidebar-link" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:devanganasuresh70@gmail.com" className="sidebar-link" title="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>
      </aside>

      {/* ═══ SCROLLABLE RIGHT PANE ═══ */}
      <main className="main" ref={mainRef}>

        {/* ── INTRO ── */}
        <section id="home" className="panel">
          <div className="panel-num">01</div>
          <div className="panel-content">
            <motion.p className="eyebrow" style={{ color: ACCENTS.home }} {...rise(0)}>
              Security Analyst &amp; Developer
            </motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>
              Code that works.<br />
              Security that holds.
            </motion.h2>
            <motion.p className="panel-body" {...rise(0.2)}>
              I'm a Computer Science undergraduate who believes that building software and
              securing it are two sides of the same discipline. My work spans full-stack
              engineering and cybersecurity — not as separate paths, but as one integrated practice.
            </motion.p>
            <motion.div style={{ marginTop: '2.5rem' }} {...rise(0.3)}>
              <a href="/docs/Specialised_CV.pdf" target="_blank" rel="noopener noreferrer" className="sidebar-resume-btn" style={{ width: 'fit-content', padding: '1rem 2rem', fontSize: '.75rem' }}>
                View Resume 🗒️
              </a>
            </motion.div>
            
            <motion.div 
              style={{ position: 'absolute', bottom: '2rem', left: '0', display: 'flex', alignItems: 'center', gap: '1rem', color: 'rgba(255,255,255,.2)', fontSize: '.7rem', letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'var(--fd)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, currentColor)' }} />
              Scroll
            </motion.div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="panel">
          <div className="panel-num">02</div>
          <div className="panel-content">
            <motion.p className="eyebrow" style={{ color: ACCENTS.about }} {...rise(0)}>About</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>Where I come from.</motion.h2>
            <motion.p className="panel-body" {...rise(0.2)}>
              I'm a Computer Science undergraduate at Lovely Professional University,
              spending my time at the intersection of software engineering and offensive security.
              I build full-stack products — then probe them for weaknesses the way an adversary
              would. That dual lens shapes every technical decision I make.
            </motion.p>
            <motion.p className="panel-body" style={{ marginTop: '1.25rem' }} {...rise(0.3)}>
              I co-ordinated a hands-on cybersecurity awareness event that reached 150+
              participants, and I consistently use hackathons as a pressure-cooker for sharpening
              cross-functional problem solving.
            </motion.p>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="panel" style={{ alignItems: 'flex-start', paddingTop: '7rem' }}>
          <div className="panel-num">03</div>
          <div style={{ width: '100%', maxWidth: '900px', position: 'relative', zIndex: 1 }}>
            <motion.p className="eyebrow" style={{ color: ACCENTS.skills }} {...rise(0)}>Skills</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>The technical stack.</motion.h2>
            <div className="skills-grid">
              {[
                { label: 'Core Languages', items: ['C', 'C++', 'Java', 'Python', 'JavaScript'] },
                { label: 'Web & Frameworks', items: ['React', 'Node.js', 'Express', 'MongoDB', 'HTML / CSS'] },
                { label: 'Security Tools', items: ['Kali Linux', 'Nmap', 'SQLMap', 'Burp Suite', 'Metasploit'] },
                { label: 'Infrastructure', items: ['Ubuntu', 'VMware', 'Docker', 'MySQL', 'GitHub'] },
              ].map((g, i) => (
                <motion.div key={g.label} className="skill-box" {...rise(i * 0.1)}>
                  <p className="skill-box-label" style={{ color: ACCENTS.skills }}>{g.label}</p>
                  <ul className="skill-list">
                    {g.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '4rem' }}>
              <motion.p className="skill-box-label" style={{ color: ACCENTS.skills }} {...rise(0)}>Soft Skills</motion.p>
              <motion.div className="pills" {...rise(0.1)}>
                {['Critical Thinking', 'Project Coordination', 'Event Planning', 'Problem Solving', 'Communication', 'Teamwork'].map(s => (
                  <span key={s} className="pill">{s}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TRAINING ── */}
        <section id="training" className="panel">
          <div className="panel-num">04</div>
          <div className="panel-content">
            <motion.p className="eyebrow" style={{ color: ACCENTS.training }} {...rise(0)}>Training</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>Practical Defense.</motion.h2>
            <div className="milestones-grid">
              <motion.a href="/docs/CEH.pdf" target="_blank" rel="noopener noreferrer" className="milestone" {...rise(0.2)} style={{ textDecoration: 'none', borderLeft: `2px solid ${ACCENTS.training}` }}>
                <div className="milestone-icon" style={{ background: `${ACCENTS.training}20`, color: ACCENTS.training }}>⚡</div>
                <div>
                  <p className="milestone-tag" style={{ color: ACCENTS.training }}>Cybersecurity</p>
                  <h3 className="milestone-title">Certified Ethical Hacking</h3>
                  <p className="milestone-detail">Lab-based training covering reconnaissance, enumeration, exploitation, and post-exploitation hardening <br />(Jun–Jul 2025).</p>
                </div>
              </motion.a>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="work" className="panel" style={{ alignItems: 'flex-start', paddingTop: '7rem' }}>
          <div className="panel-num">05</div>
          <div style={{ width: '100%', position: 'relative', zIndex: 1, maxWidth: '700px' }}>
            <motion.p className="eyebrow" style={{ color: ACCENTS.work }} {...rise(0)}>Work</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>What I've shipped.</motion.h2>
            <div className="project-cards">
              {[
                {
                  year: '2025', name: 'Log Analyzer',
                  desc: 'A pattern-matching engine in Java that ingests system logs, clusters anomalous events, and produces security reports.',
                  chips: ['Java', 'Maven', 'DevOps', 'Git'],
                  href: 'https://github.com/Devangana16/Log_Analyzer',
                },
                {
                  year: '2025', name: 'API Hub',
                  desc: 'A centralized platform for discovering and testing public APIs with integrated documentation and live testing environments.',
                  chips: ['React', 'HTML5', 'CSS3', 'JavaScript'],
                  href: 'https://github.com/Devangana16',
                },
                {
                  year: '2025', name: 'Fitness Tracker',
                  desc: 'A comprehensive health monitoring system built with the MERN stack. Features workout logging, progress visualization, and personalized goal setting.',
                  chips: ['MongoDB', 'Express', 'React', 'Node.js'],
                  href: 'https://github.com/Devangana16/FitTracker',
                },
                {
                  year: '2025', name: 'Coffee Shop Website',
                  desc: 'Elegant, responsive landing page for a boutique coffee house with interactive menu, reservation system, and smooth scroll animations.',
                  chips: ['HTML5', 'CSS3', 'JavaScript'],
                  href: 'https://github.com/Devangana16/Bean-Dreams---Coffee-Shop',
                },
                {
                  year: '2024', name: 'AI Carbon Predictor',
                  desc: 'ML pipeline on AWS achieving 87% accuracy on emission forecasting; exports live reduction dashboards.',
                  chips: ['Python', 'AWS', 'ML Models', 'React'],
                  href: 'https://github.com/jani-sha04/promptBUILDER',
                },
                {
                  year: '2024', name: 'Mental Health Chatbot',
                  desc: 'A diagnostic conversational tool using a strict 10-node decision flow. Flags at-risk responses automatically.',
                  chips: ['Python', 'HTML5', 'CSS3', 'JavaScript'],
                  href: 'https://github.com/anugrahk21/CODE-A-HAUNT-ANUDEV',
                },
              ].map((p, i) => (
                <motion.a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
                  className="project-card" {...rise(i * 0.12)}
                  style={{ borderLeftColor: ACCENTS.work }}>
                  <p className="project-year">{p.year}</p>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-chips">
                    {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTS ── */}
        <section id="certs" className="panel">
          <div className="panel-num">06</div>
          <div className="panel-content">
            <motion.p className="eyebrow" style={{ color: ACCENTS.certs }} {...rise(0)}>Certifications</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>Verified Expertise.</motion.h2>
            <div className="milestones-grid">
              {[
                { title: 'Master Generative AI (ChatGPT & More)', org: 'Udemy / 2025', href: '/docs/Master Generative AI & Generative AI tools (ChatGPT & more).pdf' },
                { title: 'Computational Theory: Language Principles', org: 'Infosys / 2025', href: '/docs/TOC.pdf' },
                { title: 'Privacy and Security in Social Media', org: 'NPTEL / 2025', href: '/docs/NPTEL Privacy and Security in Online Social Media.pdf' },
                { title: 'Computer Communications', org: 'Coursera / 2024', href: '/docs/Coursera Computer Communication.pdf' },
                { title: 'The Bits and Bytes of Networking', org: 'Coursera / 2024', href: '/docs/Cousera Bits and Bytes of Networking.pdf' },
                { title: 'Mastering in C: Basic to Beyond', org: 'CSE Pathshala / 2024', href: '/docs/CSE Pathshala C Language.pdf' }
              ].map((c, i) => (
                <motion.a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="milestone" {...rise(i * 0.1)} style={{ textDecoration: 'none', borderLeft: `2px solid ${ACCENTS.certs}` }}>
                  <div className="milestone-icon" style={{ background: `${ACCENTS.certs}20`, color: ACCENTS.certs }}>🛡️</div>
                  <div>
                    <p className="milestone-tag" style={{ color: ACCENTS.certs }}>Industry</p>
                    <h3 className="milestone-title">{c.title}</h3>
                    <p className="milestone-detail">{c.org}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATS ── */}
        <section id="feats" className="panel">
          <div className="panel-num">07</div>
          <div className="panel-content">
            <motion.p className="eyebrow" style={{ color: ACCENTS.feats }} {...rise(0)}>Achievements</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>Impact made.</motion.h2>
            <div className="milestones-grid">
              <motion.div className="milestone" {...rise(0.2)} style={{ borderLeft: `2px solid ${ACCENTS.feats}` }}>
                <div className="milestone-icon" style={{ background: `${ACCENTS.feats}20`, color: ACCENTS.feats }}>🏆</div>
                <div>
                  <p className="milestone-tag" style={{ color: ACCENTS.feats }}>Co-curricular</p>
                  <h3 className="milestone-title">Workshop Coordinator</h3>
                  <p className="milestone-detail">Successfully led a cybersecurity awareness drive reaching 150+ participants across campus.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HISTORY ── */}
        <section id="history" className="panel" style={{ alignItems: 'flex-start', paddingTop: '7rem' }}>
          <div className="panel-num">08</div>
          <div style={{ width: '100%', maxWidth: '650px', position: 'relative', zIndex: 1 }}>
            <motion.p className="eyebrow" style={{ color: ACCENTS.history }} {...rise(0)}>History</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>Education.</motion.h2>
            <div className="tl">
              {[
                { date: '2023 → 2027', title: 'B.Tech Computer Science', org: 'Lovely Professional University, Punjab', note: 'CGPA 8.18' },
                { date: '2021 → 2023', title: 'Intermediate Secondary (High School)', org: 'Placid Vidya Vihar, Kerala', note: 'Score: 84.2%' },
                { date: '2019 → 2021', title: 'Matriculation (Secondary)', org: 'Indian School Dammam, Saudi Arabia', note: 'Score: 89.2%' },
              ].map((item, i) => (
                <motion.div key={i} className="tl-item" {...rise(i * 0.08)}>
                  <div className="tl-side">
                    <p className="tl-date">{item.date}</p>
                  </div>
                  <div>
                    <p className="tl-title">{item.title}</p>
                    <p className="tl-org" style={{ color: ACCENTS.history }}>{item.org}</p>
                    {item.note && <p className="tl-note">{item.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="panel">
          <div className="panel-num">09</div>
          <div className="panel-content" style={{ maxWidth: '800px', width: '100%' }}>
            <motion.p className="eyebrow" style={{ color: ACCENTS.contact }} {...rise(0)}>Contact</motion.p>
            <motion.h2 className="panel-title" {...rise(0.1)}>
              Let's connect.
            </motion.h2>
            <motion.p className="panel-body" {...rise(0.2)}>
              Open to security engineering and developer roles. Reach out via email or any of the platforms below.
            </motion.p>

            <motion.div className="contact-row-grid" {...rise(0.3)}>
              <a href="mailto:devanganasuresh70@gmail.com" className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="contact-card-label">Email</p>
                  <p className="contact-card-value">devanganasuresh70@gmail.com</p>
                </div>
              </a>
            </motion.div>

            <motion.div className="contact-row-grid" {...rise(0.4)}>
              <a href="https://linkedin.com/in/devangana-suresh-" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20 }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </div>
                <div>
                  <p className="contact-card-label">LinkedIn</p>
                  <p className="contact-card-value">devangana-suresh-</p>
                </div>
              </a>
              <a href="https://github.com/Devangana16" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20 }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </div>
                <div>
                  <p className="contact-card-label">GitHub</p>
                  <p className="contact-card-value">Devangana16</p>
                </div>
              </a>
            </motion.div>

            <motion.div style={{ marginTop: '3rem' }} {...rise(0.5)}>
              <div className="availability-badge">
                <span className="avail-dot" /> Open to new opportunities
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Loader */}
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
    </div>
  );
}

