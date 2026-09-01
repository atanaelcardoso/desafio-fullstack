import { api } from '../../infra/api';
import type { Task, TaskStatus } from '../entity/tasks';

export class UpdateTaskUseCase {
  async execute(id: string, title: string, status: TaskStatus): Promise<Task> {
    const checkTask = await api.get<Task>(`/tasks/${id}`);
    
    if (checkTask.data.status === 'concluído') {
      throw new Error('Tarefas concluídas não podem ser editadas.');
    }

    const response = await api.put<Task>(`/tasks/${id}`, { title, status });
    return response.data;
  }
}
