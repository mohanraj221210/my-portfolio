import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle2, Copy, Radio, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const ContactSignalTerminal: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('m.mohanraj2212@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      className="contact-terminal-v2"
    >
      {/* Corner Brackets */}
      <span className="cyber-bracket bracket-tl" />
      <span className="cyber-bracket bracket-tr" />
      <span className="cyber-bracket bracket-bl" />
      <span className="cyber-bracket bracket-br" />

      {/* SVG Background Animated Connection Circuit Lines */}
      <svg className="contact-circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glowLine">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Vector Connection Lines linking left channels to right form transmitter */}
        <path d="M 80 260 C 250 260, 250 180, 500 180" stroke="url(#lineGradCyan)" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#glowLine)" />
        <path d="M 80 320 C 280 320, 280 280, 500 280" stroke="url(#lineGradCyan)" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#glowLine)" />
        <path d="M 80 380 C 250 380, 300 420, 500 420" stroke="url(#lineGradCyan)" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#glowLine)" />

        {/* Dynamic Highlight Line on Hover */}
        {activeChannel === 'email' && (
          <path d="M 80 260 C 250 260, 250 180, 500 180" stroke="#00E5FF" strokeWidth="2.5" fill="none" filter="url(#glowLine)" />
        )}
        {activeChannel === 'github' && (
          <path d="M 80 320 C 280 320, 280 280, 500 280" stroke="#a855f7" strokeWidth="2.5" fill="none" filter="url(#glowLine)" />
        )}
        {activeChannel === 'linkedin' && (
          <path d="M 80 380 C 250 380, 300 420, 500 420" stroke="#38bdf8" strokeWidth="2.5" fill="none" filter="url(#glowLine)" />
        )}
      </svg>

      {/* Main Split Grid */}
      <div className="contact-grid-wrap">
        {/* Left Column: Direct Channels & Signal Hub */}
        <div className="contact-left-col">
          <div className="section-label-chip">
            <Radio size={14} /> OPEN CHANNEL // SPACE SIGNAL
          </div>
          <h2 className="contact-heading-text">LET’S BUILD SOMETHING EXTRAORDINARY.</h2>
          <p className="contact-subtitle-text">
            Have an ambitious project idea, engineering challenge, or leadership role? Send a signal and let&apos;s build it together.
          </p>

          {/* Interactive Contact Connection Chips */}
          <div className="contact-channels-list">
            <motion.div
              whileHover={{ x: 6, scale: 1.02 }}
              onMouseEnter={() => setActiveChannel('email')}
              onMouseLeave={() => setActiveChannel(null)}
              className={`contact-channel-card ${activeChannel === 'email' ? 'active' : ''}`}
            >
              <div className="contact-channel-icon cyan">
                <Mail size={18} />
              </div>
              <div className="contact-channel-info">
                <span className="contact-channel-label">PRIMARY EMAIL</span>
                <span className="contact-channel-value">m.mohanraj2212@gmail.com</span>
              </div>
              <button className="contact-copy-btn" onClick={handleCopyEmail} title="Copy Email Address">
                {copied ? <CheckCircle2 size={15} color="#10b981" /> : <Copy size={15} />}
              </button>
            </motion.div>

            <motion.a
              href="https://github.com/mohanraj22121"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 6, scale: 1.02 }}
              onMouseEnter={() => setActiveChannel('github')}
              onMouseLeave={() => setActiveChannel(null)}
              className={`contact-channel-card ${activeChannel === 'github' ? 'active' : ''}`}
            >
              <div className="contact-channel-icon purple">
                <Github size={18} />
              </div>
              <div className="contact-channel-info">
                <span className="contact-channel-label">GITHUB REPOSITORIES</span>
                <span className="contact-channel-value">github.com/mohanraj22121</span>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/mohanraj2212"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 6, scale: 1.02 }}
              onMouseEnter={() => setActiveChannel('linkedin')}
              onMouseLeave={() => setActiveChannel(null)}
              className={`contact-channel-card ${activeChannel === 'linkedin' ? 'active' : ''}`}
            >
              <div className="contact-channel-icon blue">
                <Linkedin size={18} />
              </div>
              <div className="contact-channel-info">
                <span className="contact-channel-label">LINKEDIN PROFILE</span>
                <span className="contact-channel-value">linkedin.com/in/mohanraj2212</span>
              </div>
            </motion.a>
          </div>

          {/* System Telemetry Bar */}
          <div className="contact-telemetry-bar">
            <span className="telemetry-item">
              <span className="pulse-dot green" /> SYSTEM ONLINE
            </span>
            <span className="telemetry-item">
              <span className="pulse-dot cyan" /> AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Signal Transmission Form */}
        <div className="contact-right-col">
          <form onSubmit={handleSubmit} className="contact-form-box">
            <div className="form-header">
              <div className="form-header-title">TRANSMIT DIRECT SIGNAL</div>
              <div className="form-signal-meter">
                <span className="meter-bar bar-1" />
                <span className="meter-bar bar-2" />
                <span className="meter-bar bar-3" />
                <span className="meter-bar bar-4" />
              </div>
            </div>

            <div className="form-field-group">
              <label className="form-field-label">YOUR NAME</label>
              <input
                required
                type="text"
                className="contact-terminal-input"
                placeholder="How should I call you?"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label">YOUR EMAIL</label>
              <input
                required
                type="email"
                className="contact-terminal-input"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label">YOUR MESSAGE</label>
              <textarea
                required
                rows={4}
                className="contact-terminal-input textarea"
                placeholder="Tell me about your project, idea, or role..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Interactive Animated Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`contact-submit-btn ${isSent ? 'sent' : ''}`}
            >
              <span className="btn-glow-layer" />
              {isSubmitting ? (
                <>TRANSMITTING SIGNAL...</>
              ) : isSent ? (
                <>SIGNAL DELIVERED <CheckCircle2 size={16} /></>
              ) : (
                <>SEND MESSAGE <Send size={16} /></>
              )}
            </motion.button>
          </form>

          {/* Copy Toast Alert */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="copy-toast-badge"
              >
                <CheckCircle2 size={14} color="#10b981" /> EMAIL COPIED TO CLIPBOARD
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
