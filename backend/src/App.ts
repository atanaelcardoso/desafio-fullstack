import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRoutes } from './infra/routes/auth.js';
import { taskRoutes } from './infra/routes/task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

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
    if (existsSync(frontendIndexPath)) {
      this.server.use(express.static(frontendDistPath));
    }
  }

  private routes(): void {
    this.server.use(authRoutes);
    this.server.use('/tasks', taskRoutes);

    this.server.use((req, res, next) => {
      if (existsSync(frontendIndexPath) && req.accepts('html')) {
        res.sendFile(frontendIndexPath);
      } else {
        next();
      }
    });
  }
}

export default new App().server;
