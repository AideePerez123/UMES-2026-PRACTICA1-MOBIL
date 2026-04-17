import type { Task } from "../../domain/task/task.types";

export function selectCompletedTasks(tasks: Task[]): Task[]{
  return tasks.filter((task) => task.completed);
}

export function selectPendingTasks(tasks: Task[]): Task[]{
  return tasks.filter((task) => !task.completed);
}
