import { prisma } from "../../../infra/database/prisma.js";
import type { Task, TaskStatus } from "../../entity/Task.js";

export class UpdateTaskUseCase {
  async execute(
    id: string,
    userId: string,
    title?: string,
    status?: TaskStatus,
  ): Promise<Task> {
    const currentTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!currentTask) {
      throw new Error("Tarefa não encontrada.");
    }

    if (currentTask.status === "concluído") {
      throw new Error("Tarefas concluídas não podem ser editadas.");
    }
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        ...(title ? { title: title.trim() } : {}),
        ...(status ? { status } : {}),
      },
    });

    return updatedTask as Task;
  }
}
