import { useState } from 'react'

export default function Form({ onAddWord, selectedGroup, onOpenGroupSelector }) {
  const [word, setWord] = useState('')
  const [translation, setTranslation] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!word.trim() || !translation.trim()) {
      setMessage('Please fill in both fields')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    if (!selectedGroup) {
      setMessage('Please select a group first')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    onAddWord(word.trim(), translation.trim())
    setMessage('Word added successfully!')
    setWord('')
    setTranslation('')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Group Selector Button */}
      <button
        type="button"
        onClick={onOpenGroupSelector}
        className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-left group"
      >
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Group</div>
        <div className="text-base font-semibold text-gray-900 flex items-center justify-between">
          <span>{selectedGroup?.name || 'Select a group'}</span>
          <span className="text-lg text-gray-400 group-hover:text-gray-600">›</span>
        </div>
        {selectedGroup && (
          <div className="text-xs text-gray-600 mt-1">
            {selectedGroup.langFrom} → {selectedGroup.langTo} • {selectedGroup.topic || 'General'}
          </div>
        )}
      </button>

      {/* Main Input Field */}
      <input
        type="text"
        placeholder="Word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="w-full px-4 py-3 text-base font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea] focus:ring-opacity-10 placeholder-gray-400"
      />

      <input
        type="text"
        placeholder="Translation"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
        className="w-full px-4 py-3 text-base font-medium bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea] focus:ring-opacity-10 placeholder-gray-400"
      />

      <button 
        type="submit" 
        className="w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
      >
        Add Word
      </button>

      {message && (
        <p className="p-3 rounded-lg text-center font-medium animate-slideUp text-white bg-gradient-to-r from-[#667eea] to-[#764ba2] text-sm">
          {message}
        </p>
      )}
    </form>
  )
}
