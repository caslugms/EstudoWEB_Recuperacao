const { readDB, writeDB } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

// Listar todos
function getAll(req, res) {
  const db = readDB();
  res.json(db.entities);
}

// Buscar por ID
function getById(req, res) {
  const db = readDB();
  const entity = db.entities.find(e => e.id === req.params.id);
  if (!entity) return res.status(404).json({ error: "Não encontrado" });
  res.json(entity);
}

// Criar novo
function create(req, res) {
  const db = readDB();
  const newEntity = { id: uuidv4(), ...req.body };
  db.entities.push(newEntity);
  writeDB(db);
  res.status(201).json({ message: "Criado com sucesso", newEntity });
}

// Atualizar
function update(req, res) {
  const db = readDB();
  const entity = db.entities.find(e => e.id === req.params.id);
  if (!entity) return res.status(404).json({ error: "Não encontrado" });

  Object.assign(entity, req.body); // atualiza com novos campos
  writeDB(db);
  res.json({ message: "Atualizado com sucesso", entity });
}

// Deletar
function remove(req, res) {
  const db = readDB();
  const index = db.entities.findIndex(e => e.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Não encontrado" });

  db.entities.splice(index, 1);
  writeDB(db);
  res.json({ message: "Removido com sucesso" });
}

module.exports = { getAll, getById, create, update, remove };
