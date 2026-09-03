import { api } from '../../infra/api';
import type { Task } from '../entity/tasks';

export class CreateTaskUseCase {
  async execute(title: string): Promise<Task> {
    try {
      const response = await api.post('/tasks', { title });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }
}
