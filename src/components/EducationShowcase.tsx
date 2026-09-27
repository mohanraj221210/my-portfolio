import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  CheckCircle2,
  BookMarked,
  Grid,
  Book,
  Star,
  Award,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export interface EducationItem {
  id: string;
  chapterNum: string;
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
    chapterNum: 'CHAPTER 01',
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
      'Pursuing B.Tech in Information Technology with focus on Full Stack Architecture & Software Systems.',
      'Active IEEE Student Branch Chairman, organizing technical symposia, hackathons, and developer workshops.',
      'Core coursework: Data Structures, Database Systems, Web Engineering, Cloud Architecture, and Mobile Apps.',
    ],
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
    icon: GraduationCap,
  },
  {
    id: 'hsc-12th',
    chapterNum: 'CHAPTER 02',
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
    glowColor: 'rgba(168, 85, 247, 0.45)',
    icon: BookOpen,
  },
  {
    id: 'sslc-10th',
    chapterNum: 'CHAPTER 03',
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'Infant Jesus Matriculation Higher Secondary School',
    location: 'Kancheepuram, Tamil Nadu',
    timeline: '2020 – 2021',
    statusTag: 'Completed with 100% Centum',
    scoreLabel: 'SCORE PERCENTAGE',
    scoreValue: '100% CENTUM',
    progressPercent: 100,
    category: 'SECONDARY SCHOOL (10TH)',
    badge: '100% CENTUM SCORE',
    highlights: [
      'Achieved a perfect 100% Centum score in Secondary School Leaving Certificate (SSLC) examinations.',
      'Recognized for academic excellence, problem-solving aptitude, and foundational analytical skills.',
    ],
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    icon: Trophy,
  },
];

