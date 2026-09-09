import { prisma } from "../../../infra/database/prisma.js";
import type { Task } from "../../entity/Task.js";

export class GetTaskByIdUseCase {
  async execute(id: string, userId: string): Promise<Task> {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
        userId: userId
      }
    });

    if (!task) {
      throw new Error('Tarefa não encontrada.');
    }

    return task as Task;
  }
}
