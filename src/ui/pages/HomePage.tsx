import TaskForm from "../components/task/TaskForm"
import TaskList from "../components/task/TaskList"
import useTaskActions from "../../application/task/useTaskActions"

function HomePage() {
  
  const {tasks, addTask, onComplete, onDelete} = useTaskActions();

  return (
    <>
      <TaskForm addTask={addTask}/>
      <h3>Lista de tareas</h3>
      <TaskList tasks={tasks} onComplete={onComplete} onDelete={onDelete} />
    </>
  )
}

export default HomePage
