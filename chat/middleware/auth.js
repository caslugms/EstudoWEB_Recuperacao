const jwt = require("jsonwebtoken"); // módulo para trabalhar com tokens JWT
const secret = "segredo123"; // chave secreta para criar/verificar tokens

// middleware que protege rotas
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // pega o token do header
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN", então pega só o token
  try {
    const decoded = jwt.verify(token, secret); // verifica se o token é válido
    req.user = decoded; // adiciona os dados do usuário à requisição
    next(); // permite acessar a rota
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = authMiddleware; // exporta middleware
