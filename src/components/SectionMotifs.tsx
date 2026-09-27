import React from 'react';

// 1. Startup & Innovation Background Motif (About Section)
export const AboutStartupBackgroundMotif: React.FC = () => {
  return (
    <div className="bg-section-motif motif-left">
      <svg width="420" height="420" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-motif-anim-spin">
        {/* Outer Innovation Tech Grid */}
        <circle cx="200" cy="200" r="180" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="6 8" opacity="0.18" />
        <circle cx="200" cy="200" r="130" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="12 12" opacity="0.25" />
        <circle cx="200" cy="200" r="70" stroke="#22D3EE" strokeWidth="1" opacity="0.2" />

        {/* Startup Lightbulb & Innovation Vector */}
        <path d="M200 120 C165 120 150 150 150 180 C150 205 170 220 175 235 L225 235 C230 220 250 205 250 180 C250 150 235 120 200 120 Z" stroke="#00E5FF" strokeWidth="2.5" fill="rgba(0, 229, 255, 0.03)" opacity="0.3" />
        <line x1="180" y1="248" x2="220" y2="248" stroke="#00E5FF" strokeWidth="2" opacity="0.4" />
        <line x1="188" y1="258" x2="212" y2="258" stroke="#00E5FF" strokeWidth="2" opacity="0.4" />

        {/* Floating Idea Rays */}
        <line x1="200" y1="95" x2="200" y2="80" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" />
        <line x1="245" y1="110" x2="258" y2="98" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" />
        <line x1="155" y1="110" x2="142" y2="98" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" />

        {/* Circuit Nodes */}
        <circle cx="200" cy="80" r="4" fill="#00E5FF" opacity="0.5" />
        <circle cx="258" cy="98" r="4" fill="#8B5CF6" opacity="0.5" />
        <circle cx="142" cy="98" r="4" fill="#8B5CF6" opacity="0.5" />
      </svg>
    </div>
  );
};

// 2. Developing Products & Code Architecture Motif (Skills Section)
export const SkillsProductBackgroundMotif: React.FC = () => {
  return (
    <div className="bg-section-motif motif-right">
      <svg width="480" height="380" viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-motif-anim-pulse">
        {/* Product Wireframe Grid */}
        <rect x="20" y="20" width="440" height="340" rx="12" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.15" />
        <line x1="20" y1="65" x2="460" y2="65" stroke="#00E5FF" strokeWidth="1" opacity="0.15" />
        <line x1="140" y1="65" x2="140" y2="360" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 4" opacity="0.12" />

        {/* Database & API Schema Blocks */}
        <rect x="160" y="85" width="130" height="90" rx="8" stroke="#8B5CF6" strokeWidth="1.5" fill="rgba(139, 92, 246, 0.04)" opacity="0.3" />
        <text x="172" y="112" fill="#8B5CF6" fontSize="11" fontFamily="JetBrains Mono" opacity="0.6">DB_SCHEMA</text>
        <line x1="172" y1="125" x2="270" y2="125" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />
        <line x1="172" y1="140" x2="250" y2="140" stroke="#8B5CF6" strokeWidth="1" opacity="0.3" />

        <rect x="310" y="85" width="130" height="90" rx="8" stroke="#00E5FF" strokeWidth="1.5" fill="rgba(0, 229, 255, 0.04)" opacity="0.3" />
        <text x="322" y="112" fill="#00E5FF" fontSize="11" fontFamily="JetBrains Mono" opacity="0.6">REST_API</text>
        <line x1="322" y1="125" x2="420" y2="125" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />

        {/* Connecting Vector Line */}
        <path d="M290 130 L310 130" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
        <circle cx="300" cy="130" r="3" fill="#00E5FF" opacity="0.7" />

        {/* UI Wireframe Cards */}
        <rect x="160" y="200" width="280" height="130" rx="8" stroke="#22D3EE" strokeWidth="1" fill="rgba(34, 211, 238, 0.02)" opacity="0.25" />
        <circle cx="185" cy="225" r="10" stroke="#22D3EE" strokeWidth="1" opacity="0.4" />
        <line x1="205" y1="225" x2="380" y2="225" stroke="#22D3EE" strokeWidth="2" opacity="0.3" />
        <rect x="185" y="248" width="110" height="60" rx="4" stroke="#22D3EE" strokeWidth="1" opacity="0.25" />
        <rect x="305" y="248" width="110" height="60" rx="4" stroke="#22D3EE" strokeWidth="1" opacity="0.25" />
      </svg>
    </div>
  );
};

