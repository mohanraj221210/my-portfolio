import React, { useState } from 'react';

export interface SkillItem {
  name: string;
  level: number;
  badge: string;
}

export interface SkillCategoryData {
  title: string;
  stoneName: string;
  icon: React.ElementType;
  color: string;
  themeClass: string;
  skills: SkillItem[];
}

interface PowerStoneCardProps {
  category: SkillCategoryData;
}

export const PowerStoneCard: React.FC<PowerStoneCardProps> = ({ category }) => {
  const [hovered, setHovered] = useState(false);
  const IconComp = category.icon;

  return (
    <div
      className={`power-stone-card ${category.themeClass} ${hovered ? 'is-active' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? category.color : undefined,
        boxShadow: hovered ? `0 20px 45px rgba(0,0,0,0.5), 0 0 35px ${category.color}44` : undefined,
      }}
    >
      {/* Background Hologram Gem Grid */}
      <div className="stone-ambient-bg" style={{ background: `radial-gradient(circle at 80% 20%, ${category.color}15, transparent 65%)` }} />

      {/* Power Stone Gem Header */}
      <div className="stone-card-header">
        <div className="power-gem-container">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="gem-svg-anim">
            {/* Outer Orbiting Aura Ring */}
            <circle cx="22" cy="22" r="19" stroke={category.color} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            
            {/* Faceted 3D Power Crystal Diamond */}
            <polygon points="22,4 34,14 22,40 10,14" fill={`${category.color}22`} stroke={category.color} strokeWidth="1.8" />
            <polygon points="22,4 34,14 22,18 10,14" fill={`${category.color}44`} stroke={category.color} strokeWidth="1" />
            <line x1="22" y1="18" x2="22" y2="40" stroke={category.color} strokeWidth="1.5" />
            <line x1="10" y1="14" x2="22" y2="18" stroke={category.color} strokeWidth="1" />
            <line x1="34" y1="14" x2="22" y2="18" stroke={category.color} strokeWidth="1" />
          </svg>

          <div className="gem-center-icon">
            <IconComp size={18} color={category.color} />
          </div>
        </div>

        <div className="stone-header-meta">
          <div className="stone-classification" style={{ color: category.color }}>
            {category.stoneName}
          </div>
          <h3 className="stone-domain-title">{category.title}</h3>
        </div>
      </div>

      {/* Skills Power Meter List */}
      <div className="stone-skills-list">
        {category.skills.map((skill) => (
          <div key={skill.name} className="skill-meter-row">
            <div className="skill-meter-header">
              <span className="skill-item-name">{skill.name}</span>
              <div className="skill-badge-group">
                <span className="skill-level-badge" style={{ color: category.color, borderColor: `${category.color}44`, background: `${category.color}10` }}>
                  {skill.badge}
                </span>
                <span className="skill-percent-num">{skill.level}%</span>
              </div>
            </div>

            {/* Power Charge Bar */}
            <div className="power-bar-track">
              <div
                className="power-bar-fill"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${category.color}88, ${category.color})`,
                  boxShadow: `0 0 12px ${category.color}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
