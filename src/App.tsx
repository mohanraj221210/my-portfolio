import { FormEvent, useState, useEffect, useRef } from 'react';
import { CyberBackgroundCanvas } from './components/CyberBackground';
import { CosmicIntroExperience } from './components/CosmicIntroExperience';
import { PowerSkillsStage } from './components/PowerSkillsStage';
import { AboutStatsGrid } from './components/AboutStatsGrid';
import { LeadershipShowcase } from './components/LeadershipShowcase';
import { CertificationsGrid } from './components/CertificationsGrid';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { RocketExperienceTimeline } from './components/RocketExperienceTimeline';
import { StoryArcTimeline } from './components/StoryArcTimeline';
import { ContactSignalTerminal } from './components/ContactSignalTerminal';
import { EducationShowcase } from './components/EducationShowcase';
import { TechResearchFooter } from './components/TechResearchFooter';
import {
  AboutStartupBackgroundMotif,
  SkillsProductBackgroundMotif,
  ProjectsDevelopingBackgroundMotif,
  MedalsTrophiesBackgroundMotif,
} from './components/SectionMotifs';
import {
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  Download,
  GraduationCap,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Terminal,
  Trophy,
  Users,
  Wrench,
  X,
  Layers,
  Cpu,
  Flame,
  Activity,
  Award,
  Zap,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { soundEngine } from './utils/soundEffects';
import resumePdf from './assets/pdfs/Mohan_Raj_Resume.pdf';

type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  stack: string[];
  tone: string;
  mark: string;
  image: string;
  github: string;
  demo: string;
  status: 'LIVE' | 'IN DEVELOPMENT' | 'CONCEPT';
};

const navItems = ['About', 'Education', 'Skills', 'Projects', 'Experience', 'Leadership', 'Certifications', 'Contact'];

const projectsData: Project[] = [
  {
    id: 'permigo',
    number: '01',
    title: 'PermiGo',
    subtitle: 'Outpass Management System',
    description: 'A paperless campus outpass system replacing manual permission slips with real-time warden approvals and instant QR verification for 500+ students.',
    features: ['Role-based portal for wardens, security & students', 'Real-time push approval status tracking', 'Instant QR-code gate verification', 'Admin analytics request history dashboard'],
    stack: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express'],
    tone: 'cyan',
    mark: 'PG',
    image: '/permigo-3d.png',
    github: 'https://github.com/mohanraj22121/10final',
    demo: '#',
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'jitconnect',
    number: '02',
    title: 'JITConnect',
    subtitle: 'Alumni Connect Platform',
    description: 'A mobile-first community platform bridging students and alumni for mentorship, career networking, and event participation.',
    features: ['Student & alumni career profiles', 'Notice board & campus event feed with RSVP', 'In-app direct mentorship messaging', 'Alumni directory search'],
    stack: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    tone: 'violet',
    mark: 'JC',
    image: '/jitconnect-3d.png',
    github: 'https://github.com/Sanjay15jitconnectapp',
    demo: '#',
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'noticeboard',
    number: '03',
    title: 'JIT Digital Notice Board',
    subtitle: 'QR-Based Digital Notice Platform',
    description: 'A paperless notice broadcast system where students scan a QR code on campus to instantly read official announcements without an app.',
    features: ['Instant QR scan notice reading', 'Admin panel for scheduled posts', 'Category filtering & emergency alerts', 'Mobile-first layout'],
    stack: ['React', 'Node.js', 'MongoDB', 'QR Code'],
    tone: 'blue',
    mark: 'DN',
    image: '/noticeboard-3d.png',
    github: 'https://github.com/mohanraj221210/jit-qr',
    demo: '#',
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'scholara',
    number: '04',
    title: 'Scholara',
    subtitle: 'Multi-School Management System',
    description: 'A unified school management platform handling admissions, attendance, examinations, fee tracking, and parent communications across multi-school networks.',
    features: ['Multi-school role access portals', 'Automated exam & grade calculations', 'Fee status alerts & receipts', 'Parent notice broadcast channel'],
    stack: ['React', 'Express', 'MongoDB', 'JWT'],
    tone: 'cyan',
    mark: 'SC',
    image: '/scholara-3d.png',
    github: 'https://github.com/Rithikhan/SMMS',
    demo: '#',
    status: 'IN DEVELOPMENT',
  },
  {
    id: 'crewplay',
    number: '05',
    title: 'CrewPlay',
    subtitle: 'Sports Technology Platform',
    description: 'Full-stack sports management application for teams to schedule matches, maintain player rosters, record scores, and build local sports communities.',
    features: ['Team & roster creation', 'Match scheduling & live scoreboards', 'Player stat tracking & leaderboards', 'Community sports highlight feed'],
    stack: ['MERN', 'REST API', 'JWT', 'AWS'],
    tone: 'orange',
    mark: 'CP',
    image: '/crewplay-3d.png',
    github: 'https://github.com/venky15200/crewplay',
    demo: '#',
    status: 'IN DEVELOPMENT',
  },
];



