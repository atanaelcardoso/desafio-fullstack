import { api } from '../../infra/api';
import type { Task } from '../entity/tasks';

export class CreateTaskUseCase {
  async execute(title: string): Promise<Task> {
    const response = await api.post<Task>('/tasks', { title });
    return response.data;
  }
}
