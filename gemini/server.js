const express = require('express');
require('dotenv').config();

// Importar rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rotas públicas (autenticação)
app.use('/', authRoutes);

// Rotas protegidas (CRUD de usuários)
app.use('/users', userRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API Node.js CRUD JWT JSON rodando!' });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});