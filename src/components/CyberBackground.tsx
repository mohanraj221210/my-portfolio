import React, { useEffect, useRef } from 'react';

export const CyberBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initSpaceObjects();
    };

    window.addEventListener('resize', handleResize);

    // 1. STARFIELD OBJECTS (Twinkling space stars)
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      phase: number;
      color: string;
      hasFlare: boolean;
    }

    const starColors = ['#ffffff', '#e0f2fe', '#bae6fd', '#ddd6fe', '#38bdf8', '#a855f7'];
    let stars: Star[] = [];

    // 2. SHOOTING STARS / COMETS
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    let shootingStars: ShootingStar[] = [];

    // 3. CONSTELLATION / CYBER NODES
    interface SpaceNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      pulse: number;
    }

    let spaceNodes: SpaceNode[] = [];

    // 4. FLOATING MATRIX CODE STREAMS
    const codeSnippets = [
      'const dev = "MOHAN RAJ";',
      'await space.connect();',
      '01001100 01000101',
      'function orbit() { return 200; }',
      'IEEE.lead({ role: "Chair" });',
      'React.useState(nebulaSystem);',
      'Python.ai.predict(cosmicData);',
      'REST_API.get("/v1/space");',
      'Flutter.build(cosmicApp);',
      'MongoDB.aggregate(stars);',
    ];

    interface CodeStream {
      x: number;
      y: number;
      speed: number;
      text: string;
      opacity: number;
    }

    let streams: CodeStream[] = [];

    // Initialize all space objects
    const initSpaceObjects = () => {
      // Create ~180 space stars
      stars = [];
      const starCount = Math.floor((width * height) / 4500);
      for (let i = 0; i < starCount; i++) {
        const size = Math.random() < 0.85 ? Math.random() * 1.2 + 0.5 : Math.random() * 2.2 + 1.2;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha: Math.random() * 0.55 + 0.25,
          alpha: 0.5,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          phase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          hasFlare: size > 2.2 && Math.random() > 0.4,
        });
      }

      // Create shooting stars
      shootingStars = [];
      for (let i = 0; i < 2; i++) {
        shootingStars.push(createShootingStar());
      }

      // Create interactive space constellation nodes
      spaceNodes = [];
      const nodeCount = Math.min(Math.floor(width / 24), 55);
      const nodeColors = ['#00E5FF', '#a855f7', '#38bdf8', '#818cf8'];

      for (let i = 0; i < nodeCount; i++) {
        spaceNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.8 + 1,
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
          pulse: Math.random() * Math.PI * 2,
        });
      }

      // Create ambient code streams
      streams = [];
      const streamCount = 6;
      for (let i = 0; i < streamCount; i++) {
        const isLeft = i < streamCount / 2;
        streams.push({
          x: isLeft ? Math.random() * (width * 0.16) + 20 : width - (Math.random() * (width * 0.16) + 20),
          y: Math.random() * height,
          speed: Math.random() * 0.5 + 0.25,
          text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
          opacity: Math.random() * 0.12 + 0.04,
        });
      }
    };

    function createShootingStar(): ShootingStar {
      return {
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 6 + 7,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg diagonal
        opacity: Math.random() * 0.7 + 0.3,
        active: false,
      };
    }

    initSpaceObjects();

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Shooting star trigger timer
    let lastShootingStarTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // -------------------------------------------------------------
      // 1. NEBULA COSMIC CLOUDS (Slow floating radial gradient space glows)
      // -------------------------------------------------------------
      const time = Date.now() * 0.0004;

      // Cyan space nebula (top right)
      const g1X = width * 0.75 + Math.sin(time) * 40;
      const g1Y = height * 0.25 + Math.cos(time * 0.8) * 40;
      const g1 = ctx.createRadialGradient(g1X, g1Y, 0, g1X, g1Y, width * 0.45);
      g1.addColorStop(0, 'rgba(0, 229, 255, 0.065)');
      g1.addColorStop(0.5, 'rgba(14, 116, 144, 0.03)');
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Purple space nebula (bottom left)
      const g2X = width * 0.2 + Math.cos(time * 0.7) * 50;
      const g2Y = height * 0.7 + Math.sin(time * 0.9) * 50;
      const g2 = ctx.createRadialGradient(g2X, g2Y, 0, g2X, g2Y, width * 0.5);
      g2.addColorStop(0, 'rgba(168, 85, 247, 0.055)');
      g2.addColorStop(0.5, 'rgba(88, 28, 135, 0.025)');
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // -------------------------------------------------------------
      // 2. DRAW TWINKLING STARS
      // -------------------------------------------------------------
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.phase += star.twinkleSpeed;
        star.alpha = star.baseAlpha + Math.sin(star.phase) * 0.35;
        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();

        // Lens flare sparkle for larger stars
        if (star.hasFlare && currentAlpha > 0.55) {
          ctx.beginPath();
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = (currentAlpha - 0.5) * 0.6;
          const flareLen = star.size * 3.5;
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.stroke();
        }
      }

      // -------------------------------------------------------------
      // 3. SHOOTING STARS / COMETS
      // -------------------------------------------------------------
      const now = Date.now();
      if (now - lastShootingStarTime > 4000) {
        lastShootingStarTime = now;
        const inactiveStar = shootingStars.find((s) => !s.active);
        if (inactiveStar) {
          Object.assign(inactiveStar, createShootingStar());
          inactiveStar.active = true;
        }
      }

      for (let i = 0; i < shootingStars.length; i++) {
        const s = shootingStars[i];
        if (!s.active) continue;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.008;

        if (s.opacity <= 0 || s.x > width || s.y > height) {
          s.active = false;
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const cometGrad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        cometGrad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
        cometGrad.addColorStop(0.3, `rgba(0, 229, 255, ${s.opacity * 0.7})`);
        cometGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = cometGrad;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = 1;
        ctx.stroke();

        // Comet Head Glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00E5FF';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // -------------------------------------------------------------
      // 4. FLOATING MATRIX CODE STREAMS
      // -------------------------------------------------------------
      ctx.font = '10px "JetBrains Mono", monospace';
      streams.forEach((stream) => {
        ctx.fillStyle = `rgba(0, 229, 255, ${stream.opacity})`;
        ctx.fillText(stream.text, stream.x, stream.y);
        stream.y += stream.speed;
        if (stream.y > height + 20) {
          stream.y = -20;
          stream.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
      });

      // -------------------------------------------------------------
      // 5. INTERACTIVE CONSTELLATION NODES & VECTOR LINES
      // -------------------------------------------------------------
      for (let i = 0; i < spaceNodes.length; i++) {
        const p = spaceNodes[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.035;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse Proximity Reaction
        const dxMouse = mouseX - p.x;
        const dyMouse = mouseY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          const angle = Math.atan2(dyMouse, dxMouse);
          p.x -= Math.cos(angle) * 0.45;
          p.y -= Math.sin(angle) * 0.45;
        }

        // Draw node
        const currentSize = p.size + Math.sin(p.pulse) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, currentSize), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes with vector lines
        for (let j = i + 1; j < spaceNodes.length; j++) {
          const p2 = spaceNodes[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00E5FF';
            ctx.globalAlpha = (1 - dist / 115) * 0.14;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.92,
      }}
    />
  );
};
