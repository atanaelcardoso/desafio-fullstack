import { api } from '../../infra/api';

export class DeleteTaskUseCase {
  async execute(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }
}
