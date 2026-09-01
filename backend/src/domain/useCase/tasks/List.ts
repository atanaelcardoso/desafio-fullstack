import { inMemoryDatabase } from "../../../infra/database/Database.js";
import type { Task, TaskStatus } from "../../entity/Task.js";

export class ListTasksUseCase {
  async execute(userId: string, status?: TaskStatus): Promise<Task[]> {
    let userTasks = inMemoryDatabase.tasks.filter(t => t.userId === userId);

    if (status) {
      userTasks = userTasks.filter(t => t.status === status);
    }

    return userTasks;
  }
}
