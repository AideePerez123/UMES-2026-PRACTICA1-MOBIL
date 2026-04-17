import { useState } from 'react'

type Props = {
  addTask: (title: string) => void;
}

export default function TaskForm({addTask}: Props) {
  const [title, setTitle] = useState('');
  
  const addTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(title);
    setTitle('');
  }

  return (
    <form onSubmit={addTaskSubmit} className="w-full flex flex-row gap-4">
      <input
        type="text"
        value={title}
        placeholder="Detalle de tarea"
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-200"
      >
        Guardar
      </button>
    </form>
  )
}