import { prisma } from "../../../infra/database/prisma.js";
import { comparePassword, generateToken } from "../../../utils/security.js";

export class LoginUseCase {
  async execute(email: string, password: string): Promise<{ token: string; userId: string }> {
   const user = await prisma.user.findFirst({
      where: { email }
    });
    
    if (!user || !user.password || !(await comparePassword(password, user.password))) {
      throw new Error('Credenciais inválidas (e-mail ou senha incorretos).');
    }

    const token = generateToken(user.id);
    return { token, userId: user.id };
  }
}
