import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight, Zap, Sparkles, Globe, Cpu } from 'lucide-react';

interface CosmicIntroProps {
  onComplete: () => void;
}

export const CosmicIntroExperience: React.FC<CosmicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [typedStatus, setTypedStatus] = useState<string>('');
  const [isWarping, setIsWarping] = useState<boolean>(false);
  const [autoTimerNotice, setAutoTimerNotice] = useState<string>('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [btnHovered, setBtnHovered] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Context Synthesizer for Space & Impact Sounds
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

  const playSpaceSound = (type: 'meteor' | 'impact' | 'chime' | 'warp') => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'meteor') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 1.2);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.4);
      } else if (type === 'impact') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.8);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.0);
      } else if (type === 'chime') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc2.frequency.setValueAtTime(880, now + 0.1); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now + 0.1);
        osc1.stop(now + 0.7);
        osc2.stop(now + 0.7);
      } else if (type === 'warp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.6);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio fails silently if blocked
    }
  };

  // Space Canvas Animation (Meteor approaching Earth & Impact explosion)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Stars background
    const stars: { x: number; y: number; z: number; size: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.8 + 0.5,
      });
    }

    // Meteor state
    let meteorProgress = 0; // 0 to 1
    let shockwaveRadius = 0;

    const renderCanvas = () => {
      ctx.fillStyle = '#040F1D';
      ctx.fillRect(0, 0, width, height);

      // Draw moving space stars
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= isWarping ? 18 : 0.8;
        if (star.z <= 0) star.z = width;

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, star.size * k * 0.4);
          ctx.fillStyle = isWarping ? '#00E5FF' : '#ffffff';
          ctx.shadowBlur = isWarping ? 12 : 4;
          ctx.shadowColor = '#00E5FF';
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0;

      // Draw Earth position (Right-center)
      const earthX = width * 0.72;
      const earthY = height * 0.5;
      const earthRadius = Math.min(width, height) * 0.22;

      // Phase 0: Burning Cosmic Meteor flying towards Earth
      if (meteorProgress < 1) {
        meteorProgress += 0.016;

        // Meteor position from top-left space to Earth center
        const startX = width * -0.1;
        const startY = height * -0.1;
        const mx = startX + (earthX - startX) * meteorProgress;
        const my = startY + (earthY - startY) * meteorProgress;

        // Meteor fire tail
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx - (earthX - startX) * 0.18, my - (earthY - startY) * 0.18);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.8)';
        ctx.lineWidth = 14 * (1 - meteorProgress * 0.5);
        ctx.lineCap = 'round';
        ctx.shadowBlur = 25;
        ctx.shadowColor = '#00E5FF';
        ctx.stroke();

        // Meteor Glowing Core Stone
        ctx.beginPath();
        ctx.arc(mx, my, 12, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // Phase 1+: Impact Shockwave expansion
      if (meteorProgress >= 1 && shockwaveRadius < earthRadius * 2.5) {
        shockwaveRadius += 6;
        ctx.beginPath();
        ctx.arc(earthX, earthY, shockwaveRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 229, 255, ${Math.max(0, 1 - shockwaveRadius / (earthRadius * 2.5))})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00E5FF';
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isWarping]);

  // Story Progression Timelines
  useEffect(() => {
    // Status text typing
    const textMsg = 'COSMIC INNOVATION STONE APPROACHING DIGITAL EARTH...';
    let idx = 0;
    const interval = setInterval(() => {
      setTypedStatus(textMsg.slice(0, idx));
      idx++;
      if (idx > textMsg.length) clearInterval(interval);
    }, 24);

    playSpaceSound('meteor');

    // Phase 1: Meteor Impact on Earth
    const t1 = setTimeout(() => {
      setPhase(1);
      setTypedStatus('COSMIC IMPACT DETECTED // DIGITAL UNIVERSE ONLINE');
      playSpaceSound('impact');
    }, 1800);

    // Phase 2: Welcoming 3D Developer Reveal
    const t2 = setTimeout(() => {
      setPhase(2);
      playSpaceSound('chime');
    }, 3200);

    // Phase 3: Interactive CTA Ready
    const t3 = setTimeout(() => {
      setPhase(3);
    }, 4400);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Mouse Parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Auto-advance timer after 3.5s of Phase 3
  useEffect(() => {
    if (phase === 3 && !isWarping) {
      const timer = setTimeout(() => {
        setAutoTimerNotice('Entering digital universe...');
        startHyperdriveWarp();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [phase, isWarping]);

  const startHyperdriveWarp = () => {
    if (isWarping) return;
    setIsWarping(true);
    playSpaceSound('warp');
    setTimeout(() => {
      onComplete();
    }, 750);
  };

  return (
    <div className={`cosmic-intro-wrapper ${isWarping ? 'hyperdrive-warp' : ''}`}>
      {/* Dynamic Starfield & Impact Canvas */}
      <canvas ref={canvasRef} className="cosmic-canvas-bg" />

      {/* Top Bar Controls */}
      <div className="cosmic-top-bar container">
        <button
          className="cosmic-pill-btn sound-toggle"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          <span>{soundEnabled ? 'SOUND ON' : 'MUTED'}</span>
        </button>

        <button className="cosmic-pill-btn skip-toggle" onClick={startHyperdriveWarp}>
          <span>SKIP INTRO</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Central Story Layout */}
      <div className="cosmic-story-grid container">
        {/* Left Column: System Status & Welcoming Dialogue */}
        <div className="cosmic-left-col">
          {/* Phase 0 & 1 Monospace Signal Badge */}
          <div className="cosmic-signal-badge">
            <span className="cosmic-pulse-dot" />
            <span className="cosmic-mono-text">{typedStatus}</span>
          </div>

          {/* Phase 2+: Welcoming Dialogue & Developer Title */}
          {phase >= 2 && (
            <div className="cosmic-dialogue-card">
              <div className="welcoming-speech-bubble">
                <span className="wave-emoji">👋</span>
                <span className="welcoming-text">WELCOME TO MY DIGITAL UNIVERSE!</span>
              </div>

              <h1 className="cosmic-hero-title">
                MOHAN<br />RAJ
              </h1>

              <div className="cosmic-role-badge">
                <Globe size={16} color="#00E5FF" />
                <span>FULL STACK &amp; AI DEVELOPER</span>
              </div>

              <p className="cosmic-lead-p">
                Building scalable web applications, intelligent systems and revolutionary digital experiences.
              </p>

              {/* Phase 3: Sequential Skill Badges */}
              {phase >= 3 && (
                <div className="cosmic-skills-waterfall">
                  <span className="cosmic-skill-tag tag-1"><Zap size={13} /> FULL STACK INNOVATOR</span>
                  <span className="cosmic-skill-tag tag-2"><Cpu size={13} /> AI / ML ARCHITECT</span>
                  <span className="cosmic-skill-tag tag-3"><Sparkles size={13} /> IEEE CHAIRMAN</span>
                </div>
              )}

              {/* Phase 3: Interactive CTA Button */}
              {phase >= 3 && (
                <div className="cosmic-cta-box">
                  {autoTimerNotice && <div className="auto-notice">{autoTimerNotice}</div>}
                  <button
                    className={`cosmic-universe-btn ${btnHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setBtnHovered(true)}
                    onMouseLeave={() => setBtnHovered(false)}
                    onClick={startHyperdriveWarp}
                    style={{
                      transform: btnHovered
                        ? `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0) scale(1.05)`
                        : 'translate3d(0,0,0)',
                    }}
                  >
                    <span className="btn-aura-layer" />
                    <span>EXPLORE THE UNIVERSE</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Welcoming 3D Developer Avatar Character Frame */}
        <div className="cosmic-right-col">
          <div
            className={`welcoming-avatar-scene ${phase >= 2 ? 'avatar-revealed' : ''}`}
            style={{
              transform: `rotateY(${mousePos.x * 16}deg) rotateX(${-mousePos.y * 16}deg)`,
            }}
          >
            <div className="welcoming-avatar-card">
              <img
                src="/welcoming-developer-avatar.png"
                alt="Mohan Raj - Welcoming 3D Developer Avatar"
                className="welcoming-avatar-img"
              />
              <div className="welcoming-scanline" />
              <div className="welcoming-cyan-aura" />
            </div>

            {/* Earth Hologram HUD Badge */}
            {phase >= 2 && (
              <div className="cosmic-hud-badge">
                <Globe size={14} color="#00E5FF" />
                <span>DIGITAL EARTH // ONLINE</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
