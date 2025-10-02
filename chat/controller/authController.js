const { readDB, writeDB } = require("../utils/db"); // funções para ler/escrever no JSON
const bcrypt = require("bcryptjs"); // módulo para criptografar senhas
const jwt = require("jsonwebtoken"); // para criar tokens JWT
const { v4: uuidv4 } = require("uuid"); // gera IDs únicos

const secret = "segredo123"; // chave secreta para criar JWT

// Registrar novo usuário
function register(req, res) {
  const { nome, email, senha } = req.body; // pega dados do corpo da requisição
  const db = readDB(); // lê o banco de dados

  // verifica se o email já existe
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  const hashedPassword = bcrypt.hashSync(senha, 10); // criptografa a senha
  const newUser = { id: uuidv4(), nome, email, senha: hashedPassword }; // cria objeto usuário
  db.users.push(newUser); // adiciona no array
  writeDB(db); // salva no arquivo

  res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
}

// Login do usuário
function login(req, res) {
  const { email, senha } = req.body; // pega dados do corpo
  const db = readDB(); // lê o banco de dados

  const user = db.users.find(u => u.email === email); // procura usuário
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const senhaValida = bcrypt.compareSync(senha, user.senha); // compara senha criptografada
  if (!senhaValida) return res.status(400).json({ error: "Senha incorreta" });

  // cria token JWT válido por 1 hora
  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1h" });

  res.json({ token }); // retorna token
}

module.exports = { register, login }; // exporta funções
