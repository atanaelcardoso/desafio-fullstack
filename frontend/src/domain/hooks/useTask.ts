import { useState, useCallback } from 'react';
import type { Task } from '../entity/tasks';


export function useTaskState() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const setTasksList = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((currentTasks) => currentTasks.filter(task => task.id !== id));
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, []);

  return {
    tasks,
    loading,
    setLoading,
    setTasksList,
    removeTask,
    updateTask,
  };
}
