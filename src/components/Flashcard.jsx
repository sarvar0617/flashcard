import { useState } from 'react'

export default function Flashcard({ word, translation, currentIndex, totalCards }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="space-y-4 animate-slideUp">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80 font-medium">{currentIndex + 1} / {totalCards}</span>
          <span className="text-white/60 text-xs">{Math.round(((currentIndex + 1) / totalCards) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div
        className="relative w-full aspect-square md:aspect-auto md:h-96 cursor-pointer rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
        onClick={handleFlip}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#667eea] to-[#764ba2] flex flex-col items-center justify-center p-6 md:p-8 text-white"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="text-xs md:text-sm font-semibold uppercase tracking-widest opacity-70 mb-4">
              {word.length > 20 ? 'Term' : 'English'}
            </div>
            <p className="text-3xl md:text-5xl font-bold text-center break-words line-clamp-5">
              {word}
            </p>
            <div className="absolute bottom-4 md:bottom-6 text-xs md:text-sm opacity-60 font-medium text-center">
              Tap to reveal ↻
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#f093fb] to-[#f5576c] flex flex-col items-center justify-center p-6 md:p-8 text-white"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-xs md:text-sm font-semibold uppercase tracking-widest opacity-70 mb-4">
              Answer
            </div>
            <p className="text-3xl md:text-5xl font-bold text-center break-words line-clamp-5">
              {translation}
            </p>
            <div className="absolute bottom-4 md:bottom-6 text-xs md:text-sm opacity-60 font-medium text-center">
              Tap to flip back ↻
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
