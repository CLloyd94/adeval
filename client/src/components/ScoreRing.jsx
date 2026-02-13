import { useEffect, useState } from 'react';
import { getScoreColor } from '../utils';

export default function ScoreRing({ score }) {
  const [offset, setOffset] = useState(327);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOffset(targetOffset));
    return () => cancelAnimationFrame(raf);
  }, [targetOffset]);

  return (
    <svg className="score-ring" width="120" height="120" viewBox="0 0 120 120">
      <circle
        className="score-ring-bg"
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        strokeWidth="8"
      />
      <circle
        className="score-ring-fg"
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
      />
      <text
        className="score-ring-text"
        x="60"
        y="60"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="28"
      >
        {score}
      </text>
    </svg>
  );
}
