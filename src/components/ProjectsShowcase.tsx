import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  ChevronRight,
  X,
  Flame,
  Globe,
  Smartphone,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  BarChart3,
  Building2,
  QrCode,
  Users,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export interface ProjectMission {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  image: string;
  stack: string[];
  github?: string;
  liveWebsite?: string;
  playStore?: boolean;
  status: string;
  stats: { label: string; val: string }[];
  highlights: string[];
  toneColor: string;
  glowColor: string;
}

const PROJECTS_MISSIONS: ProjectMission[] = [
  {
    id: 'permigo',
    number: '01',
    title: 'PermiGo App & Website',
    subtitle: 'Digital Outpass Management System',
    category: 'MERN STACK & FLUTTER MOBILITY',
    badge: 'DEPLOYED & PLAY STORE',
    image: '/permigo-3d.png',
    stack: ['React', 'TypeScript', 'Flutter', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/mohanraj221210/final',
    liveWebsite: 'https://www.jit.college',
    playStore: true,
    status: 'LIVE ON WEB & PLAY STORE',
    stats: [
      { label: 'Active Users', val: '500+ Students' },
      { label: 'Approval Speed', val: '70% Faster' },
      { label: 'Gate Scan', val: 'Instant QR Code' },
    ],
    highlights: [
      'Developed a MERN application used by 500+ students, reducing approval time by 70%.',
      'Implemented multi-level approval workflows, role-based access for wardens/security/students, REST API integration, and MongoDB data management.',
      'Web application deployed online; mobile application published on the Google Play Store.',
    ],
    toneColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
  },
  {
    id: 'jitconnect',
    number: '02',
    title: 'JITConnect App',
    subtitle: 'College Alumni Connect Application',
    category: 'MOBILE FLUTTER ECOSYSTEM',
    badge: 'GOOGLE PLAY STORE',
    image: '/jitconnect-3d.png',
    stack: ['Flutter', 'Dart', 'Node.js', 'MongoDB', 'REST API'],
    github: 'https://github.com/Sanjay-s15/jitconnectapp',
    playStore: true,
    status: 'PUBLISHED ON PLAY STORE',
    stats: [
      { label: 'Platform', val: 'Flutter Mobile' },
      { label: 'Publish', val: 'Google Play Store' },
      { label: 'Network', val: 'Students & Alumni' },
    ],
    highlights: [
      'Developed a mobile platform connecting students and alumni through profiles, posts, events, notices, and community interaction.',
      'Published on the Google Play Store and made available for active campus networking.',
      'Includes student & alumni career profiles, notice board & campus event feed with RSVP, and in-app direct mentorship messaging.',
    ],
    toneColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
  },
  {
    id: 'crewplay',
    number: '03',
    title: 'CrewPlay.in',
    subtitle: 'Sports Team & Match Management Platform',
    category: 'FULL STACK MERN',
    badge: 'LIVE ONLINE PLATFORM',
    image: '/crewplay-3d.png',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST API', 'AWS'],
    github: 'https://github.com/venky152005/crewplay',
    liveWebsite: 'https://crewplay.in',
    status: 'LIVE WEBSITE',
    stats: [
      { label: 'Live Domain', val: 'crewplay.in' },
      { label: 'Backend', val: 'REST API + MongoDB' },
      { label: 'Features', val: 'Live Scoreboards' },
    ],
    highlights: [
      'Developed and deployed a full-stack platform for authentication, team creation, match posting, and sports community management.',
      'Built REST APIs and integrated MongoDB for real-world application functionality.',
      'Deployed live online at crewplay.in for local sports teams to schedule matches, maintain player rosters, and record scores.',
    ],
    toneColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
  },
  {
    id: 'noticeboard',
    number: '04',
    title: 'QR-Based Digital College Notice Board',
    subtitle: 'Centralized College Announcement System',
    category: 'MERN & QR INTEGRATION',
    badge: 'DEPLOYED CAMPUS SYSTEM',
    image: '/noticeboard-3d.png',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'QR Code'],
    github: 'https://github.com/mohanraj221210/jit-qr',
    liveWebsite: 'https://notice.jit.college/',
    status: 'LIVE WEBSITE',
    stats: [
      { label: 'Access Method', val: 'Instant QR Scan' },
      { label: 'Live Portal', val: 'notice.jit.college' },
      { label: 'Notice Speed', val: 'Real-Time Broadcast' },
    ],
    highlights: [
      'Developed a centralized digital notice platform enabling students to access college announcements quickly through QR codes.',
      'Designed to improve notice accessibility and reduce dependency on physical notice boards.',
      'Includes instant QR scan notice reading, admin panel for scheduled posts, category filtering, and emergency alert broadcasts.',
    ],
    toneColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
  },
  {
    id: 'scholara',
    number: '05',
    title: 'Multi-School Management System',
    subtitle: 'Centralized Enterprise Education Platform',
    category: 'ENTERPRISE FULL STACK',
    badge: 'FULL-STACK SYSTEM',
    image: '/scholara-3d.png',
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    github: 'https://github.com/RohithKhan/SMS',
    status: 'ACTIVE DEVELOPMENT',
    stats: [
      { label: 'User Roles', val: '6 Multi-Level Portals' },
      { label: 'Target Scope', val: 'Multi-School Network' },
      { label: 'Core Modules', val: 'Academics, Fees, Notice' },
    ],
    highlights: [
      'Developing a full-stack online platform designed to manage multiple schools through a centralized system.',
      'Includes modules for Super Admin, School Admin, Management, Teachers/Staff, Parents, Attendance, Examination, and Notice Management.',
      'Building role-based dashboards and workflows to simplify school administration and academic operations.',
    ],
    toneColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
  },
  {
    id: 'costprediction',
    number: '06',
    title: 'Home Building Cost Prediction',
    subtitle: 'AI/ML Construction Cost Estimation System',
    category: 'AI & MACHINE LEARNING',
    badge: 'AI / DATA ANALYTICS',
    image: '/cost-prediction-3d.png',
    stack: ['Python', 'Machine Learning', 'Data Analytics', 'Scikit-Learn', 'Pandas'],
    status: 'AI MODEL COMPLETED',
    stats: [
      { label: 'ML Analytics', val: 'Feature Preprocessing' },
      { label: 'Target Users', val: 'Small-Scale Builders' },
      { label: 'Output', val: 'Early Budget Estimate' },
    ],
    highlights: [
      'Developed a machine learning-based system to predict construction costs for small-scale builders.',
      'Applied data preprocessing, feature analysis, and predictive modeling techniques for early-stage budget estimation.',
      'Assists builders in evaluating structural materials, labor rates, square footage, and regional cost metrics.',
    ],
    toneColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
  },
];

