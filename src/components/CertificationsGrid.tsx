import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BrainCircuit, Sparkles, Code2, Trophy, ShieldCheck, CheckCircle2, X, ExternalLink, Flame, Terminal } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface DigitalCertificate {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  category: string;
  badge: string;
  certId?: string;
  date: string;
  skills: string[];
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  sealType: 'gold' | 'cyan' | 'purple' | 'emerald';
}

const DIGITAL_CERTIFICATES: DigitalCertificate[] = [
  {
    id: 'intel-ai-ml',
    title: 'Intel® Unnati Data-Centric Lab',
    subtitle: 'Artificial Intelligence & Machine Learning',
    issuer: 'Intel® Unnati Data-Centric Lab',
    category: 'AI & MACHINE LEARNING',
    badge: 'INTEL® VERIFIED',
    date: '2024',
    skills: ['Deep Learning', 'Machine Learning Models', 'Data-Centric AI', 'Neural Networks', 'Python'],
    icon: BrainCircuit,
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    sealType: 'cyan',
  },
  {
    id: 'aicte-mic',
    title: 'AICTE Innovation Ambassador (IA)',
    subtitle: 'Innovation Ambassador Training Program',
    issuer: "Ministry of Education's Innovation Cell (MIC) & AICTE",
    category: 'INNOVATION & STARTUP',
    badge: 'MIC & AICTE AMBASSADOR',
    date: '2024 — 2025',
    skills: ['Design Thinking', 'Innovation Management', 'Startup Ecosystem', 'IP Strategy'],
    icon: Sparkles,
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    sealType: 'purple',
  },
  {
    id: 'infosys-python',
    title: 'Infosys Springboard – Python Programming',
    subtitle: 'Course Completion Certificate',
    issuer: 'Infosys Springboard',
    category: 'SOFTWARE ENGINEERING',
    badge: 'INFOSYS CERTIFIED',
    date: '2024',
    skills: ['Python Programming', 'Data Structures', 'OOP Architecture', 'Problem Solving'],
    icon: Code2,
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    sealType: 'cyan',
  },
  {
    id: 'ieee-member-cert',
    title: 'IEEE Membership Certificate',
    subtitle: 'Official Member & Leadership Credential',
    issuer: 'IEEE Global Organization',
    category: 'PROFESSIONAL LEADERSHIP',
    badge: 'IEEE OFFICIAL MEMBER',
    date: '2023 — PRESENT',
    skills: ['Technical Leadership', 'Community Outreach', 'Global Network', 'Event Operations'],
    icon: Trophy,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    sealType: 'gold',
  },
  {
    id: 'skillrack-python',
    title: 'Python 3.x – Programming Course (Hands-On)',
    subtitle: 'Hands-On Coding & Algorithmic Practice',
    issuer: 'SkillRack Platform',
    category: 'HANDS-ON PROGRAMMING',
    badge: 'SKILLRACK VERIFIED',
    certId: '560258/AMV',
    date: '2024',
    skills: ['Python 3.x', 'Hands-On Coding', 'Algorithm Debugging', 'Competitive Logic'],
    icon: Terminal,
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    sealType: 'emerald',
  },
];