// 3. Developing Products Blueprint Motif (Projects Section)
export const ProjectsDevelopingBackgroundMotif: React.FC = () => {
  return (
    <div className="bg-section-motif motif-center">
      <svg width="600" height="340" viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-motif-anim-float">
        {/* Floating Blueprint Lines */}
        <path d="M50 170 Q 200 40 300 170 T 550 170" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="8 8" opacity="0.18" />
        <path d="M50 210 Q 200 320 300 210 T 550 210" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.18" />

        {/* Product Release & Deploy Nodes */}
        <g opacity="0.35">
          <circle cx="100" cy="170" r="16" stroke="#00E5FF" strokeWidth="2" fill="rgba(6, 21, 37, 0.9)" />
          <text x="94" y="174" fill="#00E5FF" fontSize="10" fontFamily="JetBrains Mono">V1</text>

          <circle cx="300" cy="170" r="20" stroke="#8B5CF6" strokeWidth="2" fill="rgba(6, 21, 37, 0.9)" />
          <text x="290" y="174" fill="#8B5CF6" fontSize="10" fontFamily="JetBrains Mono">PROD</text>

          <circle cx="500" cy="170" r="16" stroke="#22D3EE" strokeWidth="2" fill="rgba(6, 21, 37, 0.9)" />
          <text x="494" y="174" fill="#22D3EE" fontSize="10" fontFamily="JetBrains Mono">AI</text>
        </g>
      </svg>
    </div>
  );
};

// 4. Achieving Medals & Trophies Background Motif (Leadership & Certifications Section)
export const MedalsTrophiesBackgroundMotif: React.FC = () => {
  return (
    <div className="bg-section-motif motif-right">
      <svg width="450" height="450" viewBox="0 0 450 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-motif-anim-spin-slow">
        {/* Glowing Award Medal & Trophy Aura */}
        <circle cx="225" cy="225" r="200" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 8" opacity="0.15" />
        <circle cx="225" cy="225" r="150" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="12 6" opacity="0.2" />

        {/* 3D Medal Graphic */}
        <g transform="translate(145, 120)" opacity="0.3">
          {/* Medal Ribbon */}
          <path d="M50 0 L25 70 L50 85 L75 70 L50 0 Z" stroke="#00E5FF" strokeWidth="2" fill="rgba(0, 229, 255, 0.08)" />
          <path d="M110 0 L135 70 L110 85 L85 70 L110 0 Z" stroke="#8B5CF6" strokeWidth="2" fill="rgba(139, 92, 246, 0.08)" />

          {/* Medal Circular Badge */}
          <circle cx="80" cy="115" r="45" stroke="#00E5FF" strokeWidth="3" fill="rgba(6, 21, 37, 0.95)" />
          <circle cx="80" cy="115" r="36" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* IEEE Star Emblem inside Medal */}
          <polygon points="80,85 87,102 105,102 91,114 96,131 80,120 64,131 69,114 55,102 73,102" fill="#00E5FF" opacity="0.8" />
        </g>

        {/* Floating Trophies on sides */}
        <g transform="translate(30, 260)" opacity="0.25">
          {/* Cyber Trophy Cup */}
          <path d="M15 10 L65 10 L55 50 C55 65 25 65 25 50 Z" stroke="#8B5CF6" strokeWidth="2" fill="rgba(139, 92, 246, 0.1)" />
          <line x1="40" y1="65" x2="40" y2="85" stroke="#8B5CF6" strokeWidth="2" />
          <rect x="20" y="85" width="40" height="15" rx="3" stroke="#8B5CF6" strokeWidth="2" fill="rgba(139, 92, 246, 0.2)" />
        </g>

        <g transform="translate(330, 80)" opacity="0.25">
          {/* Achievement Star Badge */}
          <circle cx="35" cy="35" r="30" stroke="#00E5FF" strokeWidth="2" fill="rgba(0, 229, 255, 0.06)" />
          <polygon points="35,15 40,27 52,27 42,35 46,47 35,39 24,47 28,35 18,27 30,27" fill="#00E5FF" />
        </g>
      </svg>
    </div>
  );
};
