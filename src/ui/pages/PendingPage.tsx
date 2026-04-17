import { selectPendingTasks } from "../../application/task/useTaskSelectors"
import useTaskActions from "../../application/task/useTaskActions"
import TaskList from "../components/task/TaskList"

function PendingPage() {

  const { tasks, loading, onComplete, onDelete, onRemoveFile } = useTaskActions();
  const pendingTasks = selectPendingTasks(tasks);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Cargando tareas...</div>
      </div>
    );
  }

  return (
    <>
      <h3>Tareas pendientes</h3>
      <TaskList tasks={pendingTasks} onComplete={onComplete} onDelete={onDelete} onRemoveFile={onRemoveFile} />
      {pendingTasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No hay tareas pendientes.
        </div>
      )}
    </>
  )
}

export default PendingPage