import express from 'express';
import cors from 'cors';
import { authRoutes } from './infra/routes/auth.js';
import { taskRoutes } from './infra/routes/task.js';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes(): void {
    this.server.use(authRoutes);
    this.server.use('/tasks', taskRoutes);
  }
}

export default new App().server;
