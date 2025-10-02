const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    // Tenta obter o token do cabeçalho 'Authorization'
    const authHeader = req.headers['authorization'];
    // O formato esperado é 'Bearer <token>'
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token, JWT_SECRET);
        // Adiciona os dados do usuário (payload do JWT) ao objeto request
        req.user = decoded; 
        next(); // Continua para o próximo middleware ou controller
    } catch (error) {
        console.error("Erro na verificação do token:", error);
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = verifyToken;