export const ProjectsShowcase: React.FC = () => {
  const [activeMission, setActiveMission] = useState<ProjectMission | null>(null);

  useEffect(() => {
    if (activeMission) {
      document.body.classList.add('hide-header-for-modal');
    } else {
      document.body.classList.remove('hide-header-for-modal');
    }
    return () => {
      document.body.classList.remove('hide-header-for-modal');
    };
  }, [activeMission]);

  return (
    <>
      {/* PROJECTS GRID WITH CIRCULAR GLOW LIGHT PEDESTALS */}
      <div className="projects-pedestal-grid">
        {PROJECTS_MISSIONS.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="project-pedestal-card"
            onMouseEnter={() => soundEngine.playHover()}
            style={
              {
                '--tone': proj.toneColor,
                '--glow': proj.glowColor,
              } as React.CSSProperties
            }
          >
            {/* Top Outer Card Header */}
            <div className="pedestal-card-header">
              <span className="project-num-badge">MISSION // {proj.number}</span>
              <span className="project-badge-tag">{proj.badge}</span>
            </div>

            {/* Glowing Circular Light Pedestal Base Container */}
            <div className="hologram-pedestal-container">
              {/* Upward Holographic Light Beam Beam */}
              <div className="pedestal-light-beam" />
              
              {/* Floating Hologram Project 3D Image */}
              <div className="hologram-object-wrapper">
                <img src={proj.image} alt={proj.title} className="hologram-project-img" />
                <div className="hologram-scanline-ring" />
              </div>

              {/* Glowing Circular Light Pedestal Platform (As requested by user image reference) */}
              <div className="circular-pedestal-base">
                <div className="pedestal-outer-ring" />
                <div className="pedestal-inner-glow-disc" />
                <div className="pedestal-center-light-point" />
              </div>
            </div>

            {/* Outer Card Body (Simple Clean View) */}
            <div className="pedestal-card-body">
              <h3 className="pedestal-project-title">{proj.title}</h3>
              <div className="pedestal-project-subtitle">{proj.subtitle}</div>

              {/* Primary Tech Stack Pills */}
              <div className="pedestal-tech-row">
                {proj.stack.slice(0, 3).map((tech) => (
                  <span key={tech} className="pedestal-tech-chip">
                    {tech}
                  </span>
                ))}
                {proj.stack.length > 3 && (
                  <span className="pedestal-tech-chip more">+{proj.stack.length - 3}</span>
                )}
              </div>

              {/* View Case Action Button */}
              <button
                className="cyber-button ghost pedestal-action-btn"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playModalOpen();
                  setActiveMission(proj);
                }}
              >
                VIEW CASE FILE <ChevronRight size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULL-SCREEN DETAILED PROJECT CASE FILE INSPECTOR MODAL */}
      <AnimatePresence>
        {activeMission && (
          <div
            className="modal-overlay"
            onClick={() => {
              soundEngine.playModalClose();
              setActiveMission(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="project-case-modal-frame"
              onClick={(e) => e.stopPropagation()}
              style={
                {
                  '--tone': activeMission.toneColor,
                  '--glow': activeMission.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playModalClose();
                  setActiveMission(null);
                }}
              >
                <X size={20} />
              </button>

              {/* Top Modal Telemetry Bar */}
              <div className="case-modal-top-bar">
                <div className="case-modal-number">
                  <Flame size={16} color={activeMission.toneColor} />
                  <span>PROJECT CASE FILE // MISSION {activeMission.number}</span>
                </div>
                <div className="case-modal-status-pill">{activeMission.status}</div>
              </div>

              {/* Main Modal Holographic Banner */}
              <div className="case-modal-hero-box">
                <img src={activeMission.image} alt={activeMission.title} className="case-modal-hero-img" />
                <div className="case-modal-hero-scanline" />
                <div className="case-modal-category-badge">{activeMission.category}</div>
              </div>

              {/* Case File Main Info */}
              <div className="case-modal-content-body">
                <h2 className="case-modal-title">{activeMission.title}</h2>
                <div className="case-modal-subtitle">{activeMission.subtitle}</div>

                {/* Live Links & Tracking Action Bar */}
                <div className="case-modal-actions-bar">
                  {activeMission.liveWebsite && (
                    <a
                      href={activeMission.liveWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="case-action-link primary-live"
                      onMouseEnter={() => soundEngine.playHover()}
                      onClick={() => soundEngine.playClick()}
                    >
                      <Globe size={16} /> LIVE WEBSITE <ExternalLink size={13} />
                    </a>
                  )}

                  {activeMission.github && (
                    <a
                      href={activeMission.github}
                      target="_blank"
                      rel="noreferrer"
                      className="case-action-link github-repo"
                      onMouseEnter={() => soundEngine.playHover()}
                      onClick={() => soundEngine.playClick()}
                    >
                      <Github size={16} /> GITHUB REPO <ExternalLink size={13} />
                    </a>
                  )}

                  {activeMission.playStore && (
                    <span className="case-action-badge playstore">
                      <Smartphone size={15} /> GOOGLE PLAY STORE PUBLISHED
                    </span>
                  )}
                </div>

                {/* Key Metrics Stats Grid */}
                <div className="case-modal-stats-grid">
                  {activeMission.stats.map((st) => (
                    <div key={st.label} className="case-stat-box">
                      <div className="case-stat-val">{st.val}</div>
                      <div className="case-stat-label">{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key System Highlights & Architecture Details */}
                <div className="case-modal-highlights-section">
                  <div className="case-section-heading">
                    <ShieldCheck size={16} color={activeMission.toneColor} />
                    <span>KEY SYSTEM HIGHLIGHTS & ARCHITECTURE</span>
                  </div>
                  <ul className="case-highlights-list">
                    {activeMission.highlights.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={15} color={activeMission.toneColor} className="list-icon" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Complete Tech Stack Breakdown */}
                <div className="case-modal-tech-section">
                  <div className="case-section-heading">
                    <Layers size={16} color={activeMission.toneColor} />
                    <span>FULL TECH STACK & INTEGRATIONS</span>
                  </div>
                  <div className="case-tech-tags-list">
                    {activeMission.stack.map((t) => (
                      <span key={t} className="case-tech-pill">
                        <Zap size={12} color={activeMission.toneColor} /> {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="case-modal-footer">
                  <button
                    className="cyber-button primary"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playModalClose();
                      setActiveMission(null);
                    }}
                  >
                    CLOSE CASE FILE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
