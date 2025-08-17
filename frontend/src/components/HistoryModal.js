export default function HistoryModal({ note, onClose }) {
  if (!note) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">History - {note.title}</h2>
        {note.history.length === 0 ? (
          <p>No history available</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {note.history.map((h, index) => (
              <li key={index} className="border p-2 rounded bg-gray-50">
                <p className="text-sm text-gray-500">User ID: {h.user}</p>
                <p className="text-sm text-gray-500">
                  Time: {new Date(h.timestamp).toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Title:</strong> {h.title}
                </p>
                <p className="text-gray-700">
                  <strong>Content:</strong> {h.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
