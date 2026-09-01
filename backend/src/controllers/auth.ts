import type { Request, Response } from "express";
import { LoginUseCase } from "../domain/useCase/auth/Login.js";
import { RegisterUseCase } from "../domain/useCase/auth/Register.js";


export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const registerUseCase = new RegisterUseCase();
      const user = await registerUseCase.execute(email, password);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const loginUseCase = new LoginUseCase();
      const result = await loginUseCase.execute(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
