import { getScoreColor, getGrade } from '../utils';
import ScoreRing from './ScoreRing';
import DimensionCard from './DimensionCard';

const DIMENSIONS = [
  'visual_hierarchy',
  'cta_clarity',
  'text_legibility',
  'brand_consistency',
  'thumb_stop',
  'information_density',
];

export default function ResultsPanel({ results }) {
  const grade = getGrade(results.overall_score);
  const gradeColor = getScoreColor(results.overall_score);

  return (
    <div className="results-panel">
      <div className="overall-card">
        <ScoreRing score={results.overall_score} />
        <div className="overall-info">
          <div className="overall-label">Overall Score</div>
          <div className="overall-grade" style={{ color: gradeColor }}>
            Grade {grade}
          </div>
          <p className="overall-summary">{results.summary}</p>
        </div>
      </div>

      <div className="improvement-card">
        <div className="improvement-label">Highest-Impact Improvement</div>
        <p className="improvement-text">{results.top_improvement}</p>
      </div>

      <div className="dimension-grid">
        {DIMENSIONS.map((dim, i) => (
          <DimensionCard
            key={dim}
            dimension={dim}
            score={results[dim].score}
            assessment={results[dim].assessment}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
