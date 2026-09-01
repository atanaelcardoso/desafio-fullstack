import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/security.js';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    return;
  }

  const [scheme, token] = authHeader.split(' ');

  if (!token || scheme !== 'Bearer') {
    res.status(401).json({ error: 'Acesso negado. Token inválido.' });
    return;
  }
  
  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
