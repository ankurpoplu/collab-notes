// src/components/ErrorBar.js
import { useEffect } from "react";

export default function ErrorBar({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 4000); // auto-hide in 4s
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex justify-between items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold">
        ✕
      </button>
    </div>
  );
}
