import App from "./App.js";

const PORT = Number(process.env.PORT ?? 3000);

App.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 50px;">
      <img src="https://github.com" alt="Obuc Tech" style="max-width: 200px; margin-bottom: 200px;">
      <h1 style="color: #333;">🚀 API do Desafio Fullstack Conectada!</h1>
      <p style="color: #666;">O backend está rodando com sucesso e conectado ao Supabase.</p>
      <div style="margin-top: 30px;">
        <span style="background: #e1f5fe; color: #0288d1; padding: 8px 16px; border-radius: 20px; font-weight: bold;">Status: Online</span>
      </div>
    </div>
  `);
});

App.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor escutando globalmente na porta ${PORT}`);
});
