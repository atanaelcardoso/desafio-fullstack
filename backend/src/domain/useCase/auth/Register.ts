import { prisma } from "../../../infra/database/prisma.js";
import { encryptPassword } from "../../../utils/security.js";
import type { User } from "../../entity/user.js";

export class RegisterUseCase {
  async execute(
    email: string,
    password: string,
  ): Promise<Omit<User, "password">> {
    if (!email || !password) {
      throw new Error("E-mail e senha são obrigatórios.");
    }

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new Error("Usuário já cadastrado no sistema.");
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { id: newUser.id, email: newUser.email };
  }
}