export const CertificationsGrid: React.FC = () => {
  const [activeCert, setActiveCert] = useState<DigitalCertificate | null>(null);

  useEffect(() => {
    if (activeCert) {
      document.body.classList.add('hide-header-for-modal');
    } else {
      document.body.classList.remove('hide-header-for-modal');
    }
    return () => {
      document.body.classList.remove('hide-header-for-modal');
    };
  }, [activeCert]);

  return (
    <>
      {/* Grid of Digital Certificate Frames */}
      <div className="digital-frame-grid">
        {DIGITAL_CERTIFICATES.map((cert, idx) => {
          const IconComp = cert.icon;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => {
                soundEngine.playModalOpen();
                setActiveCert(cert);
              }}
              className="digital-cert-frame-card"
              style={
                {
                  '--accent': cert.accentColor,
                  '--glow': cert.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Outer Metallic Frame Corner Pins */}
              <span className="frame-corner corner-tl" />
              <span className="frame-corner corner-tr" />
              <span className="frame-corner corner-bl" />
              <span className="frame-corner corner-br" />

              {/* Shimmer Light Reflection */}
              <div className="frame-reflection-sheen" />

              {/* Card Header Seal */}
              <div className="digital-frame-header">
                <span className="frame-badge-pill">{cert.badge}</span>
                <div className="frame-icon-emblem">
                  <IconComp size={22} color={cert.accentColor} />
                </div>
              </div>

              {/* Certificate Main Title & Subtitle */}
              <div className="digital-frame-body">
                <div className="cert-category-text">{cert.category}</div>
                <h3 className="digital-cert-title">{cert.title}</h3>
                <div className="digital-cert-sub">{cert.subtitle}</div>
                <div className="digital-cert-issuer">Issued by {cert.issuer}</div>

                {cert.certId && (
                  <div className="cert-id-tag">
                    CERTIFICATE ID: <strong>{cert.certId}</strong>
                  </div>
                )}
              </div>

              {/* Bottom Frame Footer */}
              <div className="digital-frame-footer">
                <span className="frame-date">{cert.date}</span>
                <button className="frame-inspect-btn">
                  INSPECT DIGITAL FRAME <ExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULL-SCREEN DIGITAL CERTIFICATE FRAME INSPECTION MODAL */}
      <AnimatePresence>
        {activeCert && (
          <div
            className="modal-overlay"
            onClick={() => {
              soundEngine.playModalClose();
              setActiveCert(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="digital-certificate-modal-frame"
              onClick={(e) => e.stopPropagation()}
              style={
                {
                  '--accent': activeCert.accentColor,
                  '--glow': activeCert.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playModalClose();
                  setActiveCert(null);
                }}
              >
                <X size={20} />
              </button>

              {/* Double Border Authentic Certificate Frame Inner Structure */}
              <div className="cert-modal-inner-border">
                {/* Top Holographic Security Header */}
                <div className="cert-modal-top-bar">
                  <div className="cert-modal-seal-badge">
                    <ShieldCheck size={18} color={activeCert.accentColor} />
                    <span>VERIFIED DIGITAL CREDENTIAL</span>
                  </div>
                  <div className="cert-modal-category">{activeCert.category}</div>
                </div>

                {/* Main Formal Certificate Content */}
                <div className="cert-modal-content-center">
                  <div className="cert-formal-header">CERTIFICATE OF ACHIEVEMENT</div>
                  <div className="cert-formal-sub">THIS ACKNOWLEDGES THAT</div>
                  <div className="cert-recipient-name">MOHAN RAJ</div>
                  <div className="cert-formal-text">HAS SUCCESSFULLY COMPLETED AND BEEN AWARDED</div>

                  <h2 className="cert-modal-main-title">{activeCert.title}</h2>
                  <div className="cert-modal-subtitle-text">{activeCert.subtitle}</div>

                  <div className="cert-formal-issuer-box">
                    <span>ISSUING AUTHORITY:</span>
                    <strong>{activeCert.issuer}</strong>
                  </div>

                  {activeCert.certId && (
                    <div className="cert-id-badge">
                      OFFICIAL ID: <span>{activeCert.certId}</span>
                    </div>
                  )}

                  {/* Skills Verified Pills */}
                  <div className="cert-modal-skills-row">
                    {activeCert.skills.map((sk) => (
                      <span key={sk} className="modal-skill-chip">
                        <CheckCircle2 size={11} color={activeCert.accentColor} /> {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Verification Seal & Signature Row */}
                <div className="cert-modal-bottom-row">
                  <div className="cert-stamp-box">
                    <div className="stamp-circle">
                      <ShieldCheck size={24} color={activeCert.accentColor} />
                    </div>
                    <div>
                      <div className="stamp-text">AUTHENTICATED</div>
                      <div className="stamp-hash">HASH: 0x8F92...C401</div>
                    </div>
                  </div>

                  <div className="cert-date-box">
                    <span>DATE ISSUED</span>
                    <strong>{activeCert.date}</strong>
                  </div>

                  <button
                    className="cyber-button primary"
                    style={{ background: activeCert.accentColor, borderColor: activeCert.accentColor, color: '#000' }}
                    onMouseEnter={() => soundEngine.playHover()}
                    onClick={() => {
                      soundEngine.playModalClose();
                      setActiveCert(null);
                    }}
                  >
                    CLOSE CERTIFICATE FRAME
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
