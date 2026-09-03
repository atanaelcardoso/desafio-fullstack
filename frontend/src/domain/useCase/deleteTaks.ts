import { api } from '../../infra/api';

export class DeleteTaskUseCase {
  async execute(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}
