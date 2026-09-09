import { prisma } from "../../../infra/database/prisma.js";
import type { Task } from "../../entity/Task.js";

export class CreateTaskUseCase {
  async execute(title: string, userId: string): Promise<Task> {
    if (!title) {
      throw new Error("O nome da tarefa é obrigatório.");
    }
    const taskAlreadyExists = await prisma.task.findFirst({
      where: {
        title: title.trim(),
        userId: userId,
      },
    });

    if (taskAlreadyExists) {
      throw new Error("Já existe uma tarefa com esse nome.");
    }

    const newTask = await prisma.task.create({
      data: {
        title: title.trim(),
        userId: userId,
      },
    });

    return newTask as Task;
  }
}
