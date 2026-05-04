import { useState } from 'react'

export default function GroupSelector({ groups, selectedGroup, onSelectGroup, onCreateGroup, onClose, isOpen }) {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupData, setNewGroupData] = useState({
    wordType: 'noun',
    topic: '',
    langFrom: 'English',
    langTo: 'Uzbek',
  })

  const handleCreateGroup = (e) => {
    e.preventDefault()
    if (newGroupName.trim()) {
      onCreateGroup({
        name: newGroupName.trim(),
        ...newGroupData,
      })
      setNewGroupName('')
      setNewGroupData({
        wordType: 'noun',
        topic: '',
        langFrom: 'English',
        langTo: 'Uzbek',
      })
      setShowCreateForm(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-white w-full md:w-96 rounded-t-3xl md:rounded-3xl p-6 md:p-8 shadow-2xl max-h-96 md:max-h-auto overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Select Group</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {!showCreateForm ? (
          <>
            {groups.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No groups yet</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Create Your First Group
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-6">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => {
                        onSelectGroup(group.id)
                        onClose()
                      }}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        selectedGroup?.id === group.id
                          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-semibold">{group.name}</div>
                      <div className={`text-sm ${selectedGroup?.id === group.id ? 'text-white/80' : 'text-gray-600'}`}>
                        {group.langFrom} → {group.langTo} • {group.topic || 'General'}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full py-3 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  + New Group
                </button>
              </>
            )}
          </>
        ) : (
          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Group Name</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g., Basic Verbs"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea]"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Word Type</label>
              <select
                value={newGroupData.wordType}
                onChange={(e) => setNewGroupData({ ...newGroupData, wordType: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea]"
              >
                <option>noun</option>
                <option>verb</option>
                <option>adjective</option>
                <option>adverb</option>
                <option>phrase</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Topic/Category</label>
              <input
                type="text"
                value={newGroupData.topic}
                onChange={(e) => setNewGroupData({ ...newGroupData, topic: e.target.value })}
                placeholder="e.g., Travel, Business"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">From Language</label>
                <select
                  value={newGroupData.langFrom}
                  onChange={(e) => setNewGroupData({ ...newGroupData, langFrom: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea] text-sm"
                >
                  <option>English</option>
                  <option>Korean</option>
                  <option>Russian</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">To Language</label>
                <select
                  value={newGroupData.langTo}
                  onChange={(e) => setNewGroupData({ ...newGroupData, langTo: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#667eea] text-sm"
                >
                  <option>Uzbek</option>
                  <option>English</option>
                  <option>Korean</option>
                  <option>Russian</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg font-semibold hover:shadow-lg"
              >
                Create
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
