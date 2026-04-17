import { useState } from 'react';
import type { Task } from "../../../domain/task/task.types"

type Props = {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onRemoveFile: (id: string) => void;
}

export default function TaskItem({ task, onComplete, onDelete, onRemoveFile }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadFile = () => {
    if (!task.file) return;

    const blob = new Blob([task.file.data], { type: task.file.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = task.file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {task.completed ? (
            <span className="text-gray-800 line-through">{task.title}</span>
          ) : (
            <span className="text-gray-800">{task.title}</span>
          )}
        </div>
        <div className="flex flex-row gap-2">
          <button
            type="button"
            onClick={() => onComplete(task.id)}
            className="bg-green-200 hover:bg-green-400 p-2 text-green-500 hover:text-green-700 text-sm"
          >
            Completada
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="bg-red-200 hover:bg-red-400 p-2 text-red-500 hover:text-red-700 text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>

      {task.file && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={downloadFile}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{task.file.name}</span>
              <span className="text-xs text-gray-500">({formatFileSize(task.file.size)})</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 bg-white rounded shadow-lg border z-20 min-w-[160px]">
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveFile(task.id);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Eliminar adjunto
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}