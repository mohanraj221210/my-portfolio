import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Flame,
  CheckCircle2,
  Calendar,
  Building2,
  Terminal,
  Cpu,
  Palette,
  Zap,
  Star,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export interface ExperienceMission {
  id: string;
  role: string;
  organization: string;
  period: string;
  badge: string;
  category: string;
  icon: React.ElementType;
  bullets: string[];
  skills: string[];
  accentColor: string;
  glowColor: string;
}

const EXPERIENCES: ExperienceMission[] = [
  {
    id: 'startup-associate',
    role: 'Startup Development & Innovation Associate',
    organization: "Moe's Innovation Cell | CrewPlay.in & EdSurX",
    period: 'June 2025 – Sep 2026',
    badge: 'ACTIVE ORBIT MISSION',
    category: 'FULL STACK & INNOVATION',
    icon: Terminal,
    bullets: [
      'Collaborated with startup teams to design and develop scalable web applications.',
      'Participated in feature planning, technical discussions, and product architecture.',
      'Built and improved user-facing interfaces using React.js and modern web technologies.',
      'Assisted in API integration, debugging, deployment, and testing.',
      'Supported product launches through technical coordination and user engagement.',
    ],
    skills: ['React.js', 'Node.js', 'REST APIs', 'Product Architecture', 'UI/UX Engineering', 'Startup Strategy'],
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
  },
  {
    id: 'intel-ai-intern',
    role: 'AI/ML Intern / Trainee',
    organization: 'Intel® Unnati Data-Centric Lab',
    period: 'October 2024 – February 2025',
    badge: 'INTEL® AI MISSION',
    category: 'ARTIFICIAL INTELLIGENCE',
    icon: Cpu,
    bullets: [
      'Gained hands-on experience in Artificial Intelligence, Machine Learning, Deep Learning, and data-centric problem-solving.',
      'Worked with data analysis, predictive modeling concepts, and project-based learning.',
    ],
    skills: ['Machine Learning', 'Deep Learning', 'Data Preprocessing', 'Predictive Modeling', 'Python', 'Data Analytics'],
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
  },
  {
    id: 'graphic-design-intern',
    role: 'Graphic Design Intern',
    organization: 'Dark Pixels',
    period: 'November 2023 – December 2023',
    badge: 'CREATIVE DESIGN MISSION',
    category: 'DIGITAL MEDIA & BRANDING',
    icon: Palette,
    bullets: [
      'Created digital graphics, posters, branding materials, and visual communication content.',
      'Developed practical skills in design, creativity, and visual storytelling.',
    ],
    skills: ['Digital Graphics', 'Brand Visuals', 'Poster Design', 'Visual Storytelling', 'Adobe Creative Tools'],
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
  },
];

export const RocketExperienceTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const handleSelectExperience = (idx: number) => {
    if (idx !== activeIdx) {
      soundEngine.playRocketPulse();
      setActiveIdx(idx);
    }
  };

  // Vertical position percentage along the left trajectory line for rocket alignment
  const rocketTopPercent = activeIdx === 0 ? '5%' : activeIdx === 1 ? '42%' : '80%';

  return (
    <div className="rocket-orbit-wrapper">
      {/* Left Rocket Trajectory Line Column */}
      <div className="rocket-track-column">
        {/* Vertical Glowing Line */}
        <div className="rocket-trajectory-beam" />

        {/* Orbit Star Node Beacons */}
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={exp.id}
            className={`orbit-star-point idx-${idx} ${activeIdx === idx ? 'active' : ''}`}
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => handleSelectExperience(idx)}
            style={{ '--accent': exp.accentColor } as React.CSSProperties}
          >
            <div className="star-beacon-halo" />
            <Star size={12} color={exp.accentColor} className="star-beacon-icon" />
          </div>
        ))}

        {/* Dynamic Ascending Rocket Starship Shuttle */}
        <motion.div
          className="floating-rocket-shuttle"
          animate={{ top: rocketTopPercent }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="shuttle-thruster-fire">
            <Flame size={16} color="#FF6B00" className="shuttle-flame" />
          </div>
          <div
            className="shuttle-core-icon"
            style={
              {
                borderColor: EXPERIENCES[activeIdx].accentColor,
                boxShadow: `0 0 20px ${EXPERIENCES[activeIdx].glowColor}`,
              } as React.CSSProperties
            }
          >
            <Rocket size={18} color={EXPERIENCES[activeIdx].accentColor} className="rocket-angle" />
          </div>
        </motion.div>
      </div>

      {/* Right Wide Experience Cards Column */}
      <div className="experience-cards-column">
        {EXPERIENCES.map((exp, idx) => {
          const IconComp = exp.icon;
          const isActive = activeIdx === idx;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              onMouseEnter={() => {
                soundEngine.playHover();
                handleSelectExperience(idx);
              }}
              onClick={() => handleSelectExperience(idx)}
              className={`clean-experience-card ${isActive ? 'active-mission' : ''}`}
              style={
                {
                  '--accent': exp.accentColor,
                  '--glow': exp.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Shimmer Sheen Light Bar */}
              <div className="exp-card-sheen" />

              {/* Card Header */}
              <div className="exp-card-header">
                <div className="exp-header-left">
                  <span className="exp-category-tag">{exp.category}</span>
                  <div className="exp-role-heading">
                    <IconComp size={22} color={exp.accentColor} className="role-main-icon" />
                    <h3 className="exp-role-title">{exp.role}</h3>
                  </div>
                </div>

                {/* Mission Status Badge */}
                <div className="exp-rocket-badge">
                  <div className="rocket-fire-wrapper">
                    <Flame size={14} color="#FF6B00" className="badge-flame-anim" />
                    <Rocket size={16} color={exp.accentColor} className="badge-rocket-anim" />
                  </div>
                  <span>{exp.badge}</span>
                </div>
              </div>

              {/* Organization & Period Bar */}
              <div className="exp-org-bar">
                <div className="exp-org-name">
                  <Building2 size={15} color={exp.accentColor} />
                  <span>{exp.organization}</span>
                </div>

                <div className="exp-period-badge">
                  <Calendar size={14} color="var(--secondary-text)" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Exact Bullet Points */}
              <ul className="exp-bullets-list">
                {exp.bullets.map((point, pIdx) => (
                  <li key={pIdx}>
                    <CheckCircle2 size={15} color={exp.accentColor} className="exp-bullet-icon" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {/* Skills Tech Tags */}
              <div className="exp-skills-row">
                {exp.skills.map((sk) => (
                  <span key={sk} className="exp-skill-tag">
                    <Zap size={11} color={exp.accentColor} /> {sk}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
