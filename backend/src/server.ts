import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3333;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servido rodando na http://localhost:${PORT}`);
});

