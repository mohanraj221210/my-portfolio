import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Database,
  Smartphone,
  Wrench,
  BrainCircuit,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export interface SubSkillDetail {
  name: string;
  level: number;
  rank: 'EXPERT' | 'ADVANCED' | 'PROFICIENT';
  codeSnippet: string;
  description: string;
}

export interface DomainCategoryData {
  id: string;
  title: string;
  stoneName: string;
  color: string;
  themeClass: string;
  icon: React.ElementType;
  summary: string;
  subSkills: SubSkillDetail[];
}

export const powerDomainsData: DomainCategoryData[] = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    stoneName: 'CYBER MATRIX STONE',
    color: '#00E5FF',
    themeClass: 'stone-cyan',
    icon: Code2,
    summary: 'High-performance interactive interfaces, state management & reactive web applications.',
    subSkills: [
      { name: 'React', level: 95, rank: 'EXPERT', codeSnippet: 'const [state, setState] = useState(initial);', description: 'Modular UI component architecture, custom hooks & Virtual DOM performance tuning.' },
      { name: 'Next.js', level: 70, rank: 'EXPERT', codeSnippet: 'export async function generateMetadata()', description: 'Server-Side Rendering (SSR), App Router, Server Actions & automatic image optimization.' },
      { name: 'TypeScript', level: 85, rank: 'EXPERT', codeSnippet: 'type AsyncResult<T> = Promise<Response<T>>;', description: 'Static type checking, interfaces, generics & enterprise code architecture.' },
      { name: 'JavaScript', level: 70, rank: 'EXPERT', codeSnippet: 'const stream = await processPipeline(data);', description: 'ES6+, async/await, event loops, closures & functional programming.' },
      { name: 'Tailwind CSS', level: 95, rank: 'EXPERT', codeSnippet: 'className="backdrop-blur border border-cyan-500/20"', description: 'Utility-first styling, glassmorphism design systems & responsive layouts.' },
      { name: 'Vite', level: 88, rank: 'ADVANCED', codeSnippet: 'export default defineConfig({ plugins: [react()] })', description: 'Instant HMR development server, optimized ESM bundling & build pipelines.' },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND',
    stoneName: 'CORE ENGINE STONE',
    color: '#8B5CF6',
    themeClass: 'stone-violet',
    icon: Terminal,
    summary: 'Scalable RESTful microservices, secure authentication & asynchronous backend logic.',
    subSkills: [
      { name: 'Node.js', level: 92, rank: 'EXPERT', codeSnippet: 'const server = http.createServer(app);', description: 'Non-blocking event-driven runtime, cluster management & stream processing.' },
      { name: 'Express.js', level: 90, rank: 'EXPERT', codeSnippet: 'app.use("/api/v1/projects", projectRouter);', description: 'Middleware chain architecture, error handlers & controller abstractions.' },
      { name: 'REST APIs', level: 94, rank: 'EXPERT', codeSnippet: 'res.status(200).json({ status: "success", data });', description: 'RESTful API contracts, status codes, OpenAPI documentation & CORS security.' },
    ],
  },
  {
    id: 'database',
    title: 'DATABASE',
    stoneName: 'QUANTUM DATA STONE',
    color: '#10B981',
    themeClass: 'stone-emerald',
    icon: Database,
    summary: 'NoSQL document stores, relational SQL schemas & cloud database indexing.',
    subSkills: [
      { name: 'MongoDB', level: 75, rank: 'EXPERT', codeSnippet: 'db.users.aggregate([{ $match: { active: true } }]);', description: 'Document stores, multi-stage aggregation pipelines & index tuning.' },
      { name: 'SQL', level: 40, rank: 'ADVANCED', codeSnippet: 'SELECT u.name, COUNT(p.id) FROM Users u JOIN...', description: 'Relational table design, JOIN queries, transactions & ACID compliance.' },
      { name: 'Firebase', level: 30, rank: 'ADVANCED', codeSnippet: 'onSnapshot(doc(db, "live"), (snapshot) => ...);', description: 'Firestore real-time sync, auth triggers & cloud functions.' },
      { name: 'AWS Cloud', level: 50, rank: 'PROFICIENT', codeSnippet: 's3.upload({ Bucket: "assets", Key: filename });', description: 'S3 cloud storage buckets, EC2 virtual instances & IAM security policies.' },
    ],
  },
  {
    id: 'mobile',
    title: 'MOBILE',
    stoneName: 'SOLAR VECTOR STONE',
    color: '#F59E0B',
    themeClass: 'stone-amber',
    icon: Smartphone,
    summary: 'Cross-platform mobile applications with native feel and fluid 60fps animations.',
    subSkills: [
      { name: 'Flutter', level: 88, rank: 'ADVANCED', codeSnippet: 'Widget build(BuildContext context) { return ...; }', description: 'Widget tree architecture, Provider state management & native integration.' },
      { name: 'Dart', level: 86, rank: 'ADVANCED', codeSnippet: 'Stream<UserStatus> get statusStream async* { ... }', description: 'Async streams, isolate threads, null safety & object-oriented Dart.' },
      { name: 'Responsive UI', level: 95, rank: 'EXPERT', codeSnippet: 'MediaQuery.of(context).size.width > 600', description: 'Fluid layout builders, mobile-first design & touch gesture handlers.' },
    ],
  },
  {
    id: 'tools',
    title: 'TOOLS',
    stoneName: 'SYNAPSE TOOL STONE',
    color: '#EC4899',
    themeClass: 'stone-rose',
    icon: Wrench,
    summary: 'Version control workflows, API testing suites, UI prototypes & containerization.',
    subSkills: [
      { name: 'Git & GitHub', level: 94, rank: 'EXPERT', codeSnippet: 'git checkout -b feature/permigo-qrcode', description: 'Git flow, interactive rebase, pull requests & GitHub Actions CI/CD.' },
      { name: 'Postman', level: 90, rank: 'ADVANCED', codeSnippet: 'pm.test("Status 200", () => pm.response.to.be.200);', description: 'API collection runners, environment variables & mock server testing.' },
      { name: 'Figma Design', level: 85, rank: 'ADVANCED', codeSnippet: 'Auto-Layout + Component Design System', description: 'Wireframing, interactive UI prototypes, design tokens & asset handoff.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI / DATA',
    stoneName: 'NEURAL MIND STONE',
    color: '#6366F1',
    themeClass: 'stone-indigo',
    icon: BrainCircuit,
    summary: 'Intelligent AI models, predictive machine learning pipelines & data analysis.',
    subSkills: [
      { name: 'Python', level: 50, rank: 'EXPERT', codeSnippet: 'import numpy as np; import pandas as pd', description: 'Data structures, automation scripts, NumPy arrays & pandas DataFrames.' },
      { name: 'Machine Learning', level: 40, rank: 'ADVANCED', codeSnippet: 'model.fit(X_train, y_train); y_pred = ...', description: 'Scikit-learn classification, regression, random forests & model evaluation.' },
      { name: 'Deep Learning', level: 20, rank: 'ADVANCED', codeSnippet: 'model.add(Dense(128, activation="relu"))', description: 'Neural networks, TensorFlow/Keras architecture & feature embeddings.' },
      { name: 'Data Analytics', level: 65, rank: 'ADVANCED', codeSnippet: 'df.groupby("category").agg({"score": "mean"})', description: 'Exploratory data analysis, Seaborn charts & trend prediction models.' },
    ],
  },
];

export const PowerSkillsStage: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<string>('frontend');
  const [activeSubSkill, setActiveSubSkill] = useState<SubSkillDetail>(
    powerDomainsData[0].subSkills[0]
  );
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activeDomain = powerDomainsData.find((d) => d.id === activeDomainId) || powerDomainsData[0];

  const handleDomainSelect = (domain: DomainCategoryData) => {
    soundEngine.playPowerStone();
    setActiveDomainId(domain.id);
    setActiveSubSkill(domain.subSkills[0]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMousePos({
      x: (e.clientX - cx) / (rect.width / 2),
      y: (e.clientY - cy) / (rect.height / 2),
    });
  };

  return (
    <div className="power-skills-stage-shell" onMouseMove={handleMouseMove}>
      {/* Background Energy Matrix Aura */}
      <div
        className="stage-glow-ambient"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${activeDomain.color}18, transparent 70%)`,
        }}
      />

      {/* Top Selector Bar: 6 Power Stone Domains */}
      <div className="power-stone-nav-bar">
        {powerDomainsData.map((domain) => {
          const IconComponent = domain.icon;
          const isSelected = domain.id === activeDomainId;
          return (
            <button
              key={domain.id}
              className={`stone-nav-pill ${isSelected ? 'selected' : ''}`}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => handleDomainSelect(domain)}
              style={{
                borderColor: isSelected ? domain.color : 'rgba(0, 229, 255, 0.15)',
                boxShadow: isSelected ? `0 0 20px ${domain.color}55` : 'none',
              }}
            >
              <span className="stone-pill-gem" style={{ color: domain.color }}>
                <IconComponent size={16} />
              </span>
              <span className="stone-pill-title">{domain.title}</span>
              {isSelected && <span className="stone-pill-active-dot" style={{ background: domain.color }} />}
            </button>
          );
        })}
      </div>

      {/* Main 3D Studio Stage: Center 3D Developer + Right Subskills Holographic Inspector */}
      <div className="stage-interactive-grid">
        {/* Left/Center Column: 3D Developer Avatar Power Chamber */}
        <div className="stage-developer-column">
          <div
            className="stage-avatar-container"
            style={{
              transform: `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
            }}
          >
            {/* Holographic Power Chamber Frame */}
            <div
              className="stage-avatar-frame"
              style={{
                borderColor: `${activeDomain.color}66`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), inset 0 0 40px ${activeDomain.color}33`,
              }}
            >
              <img
                src="/developer-power-stones-avatar.png"
                alt="Mohan Raj - 3D Developer with Orbiting Power Stones Avatar"
                className="stage-avatar-image"
              />
              <div className="stage-avatar-scanline" />
              <div className="stage-avatar-beam" style={{ background: `linear-gradient(to bottom, transparent, ${activeDomain.color}15, transparent)` }} />
            </div>

            {/* Floating Energy Beam Link to Inspector */}
            <div className="stage-energy-link-badge" style={{ borderColor: activeDomain.color, color: activeDomain.color }}>
              <Flame size={13} />
              <span>POWER ENGINE ACTIVE // {activeDomain.stoneName}</span>
            </div>

            {/* Developer Speech Dialogue HUD */}
            <div className="stage-dialogue-hud">
              <div className="hud-speech-text">
                &gt; &quot;Mohan Raj is wielding <strong style={{ color: activeDomain.color }}>{activeDomain.title}</strong> powers! Select sub-skills to inspect capabilities.&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Holographic Sub-Skills Video Inspector HUD */}
        <div className="stage-inspector-column">
          <div className="inspector-card-glass" style={{ borderColor: `${activeDomain.color}44` }}>
            {/* Inspector Header */}
            <div className="inspector-header">
              <div>
                <div className="inspector-sub-classification" style={{ color: activeDomain.color }}>
                  {activeDomain.stoneName}
                </div>
                <h3 className="inspector-main-title">{activeDomain.title} CAPABILITIES</h3>
              </div>
              <div className="inspector-gem-badge" style={{ borderColor: activeDomain.color, color: activeDomain.color }}>
                <Zap size={18} />
              </div>
            </div>

            <p className="inspector-summary-p">{activeDomain.summary}</p>

            {/* Sub-Skills Power Nodes Wrap */}
            <div className="subskill-nodes-grid">
              {activeDomain.subSkills.map((sub) => {
                const isSubSelected = sub.name === activeSubSkill.name;
                return (
                  <button
                    key={sub.name}
                    className={`subskill-node-chip ${isSubSelected ? 'active' : ''}`}
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveSubSkill(sub);
                    }}
                    style={{
                      borderColor: isSubSelected ? activeDomain.color : 'rgba(0, 229, 255, 0.15)',
                      background: isSubSelected ? `${activeDomain.color}18` : 'rgba(6, 21, 37, 0.7)',
                      boxShadow: isSubSelected ? `0 0 16px ${activeDomain.color}44` : 'none',
                    }}
                  >
                    <span className="node-dot" style={{ background: isSubSelected ? activeDomain.color : '#94A3B8' }} />
                    <span className="node-name">{sub.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Sub-Skill Power Inspector HUD Details */}
            {activeSubSkill && (
              <div className="active-subskill-hud-box" style={{ borderColor: `${activeDomain.color}33` }}>
                <div className="hud-sub-top-row">
                  <div className="hud-sub-name-wrap">
                    <CheckCircle2 size={16} color={activeDomain.color} />
                    <span className="hud-sub-title">{activeSubSkill.name}</span>
                  </div>
                  <div className="hud-sub-rank-tag" style={{ color: activeDomain.color, borderColor: `${activeDomain.color}44`, background: `${activeDomain.color}10` }}>
                    CAPABILITY ACTIVE
                  </div>
                </div>

                {/* Subskill Power Charge Meter */}
                <div className="hud-power-bar-track">
                  <div
                    className="hud-power-bar-fill"
                    style={{
                      width: `${activeSubSkill.level}%`,
                      background: `linear-gradient(90deg, ${activeDomain.color}88, ${activeDomain.color})`,
                      boxShadow: `0 0 14px ${activeDomain.color}`,
                    }}
                  />
                </div>

                <p className="hud-sub-desc">{activeSubSkill.description}</p>

                {/* Subskill Live Code Snippet Terminal */}
                <div className="hud-code-terminal">
                  <div className="terminal-header-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                    <span className="terminal-file-name">&gt; {activeSubSkill.name.toLowerCase()}-capability.ts</span>
                  </div>
                  <pre className="terminal-code-pre">
                    <code>{activeSubSkill.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
