export default function ImagePreview({ src, onEvaluate, onReset, loading, hasResults }) {
  return (
    <div className="image-preview">
      <img src={src} alt="Ad creative preview" />
      <div className="image-actions">
        <button
          className="btn-primary"
          onClick={onEvaluate}
          disabled={loading}
        >
          {loading ? 'Evaluating…' : hasResults ? 'Re-evaluate' : 'Run Eval'}
        </button>
        <button className="btn-ghost" onClick={onReset}>
          New
        </button>
      </div>
    </div>
  );
}
