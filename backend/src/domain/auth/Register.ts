import { inMemoryDatabase } from "../../infra/database/Database.js";
import { encryptPassword } from "../../utils/security.js";
import type { User } from "../entity/user.js";


export class RegisterUseCase {
  async execute(email: string, password: string): Promise<Omit<User, 'password'>> {
    if (!email || !password) {
      throw new Error('E-mail e senha são obrigatórios.');
    }

    const userExists = inMemoryDatabase.users.find(u => u.email === email);
    if (userExists) {
      throw new Error('Usuário já cadastrado no sistema.');
    }

    const hashedPassword = await encryptPassword(password);
    const newUser: User = {
      id: String(inMemoryDatabase.users.length + 1),
      email,
      password: hashedPassword
    };

    inMemoryDatabase.users.push(newUser);
    return { id: newUser.id, email: newUser.email };
  }
}
