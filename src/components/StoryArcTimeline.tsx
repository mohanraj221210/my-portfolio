import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Terminal,
  Flame,
  Rocket,
  Heart,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export interface StoryChapter {
  id: string;
  year: string;
  title: string;
  headline: string;
  motto: string;
  content: string;
  icon: React.ElementType;
  accentColor: string;
  glowColor: string;
  bgGradient: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'ch-2023',
    year: '2023',
    title: 'THE BEGINNING',
    headline: 'A student with a dream.',
    motto: 'Started → Explored → Learned',
    content:
      "I entered college with a simple dream — to become someone capable of creating something meaningful. I didn't know exactly where this journey would take me. I was just a student with curiosity, learning new things, exploring technology, and trying to find my place.",
    icon: Sparkles,
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
    bgGradient: 'linear-gradient(135deg, rgba(0, 229, 255, 0.08) 0%, rgba(2, 8, 16, 0.95) 100%)',
  },
  {
    id: 'ch-2024',
    year: '2024',
    title: 'THE STRUGGLE',
    headline: 'Mistakes became lessons. Failures became fuel.',
    motto: 'Learn → Fail → Fix → Repeat',
    content:
      'The journey was not always easy. Coding brought mistakes, projects brought problems, and every new skill demanded patience. There were moments of confusion and failure, but I kept going. Slowly, I understood that progress doesn\'t happen overnight — it is built through consistency, patience, and countless attempts.',
    icon: Terminal,
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    bgGradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(2, 8, 16, 0.95) 100%)',
  },
  {
    id: 'ch-2025',
    year: '2025',
    title: 'THE TRANSFORMATION',
    headline: 'Stopped only learning. Started building.',
    motto: 'Dream → Discipline → Action',
    content:
      'Something started changing. I was no longer satisfied with simply learning from a classroom. I wanted to build, experiment, and experience real challenges. I explored AI/ML, development, design, projects, and IEEE activities. Every opportunity pushed me a little further and every challenge made me stronger.',
    icon: Flame,
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(2, 8, 16, 0.95) 100%)',
  },
  {
    id: 'ch-2026',
    year: '2026',
    title: 'THE BREAKTHROUGH',
    headline: 'From participant → organizer → leader. From student → developer.',
    motto: 'Build • Lead • Deliver',
    content:
      'The student who once looked for opportunities started creating them. I worked on real-world projects, contributed to technology solutions, took responsibilities, organized events, and stepped into leadership. From learning code to building products, from attending events to organizing them, from being a participant to becoming a leader — the transformation was gradual, but real.',
    icon: Rocket,
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(2, 8, 16, 0.95) 100%)',
  },
  {
    id: 'ch-real-story',
    year: 'HEART',
    title: 'THE REAL STORY',
    headline: 'Behind every certificate is effort. Behind every project is failure.',
    motto: 'I Refused To Stop',
    content:
      'Behind every achievement were hours nobody saw — debugging when nothing worked, preparing when everyone else was resting, starting again after failure, and choosing to continue even when the path wasn\'t clear. The certificates show the result, but they don\'t show the struggle behind them.',
    icon: Heart,
    accentColor: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    bgGradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(2, 8, 16, 0.95) 100%)',
  },
  {
    id: 'ch-2027',
    year: '2027',
    title: 'THE NEXT CHAPTER',
    headline: 'Not the end. Just a bigger beginning.',
    motto: 'Learn More • Build Better • Lead Stronger • Create Impact',
    content:
      "2027 is not the destination. It's the next chapter. I started with a dream. I continued with determination. I grew through challenges. And now, I'm ready to build something bigger. This is not just my career journey. This is the story of becoming the person I once dreamed of being.",
    icon: Compass,
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.45)',
    bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(2, 8, 16, 0.95) 100%)',
  },
];

export const StoryArcTimeline: React.FC = () => {
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const activeChapter = STORY_CHAPTERS[activeChapterIdx];
  const IconActive = activeChapter.icon;

  return (
    <div className="story-arc-wrapper">
      {/* Upper Path Node Navigation Beam */}
      <div className="story-path-nav-bar">
        <div className="story-path-beam-line">
          <motion.div
            className="story-path-progress-fill"
            animate={{ width: `${(activeChapterIdx / (STORY_CHAPTERS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Stepper Node Buttons */}
        <div className="story-path-nodes">
          {STORY_CHAPTERS.map((ch, idx) => {
            const ChIcon = ch.icon;
            const isSelected = activeChapterIdx === idx;

            return (
              <button
                key={ch.id}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveChapterIdx(idx);
                }}
                className={`story-node-btn ${isSelected ? 'selected' : ''}`}
                style={{ '--accent': ch.accentColor } as React.CSSProperties}
              >
                <div className="node-icon-circle">
                  <ChIcon size={15} color={isSelected ? '#000' : ch.accentColor} />
                </div>
                <span className="node-year-label">{ch.year}</span>
                <span className="node-title-label">{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Selected Story Chapter Display Stage */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeChapter.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="featured-story-stage-card"
          style={
            {
              '--accent': activeChapter.accentColor,
              '--glow': activeChapter.glowColor,
              background: activeChapter.bgGradient,
            } as React.CSSProperties
          }
        >
          {/* Top Holographic Header Bar */}
          <div className="story-stage-header">
            <div className="story-chapter-badge">
              <span className="chapter-num">{activeChapter.year}</span>
              <span className="chapter-name">{activeChapter.title}</span>
            </div>

            <div className="story-motto-pill">
              <Sparkles size={13} color={activeChapter.accentColor} />
              <span>{activeChapter.motto}</span>
            </div>
          </div>

          {/* Main Story Headline & Emotional Narrative */}
          <div className="story-stage-body">
            <h3 className="story-stage-headline">{activeChapter.headline}</h3>
            <p className="story-stage-prose">{activeChapter.content}</p>
          </div>

          {/* Bottom Interactive Navigation Stepper */}
          <div className="story-stage-footer">
            <div className="story-progress-indicator">
              CHAPTER {activeChapterIdx + 1} OF {STORY_CHAPTERS.length}
            </div>

            <div className="story-nav-buttons">
              <button
                className="cyber-button ghost"
                style={{ padding: '8px 14px', fontSize: '11px' }}
                disabled={activeChapterIdx === 0}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveChapterIdx((prev) => Math.max(0, prev - 1));
                }}
              >
                PREVIOUS
              </button>
              <button
                className="cyber-button primary"
                style={{
                  padding: '8px 16px',
                  fontSize: '11px',
                  background: activeChapter.accentColor,
                  borderColor: activeChapter.accentColor,
                  color: '#000',
                }}
                disabled={activeChapterIdx === STORY_CHAPTERS.length - 1}
                onMouseEnter={() => soundEngine.playHover()}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveChapterIdx((prev) => Math.min(STORY_CHAPTERS.length - 1, prev + 1));
                }}
              >
                NEXT CHAPTER <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Concluding Real Story Quote Banner */}
      <div className="story-manifesto-banner">
        <div className="manifesto-glowing-ring" />
        <div className="manifesto-content">
          <Rocket size={28} color="#00E5FF" className="manifesto-rocket-anim" />
          <h3 className="manifesto-title">THIS ISN&apos;T JUST MY RESUME. THIS IS MY JOURNEY.</h3>
          <p className="manifesto-text">
            &ldquo;Started with a dream. Built with hard work. Driven by purpose.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
