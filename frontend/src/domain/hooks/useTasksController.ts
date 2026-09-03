import { useCallback, useMemo } from 'react';
import { useTaskState } from './useTask';
import { ListTasksUseCase } from '../useCase/listTask';
import { CreateTaskUseCase } from '../useCase/createTask';
import { UpdateTaskUseCase } from '../useCase/updateTask';
import { DeleteTaskUseCase } from '../useCase/deleteTaks';
import type { TaskStatus } from '../entity/tasks';


export function useTasksController() {
  const state = useTaskState();

  const listUseCase = useMemo(() => new ListTasksUseCase(), []);
  const createUseCase = useMemo(() => new CreateTaskUseCase(), []);
  const updateUseCase = useMemo(() => new UpdateTaskUseCase(), []);
  const deleteUseCase = useMemo(() => new DeleteTaskUseCase(), []);

  const fetchTasks = useCallback(async (status?: TaskStatus | '') => {
    state.setLoading(true);
    try {
      const data = await listUseCase.execute(status);
      state.setTasksList(data);
    } catch {
      alert('Erro ao processar listagem de tarefas.');
    } finally {
      state.setLoading(false);
    }
  }, [state.setTasksList, listUseCase]);

  const handleCreate = async (title: string) => {
    try {
      await createUseCase.execute(title);
    } catch {
      alert('Falha ao registrar nova tarefa.');
    }
  };

  const handleUpdate = async (id: string, title: string, status: TaskStatus) => {
    try {
      const updatedTask = await updateUseCase.execute(id, title, status);
      state.updateTask(updatedTask);
      
    } catch (error: any) {
      alert(error.message || 'Falha ao atualizar dados.');
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUseCase.execute(id);
      state.removeTask(id);

    } catch {
      alert('Erro ao remover tarefa.');
    }
  };

  return {
    tasks: state.tasks,
    loading: state.loading,
    fetchTasks,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
}
