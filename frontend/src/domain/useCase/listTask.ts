import { api } from "../../infra/api";
import type { Task, TaskStatus } from "../entity/tasks";

export class ListTasksUseCase {
  async execute(status?: TaskStatus | ''): Promise<Task[]> {
    const url = status ? `/tasks?status=${status}` : '/tasks';
    const response = await api.get<Task[]>(url);
    return response.data;
  }
}
