import TaskForm from "../components/task/TaskForm"
import TaskList from "../components/task/TaskList"
import useTaskActions from "../../application/task/useTaskActions"

function HomePage() {

  const { tasks, loading, addTask, onComplete, onDelete, onRemoveFile } = useTaskActions();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Cargando tareas...</div>
      </div>
    );
  }

  return (
    <>
      <TaskForm addTask={addTask} />
      <h3>Lista de tareas</h3>
      <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} onRemoveFile={onRemoveFile} />
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay tareas. ¡Agrega una!
        </div>
      )}
    </>
  )
}

export default HomePage