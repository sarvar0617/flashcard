export default function ForgottenWords({ words, onRemove, onClear, onClose }) {
  if (words.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-80vh overflow-y-auto shadow-3xl relative animate-slideUp" onClick={(e) => e.stopPropagation()}>
          <button className="absolute top-4 right-4 bg-none border-none text-2xl cursor-pointer text-primary w-10 h-10 flex items-center justify-center transition-all rounded-full hover:bg-primary/10 hover:scale-110" onClick={onClose}>×</button>
          <h2 className="text-primary text-2xl font-semibold">Forgotten Words</h2>
          <p className="text-center py-8 text-gray-600 text-lg">No forgotten words yet. Keep practicing! 🎉</p>
          <button onClick={onClose} className="btn btn-primary w-full">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-80vh overflow-y-auto shadow-3xl relative animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-4 right-4 bg-none border-none text-2xl cursor-pointer text-primary w-10 h-10 flex items-center justify-center transition-all rounded-full hover:bg-primary/10 hover:scale-110" onClick={onClose}>×</button>
        <h2 className="text-primary text-2xl font-semibold mb-6">Forgotten Words ({words.length})</h2>
        
        <div className="flex flex-col gap-4 mb-6">
          {words.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg transition-all hover:translate-x-1 hover:shadow-md animate-slideIn">
              <div className="flex flex-col gap-2 flex-1">
                <span className="font-semibold text-primary text-lg">{item.word}</span>
                <span className="text-gray-600 text-base">{item.translation}</span>
              </div>
              <button
                onClick={() => onRemove(index)}
                className="bg-red-500 border-none text-white w-8 h-8 rounded-full cursor-pointer text-lg flex items-center justify-center transition-all hover:bg-red-600 hover:scale-110 flex-shrink-0 ml-4"
                title="Remove this word"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-8">
          <button onClick={onClear} className="btn btn-danger flex-1">
            Clear All
          </button>
          <button onClick={onClose} className="btn btn-primary flex-1">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
