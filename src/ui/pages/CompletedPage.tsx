import {selectCompletedTasks } from "../../application/task/useTaskSelectors"
import useTaskActions from "../../application/task/useTaskActions"
import TaskList from "../components/task/TaskList"

function CompletedPage() {

  const { tasks, onComplete, onDelete } = useTaskActions();
  const completedTasks = selectCompletedTasks(tasks);

  return (
    <>
      <>
          <h3>Tareas completadas</h3>
          <TaskList tasks={completedTasks} onComplete={onComplete} onDelete={onDelete} />
        </>
    </>
  )
}

export default CompletedPage
