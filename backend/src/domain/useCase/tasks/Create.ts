import { inMemoryDatabase } from "../../../infra/database/Database.js";
import type { Task } from "../../entity/Task.js";


export class CreateTaskUseCase {
  async execute(title: string, userId: string): Promise<Task> {
    if (!title) {
      throw new Error('O nome da tarefa é obrigatório.');
    }

    const newTask: Task = {
      id: String(inMemoryDatabase.tasks.length + 1),
      title,
      userId,
      status: 'não iniciado'
    };

    inMemoryDatabase.tasks.push(newTask);
    return newTask;
  }
}