export function App() {
  const [booting, setBooting] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [avatarMode, setAvatarMode] = useState<'3d' | 'vector'>('3d');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'leadership', 'certifications', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });

      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, .project-card-3d, .skill-category-card, .stat-glass-card')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const [isAudioMuted, setIsAudioMuted] = useState(soundEngine.getMuted());

  const handleAudioToggle = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) {
      soundEngine.playClick();
    }
  };

  return (
    <div className="site-shell">
      {/* Custom Cyber Cursor */}
      <div className="custom-cursor-dot" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />
      <div className={`custom-cursor-ring ${cursorHovered ? 'active' : ''}`} style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} />

      {/* Dynamic Cyber Canvas & Data Matrix Background */}
      <CyberBackgroundCanvas />
      <div className="noise-overlay" />

      {/* Cosmic Meteor Impact & Welcoming 3D Anime Developer Intro */}
      {booting && (
        <CosmicIntroExperience
          onComplete={() => {
            setBooting(false);
          }}
        />
      )}

      {/* Floating Glass Navbar */}
      <header className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav-container container">
          <button
            className="nav-brand"
            onClick={() => scrollTo('home')}
            onMouseEnter={() => soundEngine.playHover()}
            aria-label="Go to home"
          >
            <span className="nav-brand-mark">MR</span>
            <div className="nav-brand-text">
              <div className="nav-brand-title">MOHAN RAJ</div>
              <div className="nav-brand-sub">FULL STACK DEVELOPER</div>
            </div>
          </button>

          <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item}
                className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => scrollTo(item.toLowerCase())}
              >
                {item}
              </button>
            ))}

            {/* Audio SFX Mute Toggle Button */}
            <button
              className="sound-hud-toggle-btn"
              onClick={handleAudioToggle}
              onMouseEnter={() => soundEngine.playHover()}
              title={isAudioMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label="Toggle sound effects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                background: 'rgba(0, 229, 255, 0.08)',
                border: '1px solid rgba(0, 229, 255, 0.25)',
                color: isAudioMuted ? '#94A3B8' : '#00E5FF',
                font: '600 11px JetBrains Mono',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isAudioMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isAudioMuted ? 'SFX OFF' : 'SFX ON'}</span>
            </button>

            <a
              className="nav-cta-btn"
              href="mailto:m.mohanraj2212@gmail.com"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
            >
              LET&apos;S TALK <ArrowUpRight size={14} />
            </a>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => {
              soundEngine.playClick();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero-section container">
          <div className="hero-copy-col">
            <div className="hero-tag">
              <span className="pulse-dot" /> &lt; DEVELOPER.PORTFOLIO /&gt;
            </div>
            <h1 className="hero-main-title">
              MOHAN<br />RAJ
            </h1>
            <span className="hero-highlight-title">FULL STACK DEVELOPER</span>
            <p className="hero-description">
              Building scalable web applications, intelligent systems and meaningful digital experiences.
            </p>

            <div className="hero-btn-group">
              <button
                className="cyber-button primary"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => scrollTo('projects')}
              >
                EXPLORE PROJECTS <Zap size={16} />
              </button>
              <a
                className="cyber-button ghost"
                href={resumePdf || '/Mohan_Raj_Resume.pdf'}
                download="Mohan_Raj_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                DOWNLOAD RESUME <Download size={15} />
              </a>
            </div>

            <div className="hero-socials">
              <a
                className="social-pill"
                href="https://github.com/mohanraj22121"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                <Github size={15} /> GitHub
              </a>
              <a
                className="social-pill"
                href="https://www.linkedin.com/in/mohanraj2212"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                className="social-pill"
                href="mailto:m.mohanraj2212@gmail.com"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => soundEngine.playClick()}
              >
                <Mail size={15} /> Email
              </a>
            </div>
          </div>

          <div className="hero-visual-col" ref={heroVisualRef}>
            <div className="avatar-mode-switch">
              <button
                className={avatarMode === '3d' ? 'active' : ''}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setAvatarMode('3d');
                }}
              >
                3D Render
              </button>
              <button
                className={avatarMode === 'vector' ? 'active' : ''}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setAvatarMode('vector');
                }}
              >
                Vector Art
              </button>
            </div>

            <div
              className="avatar-scene-box"
              style={{
                transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
              }}
            >
              {avatarMode === '3d' ? (
                <div className="avatar-3d-frame">
                  <img src="/developer-avatar.png" alt="Mohan Raj - 3D Developer Avatar" className="avatar-img-element" />
                  <div className="scanline-overlay" />
                </div>
              ) : (
                <div className="avatar-3d-frame" style={{ background: '#0D263D', display: 'grid', placeItems: 'center' }}>
                  <Code2 size={120} color="#00E5FF" />
                </div>
              )}

              {/* Floating Holographic 3D HUD Panels */}
              <div
                className="hud-panel panel-building"
                style={{ transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 40px)` }}
              >
                <div>BUILDING...</div>
                <div className="hud-progress-bar"><i /></div>
              </div>

              <div
                className="hud-panel panel-deploying"
                style={{ transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 20}px, 60px)` }}
              >
                <div>DEPLOYING...</div>
                <div style={{ fontSize: '8px', color: '#c4b5fd', marginTop: '3px' }}>&gt; API ONLINE</div>
              </div>

              <div
                className="hud-panel panel-status"
                style={{ transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * 30}px, 30px)` }}
              >
                <div>SYSTEM STATUS</div>
                <div style={{ fontSize: '8px', color: '#6ee7b7', marginTop: '3px' }}>OPTIMAL ● 100%</div>
              </div>

              <div
                className="hud-panel panel-tech"
                style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * -30}px, 50px)` }}
              >
                REACT // NODE // AI
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (ABOUT.EXE) */}
        <section id="about" className="section-wrapper container">
          <AboutStartupBackgroundMotif />
          <div className="about-split-grid">
            <div className="about-text-content">
              <div className="section-label-chip">
                <Cpu size={15} /> ABOUT.EXE // SYSTEM PROFILE
              </div>
              <h2 className="section-main-title">ABOUT ME</h2>
              <p className="section-subtitle-text">Building technology with creativity and purpose.</p>

              <p className="about-lead-p">
                I’m Mohan Raj, a Full-Stack Developer from Kancheepuram, India, currently pursuing my B.Tech in Information Technology.

                I started with simple curiosity about how websites and applications work. That curiosity slowly became a habit of building, breaking, fixing, and learning. Every project has taught me something new and helped me grow not just as a developer, but as a problem solver.
              </p>
              <p>
                Today, I enjoy turning ideas into useful products and working on things that can make everyday life a little simpler. Beyond coding, I’m actively involved in IEEE and student community activities, where I get to lead, organize, collaborate, and learn from people around me.
              </p>

              <div className="about-tags-row">
                <span className="about-tag-chip"><MapPin size={14} /> Kancheepuram, IN</span>
                <span className="about-tag-chip"><BrainCircuit size={14} /> B.Tech Information Technology</span>
                <span className="about-tag-chip"><Trophy size={14} /> IEEE Chairman</span>
              </div>
            </div>

            <div className="profile-card-3d">
              <div className="profile-header">
                <div>
                  <div style={{ font: '700 20px Space Grotesk', color: '#fff' }}>MOHAN RAJ</div>
                  <div style={{ font: '500 11px JetBrains Mono', color: 'var(--primary-accent)' }}>FULL STACK DEVELOPER</div>
                </div>
                <ShieldCheck size={28} color="var(--primary-accent)" />
              </div>

              <p style={{ font: '13px/1.6 Manrope', color: 'var(--secondary-text)' }}>
                Specializing in Full Stack Architecture, AI/ML Integrations, RESTful Services, and Community Tech Leadership.
              </p>

              <AboutStatsGrid />
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="section-wrapper container">
          <div className="section-label-chip">
            <GraduationCap size={15} /> ACADEMICS // EDUCATIONAL BACKGROUND
          </div>
          <h2 className="section-main-title">EDUCATION & ACADEMICS</h2>

          <EducationShowcase />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="section-wrapper container">
          <SkillsProductBackgroundMotif />
          <div className="section-label-chip">
            <Layers size={15} /> TECH STACK // SYSTEM CAPABILITIES
          </div>
          <h2 className="section-main-title">CAPABILITIES</h2>

          {/* Interactive 3D Power Skills Studio Stage with Developer Avatar & Hologram Video Inspector */}
          <PowerSkillsStage />
        </section>



        {/* PROJECTS SECTION */}
        <section id="projects" className="section-wrapper container">
          <ProjectsDevelopingBackgroundMotif />
          <div className="section-label-chip">
            <Flame size={15} /> PROJECTS // DEPLOYED MISSIONS
          </div>
          <h2 className="section-main-title">SELECTED MISSIONS</h2>

          {/* Futuristic Holographic Pedestal Base Projects Grid & Modal Inspector */}
          <ProjectsShowcase />
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section-wrapper container">
          <div className="section-label-chip">
            <Terminal size={15} /> EXPERIENCE // CAREER ASCENT
          </div>
          <h2 className="section-main-title">MISSION EXPERIENCE</h2>

          {/* Interactive Rocket Starship Ascent Space Experience Timeline */}
          <RocketExperienceTimeline />
        </section>

        {/* IEEE LEADERSHIP SECTION */}
        <section id="leadership" className="section-wrapper container">
          <LeadershipShowcase />
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="section-wrapper container">
          <MedalsTrophiesBackgroundMotif />
          <div className="section-label-chip">
            <Award size={15} /> CERTIFICATIONS // ACHIEVEMENTS
          </div>
          <h2 className="section-main-title">COLLECTIBLES</h2>

          <CertificationsGrid />
        </section>

        {/* DEVELOPER JOURNEY */}
        <section className="section-wrapper container">
          <div className="section-label-chip">
            <Activity size={15} /> DEVELOPER JOURNEY // CHECKPOINTS
          </div>
          <h2 className="section-main-title">STORY ARC</h2>

          <StoryArcTimeline />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section-wrapper container">
          <ContactSignalTerminal />
        </section>
      </main>

      {/* R&D TECHNICAL RESEARCH ANIMATED FOOTER WITH FLOATING 3D OBJECTS */}
      <TechResearchFooter />
    </div>
  );
}

export default App;
