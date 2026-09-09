import { prisma } from "../../../infra/database/prisma.js";

export class DeleteTaskUseCase {
  async execute(id: string, userId: string): Promise<void> {
    const task = await prisma.task.findFirst({
      where: {
        id: id,
        userId: userId
      }
    });

    if (!task) {
      throw new Error('Tarefa não encontrada.');
    }

    await prisma.task.delete({
      where: {
        id: id
      }
    });
  }
}
