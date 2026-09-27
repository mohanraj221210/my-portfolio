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
  problem: string;
  solution: string;
  engineeringChallenge: string;
  howISolvedIt: string;
  architectureFlow: string[];
}

const PROJECTS_MISSIONS: ProjectMission[] = [
  {
    id: 'permigo',
    number: '01',
    title: 'JIT Outpass (PermiGo)',
    subtitle: 'Role-based digital outpass management for 1500+ students',
    category: 'MERN STACK & FLUTTER MOBILITY',
    badge: 'DEPLOYED & PLAY STORE',
    image: '/permigo-3d.png',
    stack: ['Flutter', 'Node.js', 'MongoDB', 'Firebase', 'Express.js', 'React'],
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
      'Developed a MERN & Flutter application used by 500+ students, reducing approval time by 70%.',
      'Implemented multi-level approval workflows (Staff -> Year Incharge -> Warden -> Security).',
      'Mobile application published on Google Play Store with real-time push approvals.',
    ],
    toneColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
    problem: 'College outpass requests were managed manually through paper forms and verbal approval chains. Students had no visibility into approval status and wardens had no centralized oversight.',
    solution: 'Built a mobile app with a structured digital approval workflow. Students submit requests, which move through Staff → Year In-charge → Warden. Each role gets a dedicated dashboard. Approvals and rejections are handled in-app with status updates.',
    engineeringChallenge: 'Designing a workflow where any role could reject at any stage and the request state needed to be consistent across all dashboards in real time.',
    howISolvedIt: 'Implemented a state machine model for outpass requests using MongoDB. Firebase real-time listeners ensure all dashboards reflect current request state without polling.',
    architectureFlow: ['STUDENT', 'STAFF', 'YEAR INCHARGE', 'WARDEN', 'APPROVED / REJECTED'],
  },
  {
    id: 'jitconnect',
    number: '02',
    title: 'JIT Alumni Connect',
    subtitle: 'A mobile platform for student–alumni–staff engagement',
    category: 'MOBILE FLUTTER ECOSYSTEM',
    badge: 'GOOGLE PLAY STORE',
    image: '/jitconnect-3d.png',
    stack: ['Flutter', 'Node.js', 'MongoDB', 'Firebase', 'Dart', 'REST API'],
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
      'Published on Google Play Store for active campus networking.',
      'Includes student & alumni career profiles, notice feed with RSVP, and direct mentorship messaging.',
    ],
    toneColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    problem: 'No dedicated platform existed for alumni to stay connected with the institution, mentor students, or share opportunities. Communication happened through informal channels.',
    solution: 'Built a cross-role mobile platform for alumni, students, and staff. Features include posts, events, notices, mentoring, and alumni engagement. Each role has a tailored experience within a shared community.',
    engineeringChallenge: 'Building a single codebase that served meaningfully different experiences for students, alumni, and staff — without making each role feel like an afterthought.',
    howISolvedIt: 'Implemented a role-based rendering system in Flutter where screen content and navigation are driven by the authenticated user role, pulling role-specific data from scoped API endpoints.',
    architectureFlow: ['STUDENT / ALUMNI / STAFF', 'FLUTTER APP', 'NODE.JS API', 'MONGODB + FIREBASE'],
  },
  {
    id: 'crewplay',
    number: '03',
    title: 'CrewPlay.in',
    subtitle: 'Sports team match scheduling & live scoreboard engine',
    category: 'FULL STACK MERN',
    badge: 'LIVE ONLINE PLATFORM',
    image: '/crewplay-3d.png',
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'AWS', 'REST API'],
    github: 'https://github.com/venky152005/crewplay',
    liveWebsite: 'https://crewplay.in',
    status: 'LIVE WEBSITE',
    stats: [
      { label: 'Live Domain', val: 'crewplay.in' },
      { label: 'Backend', val: 'REST API + MongoDB' },
      { label: 'Features', val: 'Live Scoreboards' },
    ],
    highlights: [
      'Developed and deployed a full-stack platform for team creation, match posting, and sports community management.',
      'Built REST APIs and integrated MongoDB for real-world application functionality.',
      'Deployed live online at crewplay.in for local sports teams to schedule matches and maintain player rosters.',
    ],
    toneColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    problem: 'Local sports teams and athletes lacked a centralized digital hub to schedule matches, broadcast live scores, maintain official rosters, and track player performance metrics.',
    solution: 'Architected and deployed a full-stack MERN platform where sports teams register, organize local matches, maintain verified player rosters, update real-time scoreboards, and build sports communities.',
    engineeringChallenge: 'Handling dynamic concurrent score updates during live matches while preserving data consistency across mobile browsers and spectator dashboards.',
    howISolvedIt: 'Designed RESTful API endpoints backed by optimized MongoDB query indexing and websockets for real-time live scoreboard broadcasting.',
    architectureFlow: ['SPORTS TEAMS & ATHLETES', 'REACT WEBSOCKET FRONTEND', 'EXPRESS REST API', 'MONGODB + AWS HOSTING'],
  },
  {
    id: 'noticeboard',
    number: '04',
    title: 'JIT Digital Notice Board',
    subtitle: 'Instant QR-scannable campus notice broadcast system',
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
      'Includes instant QR scan notice reading, admin panel for scheduled posts, and emergency alerts.',
    ],
    toneColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    problem: 'Traditional physical notice boards caused information delays, paper waste, and poor reach for emergency campus announcements among 2000+ students.',
    solution: 'Engineered a zero-friction digital notice system where students scan strategically placed QR codes around campus to instantly view categorized announcements on mobile without downloading an app.',
    engineeringChallenge: 'Delivering instant sub-second page loads for hundreds of simultaneous QR scans during peak morning campus hours.',
    howISolvedIt: 'Built lightweight server-side rendered React views with MongoDB document caching and optimized assets hosted via CDN.',
    architectureFlow: ['CAMPUS QR SCANNERS', 'INSTANT WEB PORTAL', 'ADMIN ANNOUNCEMENT PANEL', 'MONGODB CACHED DATABASE'],
  },
  {
    id: 'scholara',
    number: '05',
    title: 'Scholara System',
    subtitle: 'Multi-school enterprise administration & portal suite',
    category: 'ENTERPRISE FULL STACK',
    badge: 'FULL-STACK SYSTEM',
    image: '/scholara-3d.png',
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: 'https://github.com/RohithKhan/SMS',
    status: 'ACTIVE DEVELOPMENT',
    stats: [
      { label: 'User Roles', val: '6 Multi-Level Portals' },
      { label: 'Target Scope', val: 'Multi-School Network' },
      { label: 'Core Modules', val: 'Academics, Fees, Notice' },
    ],
    highlights: [
      'Developing a full-stack online platform designed to manage multiple schools through a centralized system.',
      'Includes modules for Super Admin, School Admin, Management, Teachers/Staff, Parents, Attendance, and Examinations.',
      'Building role-based dashboards and workflows to simplify school administration and academic operations.',
    ],
    toneColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    problem: 'Educational institutes managing multiple schools faced fragmented data, duplicate admin work, manual fee tracking, and disconnected parent communication.',
    solution: 'Built a multi-tenant enterprise management platform connecting Super Admins, School Principals, Teachers, Parents, and Students in a unified portal ecosystem.',
    engineeringChallenge: 'Ensuring strict multi-tenant data isolation so each school\'s records, grade calculations, and financial ledgers remain completely isolated.',
    howISolvedIt: 'Implemented tenant-scoped database querying and JWT claims middleware in Node.js, enforcing role-based access control (RBAC) at every endpoint.',
    architectureFlow: ['SUPER ADMIN / PRINCIPAL', 'ROLE-BASED PORTALS', 'TENANT SCOPED NODE API', 'SECURE MULTI-TENANT MONGODB'],
  },
  {
    id: 'costprediction',
    number: '06',
    title: 'Building Cost Predictor',
    subtitle: 'AI/ML construction cost & material estimation system',
    category: 'AI & MACHINE LEARNING',
    badge: 'AI / DATA ANALYTICS',
    image: '/cost-prediction-3d.png',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Machine Learning', 'Data Analytics'],
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
    problem: 'Small-scale builders and homeowners struggled with budget overruns due to inaccurate manual material estimates and fluctuating regional labor rates.',
    solution: 'Trained a supervised Machine Learning regression model to predict construction costs based on square footage, material selection, floor count, and regional pricing metrics.',
    engineeringChallenge: 'Handling noisy historical construction cost data with wide variations across different regions and building specifications.',
    howISolvedIt: 'Applied feature engineering, outlier removal, and XGBoost / Random Forest regression techniques in Python using Scikit-Learn to achieve reliable cost predictions.',
    architectureFlow: ['BUILDER METRIC INPUTS', 'PYTHON PREPROCESSING', 'SCIKIT-LEARN ML MODEL', 'COST & BUDGET BREAKDOWN'],
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

              {/* Glowing Circular Light Pedestal Platform */}
              <div className="circular-pedestal-base">
                <div className="pedestal-outer-ring" />
                <div className="pedestal-inner-glow-disc" />
                <div className="pedestal-center-light-point" />
              </div>
            </div>

            {/* Outer Card Body */}
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

      {/* DETAILED PROJECT CASE FILE INSPECTOR MODAL (Matching User Reference Image Design) */}
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
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="project-case-modal-frame"
              onClick={(e) => e.stopPropagation()}
              style={
                {
                  '--tone': activeMission.toneColor,
                  '--glow': activeMission.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Header Bar with Title, Subtitle, and Close Button */}
              <div className="case-modal-header-nav">
                <div>
                  <div className="case-modal-meta-chip">
                    <span>PROJECT CASE STUDY</span> // <span>MISSION {activeMission.number}</span>
                  </div>
                  <h2 className="case-modal-main-title">{activeMission.title}</h2>
                  <p className="case-modal-main-subtitle">{activeMission.subtitle}</p>
                </div>
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
              </div>

              {/* Live Links & Action Badges */}
              <div className="case-modal-actions-row">
                {activeMission.liveWebsite && (
                  <a
                    href={activeMission.liveWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="case-action-link primary-live"
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => soundEngine.playClick()}
                  >
                    <Globe size={15} /> LIVE WEBSITE <ExternalLink size={13} />
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
                    <Github size={15} /> GITHUB REPO <ExternalLink size={13} />
                  </a>
                )}

                {activeMission.playStore && (
                  <span className="case-action-badge playstore">
                    <Smartphone size={15} /> GOOGLE PLAY STORE PUBLISHED
                  </span>
                )}
              </div>

              {/* 2-COLUMN CASE FILE BODY (Matching User Reference Image Design) */}
              <div className="case-modal-grid-layout">
                {/* LEFT COLUMN: THE PROBLEM, THE SOLUTION, ENGINEERING CHALLENGE, HOW I SOLVED IT */}
                <div className="case-left-column">
                  <div className="case-section-block">
                    <h4 className="case-label-purple">THE PROBLEM</h4>
                    <p className="case-text-content">{activeMission.problem}</p>
                  </div>

                  <div className="case-section-block">
                    <h4 className="case-label-purple">THE SOLUTION</h4>
                    <p className="case-text-content">{activeMission.solution}</p>
                  </div>

                  <div className="case-section-block">
                    <h4 className="case-label-amber">ENGINEERING CHALLENGE</h4>
                    <p className="case-text-content">{activeMission.engineeringChallenge}</p>
                  </div>

                  {/* HOW I SOLVED IT - GREEN GLOW BOX */}
                  <div className="case-solved-box">
                    <h4 className="case-label-green">HOW I SOLVED IT</h4>
                    <p className="case-solved-text">{activeMission.howISolvedIt}</p>
                  </div>
                </div>

                {/* RIGHT COLUMN: ARCHITECTURE FLOW & TECH STACK */}
                <div className="case-right-column">
                  <div className="case-section-block">
                    <h4 className="case-label-purple">ARCHITECTURE</h4>
                    
                    {/* Stacked Architecture Flow Nodes */}
                    <div className="architecture-flow-wrapper">
                      {activeMission.architectureFlow.map((node, index) => (
                        <React.Fragment key={index}>
                          <div
                            className={`arch-flow-node ${
                              index === activeMission.architectureFlow.length - 1 ? 'result-node' : ''
                            }`}
                          >
                            {node}
                          </div>
                          {index < activeMission.architectureFlow.length - 1 && (
                            <div className="arch-flow-arrow">
                              <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="case-section-block" style={{ marginTop: '28px' }}>
                    <h4 className="case-label-purple">TECH STACK</h4>
                    <div className="case-tech-badges-grid">
                      {activeMission.stack.map((tech) => (
                        <span key={tech} className="case-tech-badge-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Close Button */}
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

