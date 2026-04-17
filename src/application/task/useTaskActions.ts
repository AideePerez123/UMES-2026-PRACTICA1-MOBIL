import { useState, useEffect } from "react";
import type { Task, TaskFile } from "../../domain/task/task.types";
import validateTaskTitle from "../../domain/task/task.validators";
import generateId from "../../shared/generateId.util";
import { db } from "../../shared/db";

export default function useTaskActions() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await db.tasks.toArray();
        const tasksWithDates = storedTasks.map((task) => ({
          ...task,
          addedAt: new Date(task.addedAt),
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error("Error cargando tareas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = async (title: string, fileData?: TaskFile) => {
    const trimmedTitle = title.trim();
    
    if (!validateTaskTitle(title)) {
      console.warn("validacion fallida");
      alert("ingresee titulo de su tarea");
      return;
    }

    try {
      const newTask: Task = {
        id: generateId(),
        title: trimmedTitle,
        completed: false,
        addedAt: new Date(),
        file: fileData, 
      };

      console.log("Guardando tarea:", newTask);
      const id = await db.tasks.add(newTask);
      console.log("Tarea guardada exitosamente con ID:", id);
      
      setTasks((prev) => [...prev, newTask]);
      alert("Tarea guardada correctamente");
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      alert("Error al guardar la tarea. Intenta de nuevo.");
    }
  };

  const onComplete = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };
    await db.tasks.put(updatedTask);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updatedTask : t))
    );
  };

  const onDelete = async (id: string) => {
    await db.tasks.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onRemoveFile = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, file: undefined };
    await db.tasks.put(updatedTask);

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, file: undefined } : t))
    );
  };

  return {
    tasks,
    loading,
    addTask,
    onComplete,
    onDelete,
    onRemoveFile,
  };
}
