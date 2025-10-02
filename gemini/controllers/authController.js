const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { readDB, writeDB } = require('../utils/db');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// POST /register
const register = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    const db = readDB();

    // 1. Verificar se o e-mail já está cadastrado
    const existingUser = db.users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    try {
        // 2. Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // 3. Criar novo usuário
        const newUser = {
            id: uuidv4(), // Gera um ID único
            nome,
            email,
            senha: hashedPassword // Armazena o hash
        };

        db.users.push(newUser);
        writeDB(db);

        // 4. Resposta de sucesso
        res.status(201).json({ 
            id: newUser.id,
            nome: newUser.nome,
            email: newUser.email,
            message: 'Usuário cadastrado com sucesso.' 
        });
    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// POST /login
const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const db = readDB();

    // 1. Encontrar o usuário pelo email
    const user = db.users.find(u => u.email === email);
    if (!user) {
        // Resposta genérica para evitar enumeração de usuários
        return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    try {
        // 2. Comparar a senha
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Gerar o JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload
            JWT_SECRET,
            { expiresIn: '1h' } // Expira em 1 hora, conforme solicitado
        );

        // 4. Resposta de sucesso com o token
        res.json({ 
            message: 'Autenticação bem-sucedida',
            token,
            user: { id: user.id, nome: user.nome, email: user.email }
        });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
    register,
    login
};