import type { Task } from "../../domain/entity/Task.js";
import type { User } from "../../domain/entity/user.js";

class InMemoryDatabase {
  public users: User[] = [];
  public tasks: Task[] = [];
}

export const inMemoryDatabase = new InMemoryDatabase();
