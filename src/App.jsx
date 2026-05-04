import { useState, useEffect } from 'react'
import Form from './components/Form'
import Flashcard from './components/Flashcard'
import Controls from './components/Controls'
import GroupSelector from './components/GroupSelector'

export default function App() {
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [words, setWords] = useState([])
  const [forgottenWords, setForgottenWords] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isShuffled, setIsShuffled] = useState(false)
  const [shuffledWords, setShuffledWords] = useState([])
  const [activeTab, setActiveTab] = useState('practice')
  const [showGroupSelector, setShowGroupSelector] = useState(false)

  // Load data from localStorage
  useEffect(() => {
    const savedGroups = localStorage.getItem('flashcard_groups')
    const savedWords = localStorage.getItem('flashcard_words')
    const savedForgotten = localStorage.getItem('flashcard_forgotten')

    if (savedGroups) {
      try {
        setGroups(JSON.parse(savedGroups))
      } catch (e) {
        console.error('Error loading groups:', e)
      }
    }

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

  // Save groups
  useEffect(() => {
    localStorage.setItem('flashcard_groups', JSON.stringify(groups))
  }, [groups])

  // Save words
  useEffect(() => {
    localStorage.setItem('flashcard_words', JSON.stringify(words))
  }, [words])

  // Save forgotten words
  useEffect(() => {
    localStorage.setItem('flashcard_forgotten', JSON.stringify(forgottenWords))
  }, [forgottenWords])

  // Reset index when words change
  useEffect(() => {
    setCurrentIndex(0)
  }, [words.length, selectedGroupId])

  const handleCreateGroup = (groupData) => {
    const newGroup = {
      id: Date.now().toString(),
      ...groupData,
      createdAt: new Date().toISOString(),
    }
    setGroups([...groups, newGroup])
    setSelectedGroupId(newGroup.id)
    setShowGroupSelector(false)
  }

  const handleAddWord = (word, translation) => {
    if (!selectedGroupId) return

    const newWord = {
      word,
      translation,
      groupId: selectedGroupId,
      createdAt: new Date().toISOString(),
    }
    setWords([...words, newWord])
  }

  const handleShuffle = () => {
    if (!isShuffled) {
      const shuffled = [...groupWords].sort(() => Math.random() - 0.5)
      setShuffledWords(shuffled)
      setIsShuffled(true)
      setCurrentIndex(0)
    } else {
      setIsShuffled(false)
      setCurrentIndex(0)
    }
  }

  const handleNext = () => {
    if (currentIndex < groupWords.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleForgotten = () => {
    const currentWord = groupWords[currentIndex]
    if (currentWord && !forgottenWords.find(w => w.word === currentWord.word && w.groupId === selectedGroupId)) {
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
    if (window.confirm('Clear all forgotten words?')) {
      setForgottenWords([])
    }
  }

  const selectedGroup = groups.find(g => g.id === selectedGroupId)
  const groupWords = isShuffled ? shuffledWords : words.filter(w => w.groupId === selectedGroupId)
  const groupForgottenWords = forgottenWords.filter(w => w.groupId === selectedGroupId)

  if (groups.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 flex flex-col">
        <header className="text-white p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">📚 Vocab Master</h1>
          <p className="text-sm md:text-base opacity-90 font-light">Learn languages, organize by topics</p>
        </header>

        <main className="flex-1 px-4 md:px-8 py-8 max-w-2xl mx-auto w-full flex flex-col items-center justify-center">
          <div className="text-center space-y-6">
            <div className="text-6xl">📖</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Start Learning Today</h2>
            <p className="text-white/80 text-base mb-8">Create your first group to begin adding words</p>
            <button
              onClick={() => setShowGroupSelector(true)}
              className="inline-block px-8 py-4 bg-white text-[#667eea] font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              Create First Group
            </button>
          </div>
        </main>

        <GroupSelector
          groups={groups}
          selectedGroup={selectedGroup}
          onSelectGroup={setSelectedGroupId}
          onCreateGroup={handleCreateGroup}
          onClose={() => setShowGroupSelector(false)}
          isOpen={showGroupSelector}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 flex flex-col">
      {/* Header */}
      <header className="text-white p-4 md:p-6 sticky top-0 bg-gradient-to-br from-purple-500 to-purple-700 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">📚 Vocab Master</h1>
          <p className="text-xs md:text-sm opacity-80 mt-1">
            {selectedGroup ? `${selectedGroup.name} • ${selectedGroup.langFrom} → ${selectedGroup.langTo}` : 'Select a group'}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-8 py-6 md:py-8 max-w-2xl mx-auto w-full space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 md:gap-3 bg-white/10 p-1 rounded-xl backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'practice'
                ? 'bg-white text-[#667eea] shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => setActiveTab('forgotten')}
            className={`flex-1 px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'forgotten'
                ? 'bg-white text-[#667eea] shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Forgotten ({groupForgottenWords.length})
          </button>
          <button
            onClick={() => setShowGroupSelector(true)}
            className="px-3 md:px-4 py-2.5 md:py-3 text-white/70 hover:text-white text-xl font-light transition-colors rounded-lg"
            title="Change group"
          >
            ⚙️
          </button>
        </div>

        {/* Content */}
        {activeTab === 'practice' ? (
          <>
            {groupWords.length === 0 ? (
              <div className="space-y-6">
                <Form
                  onAddWord={handleAddWord}
                  selectedGroup={selectedGroup}
                  onOpenGroupSelector={() => setShowGroupSelector(true)}
                />
                <div className="text-center py-12 space-y-3">
                  <div className="text-5xl">➕</div>
                  <p className="text-white/80 text-base">No words in this group yet. Add one above!</p>
                </div>
              </div>
            ) : (
              <>
                <Flashcard
                  word={groupWords[currentIndex].word}
                  translation={groupWords[currentIndex].translation}
                  currentIndex={currentIndex}
                  totalCards={groupWords.length}
                />

                <Controls
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onForgotten={handleForgotten}
                  onShuffle={handleShuffle}
                  onRestart={handleRestart}
                  hasNext={currentIndex < groupWords.length - 1}
                  hasPrevious={currentIndex > 0}
                  isShuffled={isShuffled}
                />

                <Form
                  onAddWord={handleAddWord}
                  selectedGroup={selectedGroup}
                  onOpenGroupSelector={() => setShowGroupSelector(true)}
                />
              </>
            )}
          </>
        ) : (
          <div className="space-y-4">
            {groupForgottenWords.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="text-5xl">✨</div>
                <p className="text-white/80 text-base">No forgotten words. Great job! 🎉</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-6">
                  {groupForgottenWords.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.word}</p>
                        <p className="text-sm text-gray-600 mt-0.5">{item.translation}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveForgotten(forgottenWords.indexOf(item))}
                        className="ml-4 p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleClearForgotten}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        )}
      </main>

      {/* Group Selector Modal */}
      <GroupSelector
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={setSelectedGroupId}
        onCreateGroup={handleCreateGroup}
        onClose={() => setShowGroupSelector(false)}
        isOpen={showGroupSelector}
      />
    </div>
  )
}
