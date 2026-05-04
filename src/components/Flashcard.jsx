import { useState } from 'react'

export default function Flashcard({ word, translation, currentIndex, totalCards }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div className="my-8 animate-slideUp">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-white font-semibold text-base min-w-fit text-right">
          {currentIndex + 1} / {totalCards}
        </span>
        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-accent to-yellow-500 transition-all duration-500 shadow-lg"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="perspective flex justify-center mb-8">
        <div
          className={`w-full max-w-2xl h-80 cursor-pointer relative transform transition-transform duration-600 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
          style={{
            perspective: '1000px',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}
        >
          <div
            className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl shadow-3xl flex flex-col items-center justify-center p-8 text-white"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">English</div>
            <p className="text-5xl font-bold text-center break-words leading-tight">{word}</p>
            <div className="absolute bottom-6 text-xs opacity-70 font-medium tracking-wider animate-pulse">Click to flip</div>
          </div>
          <div
            className="absolute w-full h-full bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl shadow-3xl flex flex-col items-center justify-center p-8 text-white"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Translation</div>
            <p className="text-5xl font-bold text-center break-words leading-tight">{translation}</p>
            <div className="absolute bottom-6 text-xs opacity-70 font-medium tracking-wider animate-pulse">Click to flip</div>
          </div>
        </div>
      </div>
    </div>
  )
}
