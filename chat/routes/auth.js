const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// rota para cadastrar usuário
router.post("/register", register);

// rota para login
router.post("/login", login);

module.exports = router; // exporta as rotas
