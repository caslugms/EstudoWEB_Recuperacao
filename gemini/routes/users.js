const express = require('express');
const { 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../controllers/usersController');
const verifyToken = require('../middleware/auth');
const router = express.Router();

// Todas as rotas abaixo são protegidas pelo middleware verifyToken
router.use(verifyToken);

// GET /users
router.get('/', getAllUsers);

// GET /users/:id
router.get('/:id', getUserById);

// PUT /users/:id
router.put('/:id', updateUser);

// DELETE /users/:id
router.delete('/:id', deleteUser);

module.exports = router;