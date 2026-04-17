import { selectCompletedTasks } from "../../application/task/useTaskSelectors"
import useTaskActions from "../../application/task/useTaskActions"
import TaskList from "../components/task/TaskList"

function CompletedPage() {

  const { tasks, loading, onComplete, onDelete, onRemoveFile } = useTaskActions();
  const completedTasks = selectCompletedTasks(tasks);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Cargando tareas...</div>
      </div>
    );
  }

  return (
    <>
      <h3>Tareas completadas</h3>
      <TaskList tasks={completedTasks} onComplete={onComplete} onDelete={onDelete} onRemoveFile={onRemoveFile} />
      {completedTasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay tareas completadas.
        </div>
      )}
    </>
  )
}

export default CompletedPage