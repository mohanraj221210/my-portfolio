import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal as TerminalIcon,
  Cpu,
  Radio,
  Zap,
  ArrowUp,
  Github,
  Linkedin,
  Mail,
  FileText,
  ShieldCheck,
  Activity,
  Globe,
  Compass,
  Code2,
  Sparkles,
  Database,
  Network,
  Rocket,
  Flame,
  Orbit,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import resumePdf from '../assets/pdfs/Mohan_Raj_Resume.pdf';

interface ResearchNode {
  id: string;
  code: string;
  title: string;
  category: string;
  status: string;
  progress: number;
  description: string;
  techStack: string[];
  metrics: string;
  color: string;
}

const RESEARCH_NODES: ResearchNode[] = [
  {
    id: 'fullstack-arch',
    code: 'LAB-01',
    title: 'Distributed Full-Stack Systems',
    category: 'SOFTWARE ARCHITECTURE',
    status: 'ACTIVE RESEARCH',
    progress: 92,
    description: 'Investigating high-throughput MERN architecture, zero-trust JWT authentication, and event-driven microservices for campus-scale platforms.',
    techStack: ['React 18/19', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    metrics: '500+ Concurrent Users / <15ms Latency',
    color: '#00E5FF',
  },
  {
    id: 'ai-agents',
    code: 'LAB-02',
    title: 'Autonomous AI & LLM Systems',
    category: 'INTELLIGENT COMPUTING',
    status: 'EXPERIMENTAL',
    progress: 88,
    description: 'Exploring agentic AI workflows, context-aware prompt chaining, and intelligent automated approval pipelines for admin workflows.',
    techStack: ['OpenAI APIs', 'Python', 'Vector DBs', 'LangChain', 'TypeScript'],
    metrics: '99.4% Decision Accuracy',
    color: '#A855F7',
  },
  {
    id: 'campus-iot',
    code: 'LAB-03',
    title: 'QR & Real-Time Security Protocol',
    category: 'IOT & SMART CAMPUS',
    status: 'FIELD DEPLOYED',
    progress: 100,
    description: 'Engineering paperless QR gate verification and instant outpass approval tracking via PermiGo & JIT Digital Notice systems.',
    techStack: ['QR Engine', 'WebSockets', 'REST APIs', 'Flutter', 'JWT'],
    metrics: '100% Gate Clearance Rate',
    color: '#10B981',
  },
  {
    id: 'cloud-edge',
    code: 'LAB-04',
    title: 'Cloud Native & Edge Infrastructure',
    category: 'DEVOPS & INFRASTRUCTURE',
    status: 'OPTIMIZING',
    progress: 85,
    description: 'Designing serverless API gateways, edge caching strategies, and automated CI/CD deployment pipelines on Vercel and AWS.',
    techStack: ['AWS', 'Docker', 'Vercel Edge', 'GitOps', 'Nginx'],
    metrics: '99.99% Uptime Guarantee',
    color: '#F59E0B',
  },
];

const TERMINAL_LOGS_POOL = [
  '[SYS_INIT] R&D Tech Radar core online.',
  '[SPACECRAFT] Rocket Starship telemetry locked... Trajectory to Earth 100%',
  '[NET_SCAN] Scanning node PermiGo QR Gate engine... Ping 12ms [STABLE]',
  '[COMPILER] Vite v5.4 bundle optimized. Gzip size: 18.8kB',
  '[AI_LAB] Context window optimization complete (4096 tokens).',
  '[IEEE_NODE] IEEE JIT Student Branch Chairman network operational.',
  '[DB_STREAM] MongoDB Shard replica sync verified.',
  '[SECURITY] SSL/TLS 256-bit encryption verified for all endpoints.',
  '[R&D_STATUS] 4 Research Projects Active // 0 System Warnings',
];

const FLOATING_TECH_OBJECTS = [
  { id: 1, label: '<MERN_STACK />', icon: Code2, x: '6%', y: '12%', duration: 18, color: '#00E5FF' },
  { id: 2, label: 'SPACESHIP_ORBIT', icon: Rocket, x: '85%', y: '16%', duration: 22, color: '#A855F7' },
  { id: 3, label: 'QR_SECURITY_GATE', icon: ShieldCheck, x: '5%', y: '55%', duration: 25, color: '#10B981' },
  { id: 4, label: 'EARTH_STATION', icon: Globe, x: '90%', y: '60%', duration: 20, color: '#F59E0B' },
  { id: 5, label: 'IEEE_LEADERSHIP', icon: Zap, x: '12%', y: '82%', duration: 24, color: '#00E5FF' },
  { id: 6, label: 'DATABASE_SHARD', icon: Database, x: '84%', y: '85%', duration: 19, color: '#38BDF8' },
];

export const TechResearchFooter: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('fullstack-arch');
  const [themeColor, setThemeColor] = useState<string>('#00E5FF');
  const [logIndex, setLogIndex] = useState<number>(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>(TERMINAL_LOGS_POOL.slice(0, 4));

  const activeNode = RESEARCH_NODES.find((n) => n.id === selectedNodeId) || RESEARCH_NODES[0];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        const nextIdx = (prev + 1) % TERMINAL_LOGS_POOL.length;
        const newLog = TERMINAL_LOGS_POOL[nextIdx];
        setTerminalLogs((current) => [...current.slice(-4), newLog]);
        return nextIdx;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="tech-rd-footer-section">
      {/* Animated Glowing Top Border Beam */}
      <div className="rd-footer-beam-line" style={{ background: `linear-gradient(90deg, transparent 0%, ${themeColor} 50%, transparent 100%)` }} />

      {/* ========================================================= */}
      {/* SPACESHIP / ROCKET FLYING TOWARD EARTH ANIMATION STAGE    */}
      {/* ========================================================= */}
      <div className="space-animation-container">
        {/* Glowing Planet Earth Sphere */}
        <div className="planet-earth-sphere" style={{ '--glow-color': themeColor } as React.CSSProperties}>
          <div className="earth-atmosphere-glow" />
          <div className="earth-continents-texture" />
          <div className="earth-orbit-ring">
            <span className="earth-satellite-dot" style={{ background: themeColor }} />
          </div>
          <div className="earth-title-label">
            <Globe size={13} color={themeColor} />
            <span>PLANET EARTH // DESTINATION</span>
          </div>
        </div>

        {/* Flying Spaceship / Rocket Approaching Earth */}
        <div className="flying-spaceship-wrapper" style={{ '--thruster-c': themeColor } as React.CSSProperties}>
          <div className="spaceship-ship-container">
            <Rocket size={42} className="spaceship-icon" color="#ffffff" />
            <div className="spaceship-plasma-thruster">
              <span className="flame-core" style={{ background: themeColor, boxShadow: `0 0 20px ${themeColor}` }} />
              <span className="flame-spark spark-1" />
              <span className="flame-spark spark-2" />
              <span className="flame-spark spark-3" />
            </div>
          </div>
          <div className="spaceship-flight-trail" style={{ background: `linear-gradient(270deg, ${themeColor}66 0%, transparent 100%)` }} />
        </div>

        {/* 3D Wireframe Spinning Cubes */}
        <div className="floating-3d-cube cube-left">
          <div className="cube-face front" style={{ borderColor: themeColor }} />
          <div className="cube-face back" style={{ borderColor: themeColor }} />
          <div className="cube-face right" style={{ borderColor: themeColor }} />
          <div className="cube-face left" style={{ borderColor: themeColor }} />
          <div className="cube-face top" style={{ borderColor: themeColor }} />
          <div className="cube-face bottom" style={{ borderColor: themeColor }} />
        </div>

        {/* Floating Technical Badges */}
        {FLOATING_TECH_OBJECTS.map((obj) => {
          const ObjIcon = obj.icon;

          return (
            <motion.div
              key={obj.id}
              className="space-floating-tech-obj"
              style={{
                left: obj.x,
                top: obj.y,
                '--accent-c': obj.color,
              } as React.CSSProperties}
              animate={{
                y: [0, -16, 0, 16, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: obj.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.15, zIndex: 30 }}
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
            >
              <div className="space-obj-inner">
                <ObjIcon size={14} color={obj.color} />
                <span>{obj.label}</span>
                <span className="obj-pulse-light" style={{ background: obj.color }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="container rd-footer-content-wrapper">
        {/* R&D RESEARCH HUB CONTROL HEADER */}
        <div className="rd-hub-header">
          <div className="rd-hub-title-group">
            <div className="rd-live-badge">
              <span className="rd-live-pulse-dot" style={{ backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}` }} />
              <Radio size={14} color={themeColor} />
              <span className="highlighted-word-glow">R&D TECH LAB // MISSION: SPACECRAFT RE-ENTRY</span>
            </div>
            <h3 className="rd-main-heading">
              <span className="neon-highlight-text">TECHNICAL INNOVATION</span> & <span className="neon-gradient-word">SYSTEM RESEARCH LAB</span>
            </h3>
          </div>

          {/* Theme Selector Palette Buttons */}
          <div className="rd-theme-palette-controls">
            <span className="palette-label">SYSTEM THEME:</span>
            {[
              { label: 'CYAN', color: '#00E5FF' },
              { label: 'VIOLET', color: '#A855F7' },
              { label: 'GREEN', color: '#10B981' },
              { label: 'AMBER', color: '#F59E0B' },
            ].map((theme) => (
              <button
                key={theme.label}
                className={`theme-chip-btn ${themeColor === theme.color ? 'active' : ''}`}
                style={{ '--theme-c': theme.color } as React.CSSProperties}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setThemeColor(theme.color);
                }}
              >
                <span className="theme-color-dot" style={{ background: theme.color }} />
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2-COLUMN RADAR VISUALIZER & LIVE DETAILS STAGE */}
        <div className="rd-research-stage-grid">
          {/* LEFT: Interactive Holographic Radar Reticle */}
          <div className="rd-radar-canvas-card">
            <div className="radar-screen-ring">
              <div className="radar-sweep-beam" style={{ background: `conic-gradient(from 0deg at 50% 50%, rgba(0,0,0,0) 0deg, ${themeColor}33 300deg, ${themeColor} 360deg)` }} />
              <div className="radar-grid-crosshair" />

              {/* Research Nodes Pinging inside Radar Screen */}
              {RESEARCH_NODES.map((node, index) => {
                const isSelected = node.id === selectedNodeId;
                const angles = [45, 135, 225, 315];
                const angle = angles[index];
                const radius = 34;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <button
                    key={node.id}
                    className={`radar-node-ping ${isSelected ? 'active' : ''}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      '--node-color': node.color,
                    } as React.CSSProperties}
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedNodeId(node.id);
                    }}
                    title={node.title}
                  >
                    <span className="node-beacon-ring" />
                    <span className="node-center-dot" style={{ background: node.color }} />
                    <span className="node-code-tag">{node.code}</span>
                  </button>
                );
              })}

              <div className="radar-center-hub">
                <Cpu size={22} color={themeColor} />
                <span className="radar-status-text">MOHAN.R&D</span>
              </div>
            </div>

            {/* Node Selection Quick Bar */}
            <div className="radar-node-list-bar">
              {RESEARCH_NODES.map((node) => (
                <button
                  key={node.id}
                  className={`node-pill-btn ${selectedNodeId === node.id ? 'active' : ''}`}
                  style={{ '--accent-c': node.color } as React.CSSProperties}
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedNodeId(node.id);
                  }}
                >
                  <span className="node-pill-code">{node.code}</span>
                  <span className="node-pill-title">{node.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Active Research Project Inspector Panel */}
          <div className="rd-inspector-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="inspector-card-inner"
                style={{ '--accent-c': activeNode.color } as React.CSSProperties}
              >
                <div className="inspector-header">
                  <div className="inspector-code-chip">
                    <Zap size={13} color={activeNode.color} />
                    <span>{activeNode.code} // {activeNode.category}</span>
                  </div>
                  <span className="inspector-status-badge">{activeNode.status}</span>
                </div>

                <h4 className="inspector-title">{activeNode.title}</h4>
                <p className="inspector-desc">{activeNode.description}</p>

                {/* Metrics Progress Meter */}
                <div className="inspector-metric-box">
                  <div className="metric-header-line">
                    <span className="metric-lbl">BENCHMARK / METRIC:</span>
                    <span className="metric-val">{activeNode.metrics}</span>
                  </div>
                  <div className="metric-track">
                    <motion.div
                      className="metric-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${activeNode.progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ background: activeNode.color }}
                    />
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="inspector-tech-tags">
                  {activeNode.techStack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* LIVE STREAMING TERMINAL CONSOLE */}
            <div className="rd-live-terminal-box">
              <div className="terminal-top-bar">
                <div className="terminal-dots">
                  <span className="t-dot red" />
                  <span className="t-dot yellow" />
                  <span className="t-dot green" />
                </div>
                <div className="terminal-title">
                  <TerminalIcon size={12} color="#00E5FF" />
                  <span>R&D TELEMETRY STREAM // VERIFIED</span>
                </div>
                <div className="terminal-online-status">LIVE</div>
              </div>
              <div className="terminal-body-content">
                {terminalLogs.map((log, lIdx) => (
                  <div key={lIdx} className="terminal-line">
                    <span className="t-arrow">&gt;</span>
                    <span className="t-text">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METRICS TELEMETRY STRIP WITH HIGHLIGHTED WORDS */}
        <div className="rd-telemetry-metrics-strip">
          <div className="telemetry-item">
            <Activity size={16} color={themeColor} />
            <div>
              <div className="tel-val highlight-cyan">MERN & AI INTEGRATION</div>
              <div className="tel-lbl">CORE RESEARCH FOCUS</div>
            </div>
          </div>

          <div className="telemetry-item">
            <Globe size={16} color={themeColor} />
            <div>
              <div className="tel-val highlight-green">PLANET EARTH // INDIA</div>
              <div className="tel-lbl">SRIPERUMBUDUR / KANCHEEPURAM</div>
            </div>
          </div>

          <div className="telemetry-item">
            <ShieldCheck size={16} color={themeColor} />
            <div>
              <div className="tel-val highlight-violet">IEEE STUDENT BRANCH</div>
              <div className="tel-lbl">CHAIRMAN LEADERSHIP</div>
            </div>
          </div>

          <div className="telemetry-item">
            <Compass size={16} color={themeColor} />
            <div>
              <div className="tel-val highlight-amber">AVAILABLE FOR ROLES</div>
              <div className="tel-lbl">FULL STACK / SOFTWARE ENG</div>
            </div>
          </div>
        </div>

        {/* FINAL CYBER FOOTER BAR WITH NAVIGATION & SOCIALS */}
        <div className="rd-final-footer-bar">
          <div className="footer-brand-col">
            <div className="footer-logo-badge">MR</div>
            <div>
              <div className="footer-name">
                <span className="neon-highlight-text">MOHAN RAJ</span>
              </div>
              <div className="footer-role">
                <span className="highlight-pill-tag">FULL STACK DEVELOPER & SOFTWARE ENGINEER</span>
              </div>
            </div>
          </div>

          <div className="footer-stack-pills">
            <span className="stack-item highlight">React 18</span>
            <span className="stack-sep">/</span>
            <span className="stack-item highlight">TypeScript</span>
            <span className="stack-sep">/</span>
            <span className="stack-item highlight">Tailwind CSS</span>
            <span className="stack-sep">/</span>
            <span className="stack-item highlight">Framer Motion</span>
            <span className="stack-sep">/</span>
            <span className="stack-item highlight">Vite</span>
          </div>

          <div className="footer-social-links">
            <a
              href="https://github.com/mohanraj22121"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohanraj2212"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:m.mohanraj2212@gmail.com"
              className="social-icon-btn"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              title="Send Email"
            >
              <Mail size={16} />
            </a>
            <a
              href={resumePdf || '/Mohan_Raj_Resume.pdf'}
              download="Mohan_Raj_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="social-icon-btn"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              title="Download Resume"
            >
              <FileText size={16} />
            </a>

            {/* Back to Top Rocket Button */}
            <button
              className="rocket-top-btn"
              onClick={scrollToTop}
              onMouseEnter={() => soundEngine.playHover()}
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="rd-copyright-line">
          <span>© 2026 Mohan Raj. All rights reserved. <span className="neon-word-glow">Crafted with precision for high performance.</span></span>
        </div>
      </div>
    </footer>
  );
};

export default TechResearchFooter;
