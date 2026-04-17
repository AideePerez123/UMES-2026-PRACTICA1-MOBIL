import TaskItem from "./TaskItem";
import type { Task } from "../../../domain/task/task.types"

type Props = {
  tasks: Task[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({tasks, onComplete, onDelete}: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
        ))}
      </div>
    </>
  )
}