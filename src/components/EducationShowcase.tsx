import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, CheckCircle2, Sparkles, Trophy, BrainCircuit } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  timeline: string;
  statusTag: string;
  scoreLabel: string;
  scoreValue: string;
  progressPercent: number;
  category: string;
  badge: string;
  highlights: string[];
  accentColor: string;
  glowColor: string;
  icon: React.ElementType;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'btech-it',
    degree: 'B.Tech. in Information Technology',
    institution: 'Jeppiaar Institute of Technology',
    location: 'Sriperumbudur, Tamil Nadu',
    timeline: '2023 – 2027',
    statusTag: 'Current Status: 4th Year, 7th Semester',
    scoreLabel: 'CGPA SCORE',
    scoreValue: '7.43 / 10',
    progressPercent: 74.3,
    category: 'UNDERGRADUATE DEGREE',
    badge: 'UNDERGRADUATE',
    highlights: [
      'Pursuing B.Tech in Information Technology with a focus on Full Stack Development & Software Architecture.',
      'Active IEEE Student Branch Chairman, organizing technical symposia, hackathons, and developer workshops.',
      'Core coursework: Data Structures, Database Systems, Web Engineering, Cloud Systems, and Mobile App Development.',
    ],
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    icon: GraduationCap,
  },
  {
    id: 'hsc-12th',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Infant Jesus Matriculation Higher Secondary School',
    location: 'Kancheepuram, Tamil Nadu',
    timeline: '2022 – 2023',
    statusTag: 'Completed with 72%',
    scoreLabel: 'SCORE PERCENTAGE',
    scoreValue: '72%',
    progressPercent: 72,
    category: 'HIGHER SECONDARY (12TH)',
    badge: 'CLASS 12TH',
    highlights: [
      'Completed Higher Secondary Education specializing in Mathematics, Computer Science, and Physical Sciences.',
      'Developed early passion for computer logic, basic programming concepts, and web technology fundamentals.',
    ],
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    icon: BookOpen,
  },
  {
    id: 'sslc-10th',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Infant Jesus Matriculation Higher Secondary School',
    location: 'Kancheepuram, Tamil Nadu',
    timeline: '2020 – 2021',
    statusTag: 'Completed with 100% Centum',
    scoreLabel: 'SCORE PERCENTAGE',
    scoreValue: '100%',
    progressPercent: 100,
    category: 'SECONDARY SCHOOL (10TH)',
    badge: '100% CENTUM SCORE',
    highlights: [
      'Achieved a perfect 100% Centum score in Secondary School Leaving Certificate (SSLC) examinations.',
      'Recognized for academic excellence, problem-solving aptitude, and foundational analytical skills.',
    ],
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    icon: Trophy,
  },
];

export const EducationShowcase: React.FC = () => {
  return (
    <div className="education-container-v2">
      {/* Education Timeline Grid */}
      <div className="education-cards-grid">
        {EDUCATION_DATA.map((item, idx) => {
          const IconComp = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="education-cyber-card"
              onMouseEnter={() => soundEngine.playHover()}
              style={
                {
                  '--accent': item.accentColor,
                  '--glow': item.glowColor,
                } as React.CSSProperties
              }
            >
              {/* Corner Sci-Fi Brackets */}
              <span className="cyber-bracket bracket-tl" />
              <span className="cyber-bracket bracket-tr" />
              <span className="cyber-bracket bracket-bl" />
              <span className="cyber-bracket bracket-br" />

              {/* Background Light Aura */}
              <div className="education-card-glow" />
              <div className="education-card-scanline" />

              {/* Top Card Telemetry Header */}
              <div className="edu-card-top-header">
                <div className="edu-category-tag">
                  <Sparkles size={13} color={item.accentColor} />
                  <span>{item.category}</span>
                </div>
                <div className="edu-badge-chip">{item.badge}</div>
              </div>

              {/* Main Info Box */}
              <div className="edu-main-info-box">
                <div className="edu-icon-shield">
                  <IconComp size={22} color={item.accentColor} />
                </div>
                <div className="edu-title-group">
                  <h3 className="edu-degree-title">{item.degree}</h3>
                  <div className="edu-institution-name">{item.institution}</div>
                  <div className="edu-location-line">
                    <MapPin size={13} /> {item.location}
                  </div>
                </div>
              </div>

              {/* Status Pill & Timeline Bar */}
              <div className="edu-status-row">
                <div className="edu-timeline-pill">
                  <Calendar size={13} /> {item.timeline}
                </div>
                <div className="edu-status-chip">
                  <span className="status-live-dot" />
                  <span>{item.statusTag}</span>
                </div>
              </div>

              {/* Score Meter Counter Display */}
              <div className="edu-score-meter-container">
                <div className="edu-score-labels">
                  <span className="score-meter-title">{item.scoreLabel}</span>
                  <span className="score-meter-value">{item.scoreValue}</span>
                </div>
                <div className="edu-progress-track">
                  <motion.div
                    className="edu-progress-fill"
                    initial={{ width: '0%' }}
                    whileInView={{ width: `${item.progressPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Bullet Highlights */}
              <div className="edu-highlights-list">
                {item.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="edu-highlight-item">
                    <CheckCircle2 size={14} color={item.accentColor} className="bullet-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
