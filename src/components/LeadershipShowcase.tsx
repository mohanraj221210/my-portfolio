import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Smartphone, Globe, Code2, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface AchievementItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlightText?: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
}

const LEADERSHIP_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ieee-chair',
    badge: 'CHAIRMAN // LEADERSHIP',
    title: 'Student Branch Chairman – JIT IEEE Student Branch',
    subtitle: 'Jeppiaar Institute of Technology',
    description: 'Led technical initiatives, student activities, campus hackathons, engineering workshops, and volunteer coordination across the institution.',
    highlightText: 'EXECUTIVE LEADERSHIP',
    icon: Trophy,
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.35)',
  },
  {
    id: 'sac-award',
    badge: 'SAC AWARD 2025 // GOLDEN CATEGORY',
    title: 'IEEE Madras Section SAC Award 2025',
    subtitle: 'Golden Category Excellence',
    description: 'Contributed as Student Branch Chairman to the award-winning JIT IEEE Student Branch, recognized across the entire IEEE Madras Section.',
    highlightText: 'GOLDEN CATEGORY',
    icon: Award,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
  },
  {
    id: 'jitconnect',
    badge: 'FRAME OF APPRECIATION // MOBILE APP',
    title: 'JITConnect – College Alumni App Recognition',
    subtitle: 'Jeppiaar Institute of Technology Contribution',
    description: 'Developed and launched JITConnect, a college alumni networking mobile application connecting students and alumni. Honored with a Frame of Appreciation from Jeppiaar Institute of Technology.',
    highlightText: 'ALUMNI APP LAUNCHED',
    icon: Smartphone,
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
  },
  {
    id: 'organizer-award',
    badge: 'EXCELLENCE AWARD 2025',
    title: 'JIT IEEE Excellence Award 2025',
    subtitle: 'Best Event Organizer',
    description: 'Recognized for outstanding contribution to organizing and coordinating high-impact technical events, coding sprints & workshops.',
    highlightText: 'BEST EVENT ORGANIZER',
    icon: Sparkles,
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
  },
  {
    id: 'webmaster',
    badge: 'WEBMASTER // DIGITAL OPS',
    title: 'IEEE Computer Society Webmaster (2024)',
    subtitle: 'IEEE Computer Society Chapter',
    description: 'Managed digital platforms, web presence, and technical operations for IEEE Computer Society initiatives.',
    highlightText: 'DIGITAL OPERATIONS',
    icon: Globe,
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
  },
  {
    id: 'skillrack-pro',
    badge: 'CODING MILESTONE // 2,000+ SOLVED',
    title: 'SkillRack 2,000+ Algorithmic Problems Solved',
    subtitle: 'SkillRack ID: MOHAN RAJ-210623205029@jeppiaarit',
    description: 'Solved 2,000+ coding challenges on SkillRack, demonstrating advanced data structures, algorithmic thinking, debugging, and computational problem-solving.',
    highlightText: '2,000+ PROBLEMS SOLVED',
    icon: Code2,
    accentColor: '#ec4899',
    glowColor: 'rgba(236, 72, 153, 0.35)',
  },
];

export const LeadershipShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  return (
    <div className="ieee-leadership-v4">
      {/* Header Command Banner */}
      <div className="ieee-banner-box">
        <div className="ieee-banner-content">
          <div className="section-label-chip">
            <Trophy size={14} /> IEEE &amp; TECHNICAL LEADERSHIP // HONORS
          </div>
          <h2 className="ieee-banner-title">Leadership &amp; Achievements</h2>
          <p className="ieee-banner-desc">
            Executive leadership, section awards, alumni mobile app recognition, and 2,000+ coding problem solutions.
          </p>
        </div>

        <div className="ieee-chair-seal">
          <ShieldCheck size={28} color="#00E5FF" />
          <div>
            <div className="seal-title">MOHAN RAJ</div>
            <div className="seal-sub">IEEE STUDENT BRANCH CHAIR</div>
          </div>
        </div>
      </div>

      {/* Grid of Achievement Cards */}
      <div className="ieee-achievements-grid">
        {LEADERSHIP_ACHIEVEMENTS.map((item, idx) => {
          const IconComp = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.015 }}
              onMouseEnter={() => soundEngine.playHover()}
              onClick={() => soundEngine.playClick()}
              className="achievement-cyber-card"
              style={
                {
                  '--accent': item.accentColor,
                  '--glow': item.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Corner brackets */}
              <span className="cyber-bracket bracket-tl" />
              <span className="cyber-bracket bracket-tr" />
              <span className="cyber-bracket bracket-bl" />
              <span className="cyber-bracket bracket-br" />

              <div className="card-top-row">
                <div className="achievement-icon-wrap">
                  <IconComp size={22} color={item.accentColor} />
                </div>
                <span className="achievement-badge">{item.badge}</span>
              </div>

              <div className="card-mid-body">
                <h3 className="achievement-title">{item.title}</h3>
                <div className="achievement-sub">{item.subtitle}</div>
                <p className="achievement-desc">{item.description}</p>
              </div>

              <div className="card-bottom-bar">
                {item.highlightText && (
                  <span className="achievement-tag-pill">
                    <CheckCircle2 size={12} color={item.accentColor} /> {item.highlightText}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
