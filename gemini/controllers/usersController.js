const { readDB, writeDB } = require('../utils/db');
const bcrypt = require('bcryptjs');

// GET /users
const getAllUsers = (req, res) => {
    const db = readDB();
    // Retorna apenas dados não sensíveis
    const usersData = db.users.map(({ id, nome, email }) => ({ id, nome, email }));
    res.json(usersData);
};

// GET /users/:id
const getUserById = (req, res) => {
    const { id } = req.params;
    const db = readDB();

    const user = db.users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna apenas dados não sensíveis
    const { senha, ...userData } = user; 
    res.json(userData);
};

// PUT /users/:id
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    let db = readDB();
    const userIndex = db.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    
    // Verificação de autorização: o usuário logado (req.user.id) só pode atualizar a si mesmo
    if (req.user.id !== id) {
        return res.status(403).json({ message: 'Ação não autorizada.' });
    }

    // Prepara os dados para atualização
    let updatedData = {
        ...db.users[userIndex], // Mantém dados existentes
        nome: nome || db.users[userIndex].nome,
        email: email || db.users[userIndex].email,
    };

    try {
        // Se uma nova senha for fornecida, faz o hash
        if (senha) {
            const salt = await bcrypt.genSalt(10);
            updatedData.senha = await bcrypt.hash(senha, salt);
        }

        db.users[userIndex] = updatedData;
        writeDB(db);
        
        // Retorna a versão atualizada sem a senha
        const { senha: _, ...safeData } = updatedData;
        res.json({ message: 'Usuário atualizado com sucesso.', user: safeData });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// DELETE /users/:id
const deleteUser = (req, res) => {
    const { id } = req.params;
    let db = readDB();
    const initialLength = db.users.length;
    
    // Verificação de autorização: o usuário logado (req.user.id) só pode deletar a si mesmo
    if (req.user.id !== id) {
        return res.status(403).json({ message: 'Ação não autorizada.' });
    }

    // Filtra para remover o usuário com o ID correspondente
    db.users = db.users.filter(u => u.id !== id);

    if (db.users.length === initialLength) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    writeDB(db);
    res.status(200).json({ message: 'Usuário removido com sucesso.' });
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};