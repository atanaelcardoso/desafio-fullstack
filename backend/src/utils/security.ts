import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'sua_chave_secreta_super_protegida';

export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 8);
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
