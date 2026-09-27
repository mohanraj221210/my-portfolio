import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight, Zap, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [sceneStage, setSceneStage] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [typedText, setTypedText] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [autoTimerText, setAutoTimerText] = useState<string>('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);

  // Web Audio Context Synthesizer for futuristic sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playSynthSound = (type: 'boot' | 'chime' | 'hover' | 'warp') => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      if (type === 'boot') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'chime') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc2.frequency.setValueAtTime(659.25, now + 0.08); // E5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now + 0.08);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
      } else if (type === 'hover') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'warp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(1600, now + 0.6);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio playback fails silently if restricted
    }
  };

  // Parallax mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Story sequence state transitions
  useEffect(() => {
    // Stage 0: System Init typing
    const initMessage = 'SYSTEM INITIALIZING... DIGITAL ENVIRONMENT ONLINE';
    let charIdx = 0;
    const typeInterval = setInterval(() => {
      setTypedText(initMessage.slice(0, charIdx));
      charIdx++;
      if (charIdx > initMessage.length) {
        clearInterval(typeInterval);
      }
    }, 28);

    playSynthSound('boot');

    // Sequence timelines (~5s total story arc)
    const t1 = setTimeout(() => {
      setSceneStage(1); // 3D Character Focus
    }, 600);

    const t2 = setTimeout(() => {
      setSceneStage(2); // Character looks at user & says Hi
      playSynthSound('chime');
    }, 1600);

    const t3 = setTimeout(() => {
      setSceneStage(3); // Sequential intro tags
    }, 2800);

    const t4 = setTimeout(() => {
      setSceneStage(4); // Interactive "ENTER PORTFOLIO" button ready
    }, 3800);

    return () => {
      clearInterval(typeInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  // Auto-advance timer when interactive stage is active
  useEffect(() => {
    if (sceneStage === 4 && !isTransitioning) {
      const timer = setTimeout(() => {
        setAutoTimerText('Entering portfolio...');
        triggerPortfolioTransition();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [sceneStage, isTransitioning]);

  const triggerPortfolioTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    playSynthSound('warp');
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <div className={`cinematic-intro-overlay ${isTransitioning ? 'transition-warp' : ''}`}>
      {/* Top Bar Controls */}
      <div className="intro-top-bar container">
        <button
          className="intro-control-btn sound-btn"
          onClick={() => setSoundEnabled(!soundEnabled)}
          title="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{soundEnabled ? 'SOUND ON' : 'MUTED'}</span>
        </button>

        <button className="intro-control-btn skip-btn" onClick={triggerPortfolioTransition}>
          <span>SKIP INTRO</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Background Cyber Workspace Atmosphere */}
      <div className="intro-bg-ambient">
        <div className="intro-grid-mesh" />
        <div className="intro-cyan-glow-orb" />
        <div className="intro-violet-glow-orb" />
      </div>

      {/* Main Story Container */}
      <div className="intro-story-container container">
        {/* Left Col: Holographic System Terminal & Speech Dialogue */}
        <div className="intro-copy-col">
          {/* Stage 0 Init Tag */}
          <div className="intro-system-tag">
            <span className="pulse-cyan-dot" />
            <span className="mono-code">{typedText}</span>
          </div>

          {/* Dialogue & Greeting (Stage 2+) */}
          {sceneStage >= 2 && (
            <div className="intro-dialogue-box">
              <div className="speech-bubble-hologram">
                <span className="wave-hand">👋</span>
                <span className="speech-text">Hi! I&apos;m Mohan Raj.</span>
              </div>

              <h1 className="intro-hero-name">
                MOHAN<br />RAJ
              </h1>

              <div className="intro-role-chip">
                <Code2 size={16} color="#00E5FF" />
                <span>FULL STACK DEVELOPER</span>
              </div>

              <p className="intro-subtitle">
                Welcome to my digital world.
              </p>

              {/* Sequential Skill Tags (Stage 3+) */}
              {sceneStage >= 3 && (
                <div className="intro-tags-waterfall">
                  <span className="intro-tag-pill tag-delay-1"><Zap size={13} /> FULL STACK</span>
                  <span className="intro-tag-pill tag-delay-2"><Cpu size={13} /> AI / ML</span>
                  <span className="intro-tag-pill tag-delay-3"><Terminal size={13} /> BACKEND</span>
                  <span className="intro-tag-pill tag-delay-4"><Sparkles size={13} /> IEEE LEADER</span>
                </div>
              )}
            </div>
          )}

          {/* Interactive Button CTA (Stage 4+) */}
          {sceneStage >= 4 && (
            <div className="intro-cta-wrap">
              {autoTimerText && <div className="auto-timer-sub">{autoTimerText}</div>}
              <button
                className={`cyber-enter-btn ${buttonHovered ? 'hovered' : ''}`}
                onMouseEnter={() => {
                  setButtonHovered(true);
                  playSynthSound('hover');
                }}
                onMouseLeave={() => setButtonHovered(false)}
                onClick={triggerPortfolioTransition}
                style={{
                  transform: buttonHovered
                    ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0) scale(1.05)`
                    : 'translate3d(0, 0, 0)',
                }}
              >
                <div className="btn-glow-ring" />
                <span>ENTER PORTFOLIO</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Right Col: 3D Anime Developer Avatar Character Scene */}
        <div className="intro-visual-col">
          <div
            className={`intro-avatar-scene ${sceneStage >= 1 ? 'scene-revealed' : ''}`}
            style={{
              transform: `rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg)`,
            }}
          >
            {/* Holographic Workstation Frame */}
            <div className="intro-avatar-frame">
              <img
                src="/developer-avatar.png"
                alt="Mohan Raj - 3D Anime Developer Avatar"
                className="intro-avatar-img"
              />
              <div className="intro-scanline-light" />
              <div className="intro-cyan-rim-reflection" />
            </div>

            {/* Floating Holographic Interface HUD Panels */}
            {sceneStage >= 1 && (
              <>
                <div
                  className="intro-hud-panel panel-top-left"
                  style={{ transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 40px)` }}
                >
                  <div>WORKSTATION // ONLINE</div>
                  <div className="hud-sub-cyan">&gt; 3D ENGINE ACTIVE</div>
                </div>

                <div
                  className="intro-hud-panel panel-bottom-right"
                  style={{ transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 20}px, 50px)` }}
                >
                  <div>SYSTEM STATUS</div>
                  <div className="hud-sub-green">OPTIMAL ● 100%</div>
                </div>
              </>
            )}

            {/* Greeting Wave Pointer Light */}
            {sceneStage >= 2 && (
              <div className="intro-greeting-wave-ring">
                <span className="ping-wave" />
                <span className="wave-label">MOHAN RAJ IS ONLINE</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
