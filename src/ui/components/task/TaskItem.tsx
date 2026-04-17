import type { Task } from "../../../domain/task/task.types"

type Props = {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({task, onComplete, onDelete}: Props) {

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded shadow">
      <div className="flex items-center">
        {
          task.completed ? (
            <span className="text-gray-800 line-through">{task.title}</span>
          ) : (
            <span className="text-gray-800">{task.title}</span>
          )
        }
      </div>
      <div className="flex flex-row gap-2">
          <button 
            type="button" 
            onClick={() => onComplete(task.id)}
            className="bg-green-200 hover:bg-green-400 p-4 text-green-500 hover:text-green-700">
              Completada
          </button>
          <button 
            type="button"
            onClick={() => onDelete(task.id)}
            className="bg-red-200 hover:bg-red-400 p-4 text-red-500 hover:text-red-700">
              Eliminar
          </button>
      </div>
    </div>
  )
}
