export default function Controls({
  onNext,
  onForgotten,
  onShuffle,
  onRestart,
  hasNext,
  hasPrevious,
  onPrevious,
  isShuffled
}) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-8 animate-slideUp" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
      <div className="flex gap-4 flex-wrap justify-center w-full">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="btn btn-secondary flex-1 min-w-max"
          title="Go to previous card"
        >
          ← Previous
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="btn btn-primary flex-1 min-w-max"
          title="Go to next card"
        >
          Next →
        </button>
      </div>

      <div className="flex gap-4 flex-wrap justify-center w-full">
        <button
          onClick={onForgotten}
          className="btn btn-warning flex-1 min-w-max"
          title="Mark this word as forgotten"
        >
          ❌ I Forgot
        </button>

        <button
          onClick={onShuffle}
          className={`btn btn-secondary flex-auto ${isShuffled ? 'active' : ''}`}
          title={isShuffled ? 'Shuffle is on' : 'Shuffle the words'}
        >
          🔀 {isShuffled ? 'Shuffle ON' : 'Shuffle OFF'}
        </button>

        <button
          onClick={onRestart}
          className="btn btn-secondary"
          title="Restart from the beginning"
        >
          ⟲ Restart
        </button>
      </div>
    </div>
  )
}
