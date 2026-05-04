import { useState } from 'react'

export default function Form({ onAddWord }) {
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

    onAddWord(word.trim(), translation.trim())
    setMessage('Word added successfully!')
    setWord('')
    setTranslation('')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="bg-white rounded-2xl p-8 mb-8 shadow-2xl animate-slideUp">
      <h2 className="text-primary text-2xl font-semibold mb-6">Add New Word</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="word" className="text-gray-800 font-semibold text-base uppercase tracking-wide">English Word</label>
          <input
            id="word"
            type="text"
            placeholder="e.g., hello"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base transition-all font-inherit bg-white text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="translation" className="text-gray-800 font-semibold text-base uppercase tracking-wide">Translation</label>
          <input
            id="translation"
            type="text"
            placeholder="e.g., salom"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg text-base transition-all font-inherit bg-white text-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 placeholder-gray-400"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Word
        </button>
      </form>

      {message && <p className="p-4 rounded-lg text-center font-medium animate-slideUp text-white bg-gradient-to-r from-primary to-primary-dark mt-4">{message}</p>}
    </div>
  )
}
