import { useEffect, useState } from 'react';
import { getScoreColor } from '../utils';

export default function ScoreBar({ score }) {
  const [width, setWidth] = useState(0);
  const color = getScoreColor(score);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setWidth(score));
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="score-bar-track">
      <div
        className="score-bar-fill"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  );
}