export const EducationShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'book' | 'grid'>('book');

  const activeItem = EDUCATION_DATA[activeIdx];
  const IconComp = activeItem.icon;

  const handleNext = () => {
    soundEngine.playClick();
    setActiveIdx((prev) => (prev + 1) % EDUCATION_DATA.length);
  };

  const handlePrev = () => {
    soundEngine.playClick();
    setActiveIdx((prev) => (prev - 1 + EDUCATION_DATA.length) % EDUCATION_DATA.length);
  };

  return (
    <div className="education-container-v3">
      {/* Top Header Mode Controls */}
      <div className="edu-view-mode-bar">
        <div className="edu-view-title-chip">
          <BookMarked size={14} color="#00E5FF" />
          <span>ACADEMIC CHRONICLES // 3D OPEN BOOK EXPERIENCE</span>
        </div>

        <div className="edu-mode-btn-group">
          <button
            className={`edu-mode-btn ${viewMode === 'book' ? 'active' : ''}`}
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => {
              soundEngine.playClick();
              setViewMode('book');
            }}
          >
            <Book size={14} /> MAGICAL OPEN BOOK
          </button>
          <button
            className={`edu-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onMouseEnter={() => soundEngine.playHover()}
            onClick={() => {
              soundEngine.playClick();
              setViewMode('grid');
            }}
          >
            <Grid size={14} /> MATRIX GRID
          </button>
        </div>
      </div>

      {viewMode === 'book' ? (
        /* ==================================================== */
        /* 3D MAGICAL OPEN BOOK STAGE (Matching Sample Image 2) */
        /* ==================================================== */
        <div className="open-book-stage-container">
          {/* Background Realistic 3D Magic Book Asset */}
          <div className="book-stage-backdrop">
            <img src="/open_book_magic_bg.jpg" alt="3D Open Magic Book" className="book-stage-bg-img" />
            <div className="book-stage-overlay-glow" />
          </div>

          {/* Floating Sparkle Light Beams Rising From Book Pages */}
          <div className="magical-particles-emitter">
            {[...Array(12)].map((_, i) => (
              <span key={i} className={`magic-sparkle-dot dot-${i + 1}`} />
            ))}
          </div>

          {/* Floating Interactive Hologram Orbs Over Open Pages */}
          <div className="floating-hologram-orbs-row">
            {EDUCATION_DATA.map((item, idx) => {
              const isSelected = activeIdx === idx;
              const OrbIcon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1, y: -6 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => soundEngine.playHover()}
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveIdx(idx);
                  }}
                  className={`magic-hologram-orb ${isSelected ? 'active' : ''}`}
                  style={{ '--accent': item.accentColor, '--glow': item.glowColor } as React.CSSProperties}
                >
                  <div className="orb-inner-content">
                    <OrbIcon size={18} color={item.accentColor} />
                    <span className="orb-label-badge">{item.badge}</span>
                    <span className="orb-score-val">{item.scoreValue}</span>
                  </div>
                  <div className="orb-glowing-ring" />
                  <div className="orb-light-beam-connector" />
                </motion.button>
              );
            })}
          </div>

          {/* Open Book 3D Pages Frame */}
          <div className="book-pages-3d-frame">
            {/* Page Navigation Controls */}
            <button
              className="page-turn-btn prev"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={handlePrev}
              title="Turn to Previous Chapter"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="page-turn-btn next"
              onMouseEnter={() => soundEngine.playHover()}
              onClick={handleNext}
              title="Turn to Next Chapter"
            >
              <ChevronRight size={20} />
            </button>

            {/* Animated Open Book Page Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, rotateY: -25, scale: 0.96 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: 25, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="open-book-parchment-page"
                style={{ '--accent': activeItem.accentColor, '--glow': activeItem.glowColor } as React.CSSProperties}
              >
                {/* Book Page Left & Right Side Layout */}
                <div className="page-two-sides-grid">
                  {/* LEFT PAGE: Title, Institution, Timeline, Score Meter */}
                  <div className="parchment-side left-side">
                    <div className="page-chapter-header">
                      <span className="chapter-num">{activeItem.chapterNum}</span>
                      <span className="chapter-cat">{activeItem.category}</span>
                    </div>

                    <div className="page-title-row">
                      <div className="page-icon-badge">
                        <IconComp size={24} color={activeItem.accentColor} />
                      </div>
                      <div>
                        <h3 className="page-degree-title">{activeItem.degree}</h3>
                        <div className="page-institution">{activeItem.institution}</div>
                        <div className="page-location">
                          <MapPin size={12} /> {activeItem.location}
                        </div>
                      </div>
                    </div>

                    <div className="page-meta-pills">
                      <span className="page-pill timeline">
                        <Calendar size={13} /> {activeItem.timeline}
                      </span>
                      <span className="page-pill status">
                        <span className="status-pulse-dot" /> {activeItem.statusTag}
                      </span>
                    </div>

                    {/* Animated Score Bar */}
                    <div className="page-score-box">
                      <div className="score-top-line">
                        <span className="score-lbl">{activeItem.scoreLabel}</span>
                        <span className="score-val">{activeItem.scoreValue}</span>
                      </div>
                      <div className="score-progress-track">
                        <motion.div
                          className="score-progress-fill"
                          initial={{ width: '0%' }}
                          animate={{ width: `${activeItem.progressPercent}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PAGE: Highlights & Key Achievements */}
                  <div className="parchment-side right-side">
                    <div className="right-side-heading">
                      <Star size={15} color={activeItem.accentColor} />
                      <span>ACADEMIC HIGHLIGHTS & ACHIEVEMENTS</span>
                    </div>

                    <div className="page-highlights-list">
                      {activeItem.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="page-highlight-item">
                          <CheckCircle2 size={15} color={activeItem.accentColor} className="bullet-icon" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Embossed Book Footer Stamp */}
                    <div className="parchment-stamp">
                      <Award size={14} color={activeItem.accentColor} />
                      <span>VERIFIED ACADEMIC RECORD // MOHAN RAJ</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Book Bookmark Tabs Navigation Bar */}
          <div className="book-bookmarks-nav">
            {EDUCATION_DATA.map((item, idx) => (
              <button
                key={item.id}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveIdx(idx);
                }}
                className={`bookmark-ribbon-btn ${activeIdx === idx ? 'active' : ''}`}
                style={{ '--accent': item.accentColor } as React.CSSProperties}
              >
                <span className="ribbon-num">{idx + 1}</span>
                <span className="ribbon-text">{item.badge}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ==================================================== */
        /* MATRIX GRID VIEW (Side by Side 3 Cards)             */
        /* ==================================================== */
        <div className="education-cards-grid">
          {EDUCATION_DATA.map((item, idx) => {
            const ItemIcon = item.icon;

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
                <span className="cyber-bracket bracket-tl" />
                <span className="cyber-bracket bracket-tr" />
                <span className="cyber-bracket bracket-bl" />
                <span className="cyber-bracket bracket-br" />

                <div className="education-card-glow" />
                <div className="education-card-scanline" />

                <div className="edu-card-top-header">
                  <div className="edu-category-tag">
                    <Sparkles size={13} color={item.accentColor} />
                    <span>{item.category}</span>
                  </div>
                  <div className="edu-badge-chip">{item.badge}</div>
                </div>

                <div className="edu-main-info-box">
                  <div className="edu-icon-shield">
                    <ItemIcon size={22} color={item.accentColor} />
                  </div>
                  <div className="edu-title-group">
                    <h3 className="edu-degree-title">{item.degree}</h3>
                    <div className="edu-institution-name">{item.institution}</div>
                    <div className="edu-location-line">
                      <MapPin size={13} /> {item.location}
                    </div>
                  </div>
                </div>

                <div className="edu-status-row">
                  <div className="edu-timeline-pill">
                    <Calendar size={13} /> {item.timeline}
                  </div>
                  <div className="edu-status-chip">
                    <span className="status-live-dot" />
                    <span>{item.statusTag}</span>
                  </div>
                </div>

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
      )}
    </div>
  );
};
