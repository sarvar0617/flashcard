import { useState, useEffect } from 'react'
import Form from './components/Form'
import Flashcard from './components/Flashcard'
import Controls from './components/Controls'
import ForgottenWords from './components/ForgottenWords'

export default function App() {
  const [words, setWords] = useState([])
  const [forgottenWords, setForgottenWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [shuffledWords, setShuffledWords] = useState([])
  const [activeTab, setActiveTab] = useState('practice') // 'practice' or 'forgotten'

  // Load data from localStorage on mount
  useEffect(() => {
    const savedWords = localStorage.getItem('flashcard_words')
    const savedForgotten = localStorage.getItem('flashcard_forgotten')

    if (savedWords) {
      try {
        setWords(JSON.parse(savedWords))
      } catch (e) {
        console.error('Error loading words:', e)
      }
    }

    if (savedForgotten) {
      try {
        setForgottenWords(JSON.parse(savedForgotten))
      } catch (e) {
        console.error('Error loading forgotten words:', e)
      }
    }
  }, [])

  // Save words to localStorage
  useEffect(() => {
    localStorage.setItem('flashcard_words', JSON.stringify(words))
  }, [words])

  // Save forgotten words to localStorage
  useEffect(() => {
    localStorage.setItem('flashcard_forgotten', JSON.stringify(forgottenWords))
  }, [forgottenWords])

  // Reset index when words change
  useEffect(() => {
    setCurrentIndex(0)
  }, [words.length])

  const handleAddWord = (word, translation) => {
    const newWord = { word, translation }
    setWords([...words, newWord])
  }

  const handleShuffle = () => {
    if (!isShuffled) {
      const shuffled = [...words].sort(() => Math.random() - 0.5)
      setShuffledWords(shuffled)
      setIsShuffled(true)
      setCurrentIndex(0)
    } else {
      setIsShuffled(false)
      setCurrentIndex(0)
    }
  }

  const handleNext = () => {
    const currentWords = isShuffled ? shuffledWords : words
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleForgotten = () => {
    const currentWords = isShuffled ? shuffledWords : words
    const currentWord = currentWords[currentIndex]
    
    if (currentWord && !forgottenWords.find(w => w.word === currentWord.word)) {
      setForgottenWords([...forgottenWords, currentWord])
      handleNext()
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
  }

  const handleRemoveForgotten = (index) => {
    setForgottenWords(forgottenWords.filter((_, i) => i !== index))
  }

  const handleClearForgotten = () => {
    if (window.confirm('Are you sure you want to clear all forgotten words?')) {
      setForgottenWords([])
    }
  }

  const currentWords = isShuffled ? shuffledWords : words

  if (words.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-purple-700">
        <header className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-8 text-center shadow-md">
          <h1 className="text-4xl font-bold mb-2 -tracking-0.5">📚 Vocab Flashcards</h1>
          <p className="text-lg opacity-95 font-light">Master vocabulary with interactive flashcards</p>
        </header>

        <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
          <Form onAddWord={handleAddWord} />
          
          <div className="text-center py-12 animate-slideUp">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-white text-3xl mb-2 font-semibold">No words yet!</h2>
            <p className="text-white/80 text-lg">Add some words above to get started with your vocabulary practice.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-500 to-purple-700">
      <header className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-8 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-2 -tracking-0.5">📚 Vocab Flashcards</h1>
        <p className="text-lg opacity-95 font-light">Master vocabulary with interactive flashcards</p>
      </header>

      <main className="flex-1 px-4 py-8 max-w-4xl mx-auto w-full">
        <div className="flex gap-4 mb-8 bg-white/10 p-2 rounded-xl backdrop-blur-md">
          <button
            className={`flex-1 px-6 py-3 border-none bg-transparent text-white/70 text-base font-medium cursor-pointer rounded-lg transition-all ${
              activeTab === 'practice' ? 'bg-white text-purple-500 shadow-md' : 'hover:bg-white/10 hover:text-white'
            }`}
            onClick={() => setActiveTab('practice')}
          >
            Practice
          </button>
          <button
            className={`flex-1 px-6 py-3 border-none bg-transparent text-white/70 text-base font-medium cursor-pointer rounded-lg transition-all ${
              activeTab === 'forgotten' ? 'bg-white text-purple-500 shadow-md' : 'hover:bg-white/10 hover:text-white'
            }`}
            onClick={() => setActiveTab('forgotten')}
          >
            Forgotten Words ({forgottenWords.length})
          </button>
        </div>

        {activeTab === 'practice' ? (
          <>
            <Form onAddWord={handleAddWord} />

            {currentWords.length > 0 && (
              <>
                <Flashcard
                  word={currentWords[currentIndex].word}
                  translation={currentWords[currentIndex].translation}
                  currentIndex={currentIndex}
                  totalCards={currentWords.length}
                />

                <Controls
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onForgotten={handleForgotten}
                  onShuffle={handleShuffle}
                  onRestart={handleRestart}
                  hasNext={currentIndex < currentWords.length - 1}
                  hasPrevious={currentIndex > 0}
                  isShuffled={isShuffled}
                />
              </>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-slideUp">
            <h2 className="text-primary text-2xl font-semibold mb-6">Forgotten Words ({forgottenWords.length})</h2>
            {forgottenWords.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">No forgotten words yet. Keep practicing! 🎉</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 mb-6">
                {forgottenWords.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg transition-all hover:translate-x-1 hover:shadow-md">
                    <div className="flex flex-col gap-1 flex-1">
                      <span className="font-semibold text-primary text-lg">{item.word}</span>
                      <span className="text-gray-600 text-base">{item.translation}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveForgotten(index)}
                      className="bg-red-500 border-none text-white w-8 h-8 rounded-full cursor-pointer text-lg flex items-center justify-center transition-all hover:bg-red-600 hover:scale-110 flex-shrink-0 ml-4"
                      title="Remove this word"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {forgottenWords.length > 0 && (
              <button
                onClick={handleClearForgotten}
                className="btn btn-danger w-full"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
