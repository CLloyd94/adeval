import { getScoreColor } from '../utils';
import ScoreBar from './ScoreBar';

const ICONS = {
  visual_hierarchy: '◧',
  cta_clarity: '◉',
  text_legibility: 'Aa',
  brand_consistency: '◈',
  thumb_stop: '⊘',
  information_density: '▦',
};

const NAMES = {
  visual_hierarchy: 'Visual Hierarchy',
  cta_clarity: 'CTA Clarity',
  text_legibility: 'Text Legibility',
  brand_consistency: 'Brand Consistency',
  thumb_stop: 'Thumb Stop',
  information_density: 'Information Density',
};

export default function DimensionCard({ dimension, score, assessment, index }) {
  const color = getScoreColor(score);

  return (
    <div
      className="dimension-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="dimension-header">
        <div className="dimension-name">
          <span className="dimension-icon">{ICONS[dimension]}</span>
          <span className="dimension-label">{NAMES[dimension]}</span>
        </div>
        <span className="dimension-score" style={{ color }}>{score}</span>
      </div>
      <ScoreBar score={score} />
      <p className="dimension-assessment">{assessment}</p>
    </div>
  );
}
