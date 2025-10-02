const express = require("express");
const app = express();
const authRoutes = require("./routes/auth"); // importa rotas de auth
const usersRoutes = require("./routes/users"); // importa rotas de users

app.use(express.json()); // permite receber JSON no corpo da requisição

// configura rotas
app.use("/auth", authRoutes); // rotas de auth: /auth/register e /auth/login
app.use("/users", usersRoutes); // rotas de usuários: /users e /users/:id

const PORT = 3000; // porta do servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)); // inicia servidor
