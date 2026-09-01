import { inMemoryDatabase } from "../../../infra/database/Database.js";
import type { Task } from "../../entity/Task.js";

export class GetTaskByIdUseCase {
  async execute(id: string, userId: string): Promise<Task> {
    const task = inMemoryDatabase.tasks.find(t => t.id === id && t.userId === userId);
    
    if (!task) {
      throw new Error('Tarefa não encontrada.');
    }

    return task;
  }
}
