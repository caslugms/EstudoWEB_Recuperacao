const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // middleware para proteger rotas
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/usersController");

// listar todos usuários (protegida)
router.get("/", auth, getUsers);

// buscar usuário por id (protegida)
router.get("/:id", auth, getUserById);

// atualizar usuário (protegida)
router.put("/:id", auth, updateUser);

// deletar usuário (protegida)
router.delete("/:id", auth, deleteUser);

module.exports = router;
