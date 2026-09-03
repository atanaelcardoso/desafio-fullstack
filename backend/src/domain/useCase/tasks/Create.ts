import { inMemoryDatabase } from "../../../infra/database/Database.js";
import type { Task } from "../../entity/Task.js";
import crypto from "crypto";

export class CreateTaskUseCase {
  async execute(title: string, userId: string): Promise<Task> {
    if (!title) {
      throw new Error('O nome da tarefa é obrigatório.');
    }

    const taskAlreadyExists = inMemoryDatabase.tasks.some(
      t => t.title.toLowerCase().trim() === title.toLowerCase().trim() && t.userId === userId
    );

    if (taskAlreadyExists) {
      throw new Error('Já existe uma tarefa com esse nome.');
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      userId,
      status: 'não iniciado'
    };

    inMemoryDatabase.tasks.push(newTask);
    return newTask;
  }
}
