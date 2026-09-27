import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Cpu, Users, Award, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

interface StatItem {
  id: string;
  target: number;
  suffix?: string;
  padZero?: boolean;
  label: string;
  sublabel: string;
  category: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'projects',
    target: 12,
    suffix: '+',
    label: 'PROJECTS',
    sublabel: 'Deployed Systems',
    category: '01 // WORK',
    icon: Code2,
    accentColor: '#00f2fe',
    glowColor: 'rgba(0, 242, 254, 0.35)',
  },
  {
    id: 'technologies',
    target: 20,
    suffix: '+',
    label: 'TECHNOLOGIES',
    sublabel: 'Frameworks & Tools',
    category: '02 // STACK',
    icon: Cpu,
    accentColor: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
  },
  {
    id: 'events',
    target: 15,
    suffix: '+',
    label: 'EVENTS LED',
    sublabel: 'IEEE & Tech Drives',
    category: '03 // IMPACT',
    icon: Users,
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
  },
  {
    id: 'certifications',
    target: 5,
    padZero: true,
    label: 'CERTIFICATIONS',
    sublabel: 'Verified Badges',
    category: '04 // CREDITS',
    icon: Award,
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.35)',
  },
];

interface SingleStatCardProps {
  stat: StatItem;
  index: number;
}

const SingleStatCard: React.FC<SingleStatCardProps> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const [count, setCount] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for smooth counting deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * stat.target);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(stat.target);
        setIsDone(true);
      }
    };

    const animFrame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, stat.target]);

  const IconComponent = stat.icon;

  const formatDisplay = (val: number) => {
    if (stat.padZero && val < 10) {
      return `0${val}`;
    }
    return `${val}`;
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.8, 0.25, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="stat-cyber-box"
      style={
        {
          '--accent': stat.accentColor,
          '--glow': stat.glowColor,
        } as React.CSSProperties
      }
    >
      {/* Corner Bracket Accents */}
      <span className="cyber-bracket bracket-tl" />
      <span className="cyber-bracket bracket-tr" />
      <span className="cyber-bracket bracket-bl" />
      <span className="cyber-bracket bracket-br" />

      {/* Interactive Scanline & Light Aura */}
      <div className="stat-card-scanline" />
      <div className="stat-card-glow-bg" />

      {/* Top Meta Bar */}
      <div className="stat-card-header">
        <span className="stat-category-tag">{stat.category}</span>
        <div className="stat-icon-wrapper">
          <IconComponent className="stat-icon" size={18} />
        </div>
      </div>

      {/* Main Counter Display */}
      <div className="stat-main-row">
        <div className="stat-number-wrapper">
          <span className="stat-counter-value">{formatDisplay(count)}</span>
          {stat.suffix && (
            <motion.span
              className="stat-suffix"
              animate={isDone ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {stat.suffix}
            </motion.span>
          )}
        </div>
        <div className="stat-status-dot-wrap">
          <span className={`stat-pulse-dot ${isDone ? 'done' : 'active'}`} />
        </div>
      </div>

      {/* Bottom Info & Progress Track */}
      <div className="stat-card-footer">
        <div className="stat-label-title">{stat.label}</div>
        <div className="stat-sublabel-text">{stat.sublabel}</div>
        
        {/* Animated Cyber Progress Bar */}
        <div className="stat-progress-track">
          <motion.div
            className="stat-progress-fill"
            initial={{ width: '0%' }}
            animate={isInView ? { width: `${(count / stat.target) * 100}%` } : { width: '0%' }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const AboutStatsGrid: React.FC = () => {
  return (
    <div className="stats-glass-grid-v2">
      {STATS_DATA.map((stat, idx) => (
        <SingleStatCard key={stat.id} stat={stat} index={idx} />
      ))}
    </div>
  );
};
