const { readDB, writeDB } = require("../utils/db");
const bcrypt = require("bcryptjs");

// Listar todos os usuários
function getUsers(req, res) {
  const db = readDB();
  res.json(db.users); // retorna todos os usuários
}

// Buscar usuário por ID
function getUserById(req, res) {
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.id); // busca pelo ID da URL
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
  res.json(user); // retorna usuário encontrado
}

// Atualizar usuário
function updateUser(req, res) {
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.id); // busca usuário
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  const { nome, email, senha } = req.body; // pega novos dados
  if (nome) user.nome = nome; // atualiza nome
  if (email) user.email = email; // atualiza email
  if (senha) user.senha = bcrypt.hashSync(senha, 10); // atualiza senha criptografada

  writeDB(db); // salva alterações
  res.json({ message: "Usuário atualizado", user }); // retorna mensagem e usuário atualizado
}

// Deletar usuário
function deleteUser(req, res) {
  const db = readDB();
  const userIndex = db.users.findIndex(u => u.id === req.params.id); // pega índice do usuário
  if (userIndex === -1) return res.status(404).json({ error: "Usuário não encontrado" });

  db.users.splice(userIndex, 1); // remove do array
  writeDB(db); // salva alterações
  res.json({ message: "Usuário removido" }); // retorna mensagem
}

module.exports = { getUsers, getUserById, updateUser, deleteUser };
