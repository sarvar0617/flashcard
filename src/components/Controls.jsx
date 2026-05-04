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
    <div className="space-y-3 animate-slideUp" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="py-2.5 md:py-3 px-3 md:px-4 bg-white/20 hover:bg-white/30 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all border-2 border-white/30 text-sm md:text-base"
          title="Previous card"
        >
          ← Back
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="py-2.5 md:py-3 px-3 md:px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all text-sm md:text-base"
          title="Next card"
        >
          Next →
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        <button
          onClick={onForgotten}
          className="py-2.5 md:py-3 px-2 md:px-3 bg-gradient-to-r from-[#f093fb] to-[#f5576c] hover:shadow-lg text-white font-semibold rounded-lg transition-all text-xs md:text-sm"
          title="Mark as forgotten"
        >
          ❌ Forgot
        </button>

        <button
          onClick={onShuffle}
          className={`py-2.5 md:py-3 px-2 md:px-3 font-semibold rounded-lg transition-all text-xs md:text-sm ${
            isShuffled
              ? 'bg-white text-[#667eea] shadow-md'
              : 'bg-white/20 hover:bg-white/30 text-white border-2 border-white/30'
          }`}
          title={isShuffled ? 'Shuffle is on' : 'Turn on shuffle'}
        >
          🔀 {isShuffled ? 'On' : 'Off'}
        </button>

        <button
          onClick={onRestart}
          className="py-2.5 md:py-3 px-2 md:px-3 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all text-xs md:text-sm border-2 border-white/30"
          title="Restart"
        >
          ⟲ Reset
        </button>
      </div>
    </div>
  )
}
