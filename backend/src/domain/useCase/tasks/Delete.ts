import { inMemoryDatabase } from "../../../infra/database/Database.js";


export class DeleteTaskUseCase {
  async execute(id: string, userId: string): Promise<void> {
    const taskIndex = inMemoryDatabase.tasks.findIndex(t => t.id === id && t.userId === userId);

    if (taskIndex === -1) {
      throw new Error('Tarefa não encontrada.');
    }

    inMemoryDatabase.tasks.splice(taskIndex, 1);
  }
}
