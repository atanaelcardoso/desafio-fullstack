import { api } from "../../infra/api";
import type { Task, TaskStatus } from "../entity/tasks";

export class ListTasksUseCase {
  async execute(status?: TaskStatus | ''): Promise<Task[]> {
    try {
      const url = status ? `/tasks?status=${status}` : '/tasks';
      const response = await api.get<Task[]>(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      throw new Error("Não foi possível carregar a lista de tarefas.");
    }
  }
}
