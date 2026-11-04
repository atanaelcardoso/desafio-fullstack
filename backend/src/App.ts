import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRoutes } from './infra/routes/auth.js';
import { taskRoutes } from './infra/routes/task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    this.server.use(express.static(path.join(__dirname, '../../frontend/dist')));
  }

  private routes(): void {
    this.server.use(authRoutes);
    this.server.use('/tasks', taskRoutes);

    this.server.use((req, res, next) => {
      if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
      } else {
        next();
      }
    });
  }
}

export default new App().server;
