import { useState, useCallback } from 'react';
import type { Task } from '../entity/tasks';


export function useTaskState() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const setTasksList = useCallback((newTasks: Task[]) => {
    setTasks(newTasks);
  }, []);

  return {
    tasks,
    loading,
    setLoading,
    setTasksList,
  };
}
