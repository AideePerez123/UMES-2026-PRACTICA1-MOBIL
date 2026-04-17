
import { useState, useRef } from 'react'

type Props = {
  addTask: (title: string, file?: File) => void;
}

export default function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTask(title, selectedFile || undefined);
    setTitle('');
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <form onSubmit={addTaskSubmit} className="w-full flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <input
          type="text"
          value={title}
          placeholder="Detalle de tarea"
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
        >
          Guardar
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
            <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
          </svg>
          <span className="text-sm text-gray-700">Adjuntar archivo</span>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {selectedFile && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-2">
            <span className="text-sm text-blue-700 truncate max-w-[200px]">
              {selectedFile.name}
            </span>
            <span className="text-xs text-blue-500">
              ({formatFileSize(selectedFile.size)})
            </span>
            <button
              type="button"
              onClick={removeSelectedFile}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </form>
  );
}