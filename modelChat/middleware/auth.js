const jwt = require("jsonwebtoken");
const secret = "segredo123";

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = auth;

//Função: proteger rotas, garantindo que só quem tiver token válido acesse.