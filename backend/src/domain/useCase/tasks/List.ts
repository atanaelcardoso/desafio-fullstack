import { prisma } from "../../../infra/database/prisma.js";
import type { Task, TaskStatus } from "../../entity/Task.js";

export class ListTasksUseCase {
  async execute(userId: string, status?: TaskStatus): Promise<Task[]> {
    const userTasks = await prisma.task.findMany({
      where: {
        userId: userId,
        ...(status ? { status } : {})
      }
    });

    return userTasks as Task[];
  }
}
