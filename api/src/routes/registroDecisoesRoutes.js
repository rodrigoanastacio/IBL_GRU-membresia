const express = require("express");
const RegistroDecisaoController = require("../controllers/registroDecisaoController");

const router = express.Router();

// Criar um novo registro de decisão
router.post("/registro-decisoes", RegistroDecisaoController.create);

// Listar todos os registros de decisão
router.get("/registro-decisoes", RegistroDecisaoController.getAll);

// Buscar um registro de decisão por ID
router.get("/registro-decisoes/:id", RegistroDecisaoController.getById);

// Atualizar um registro de decisão
router.put("/registro-decisoes/:id", RegistroDecisaoController.update);

// Excluir um registro de decisão
router.delete("/registro-decisoes/:id", RegistroDecisaoController.delete);

module.exports = router;
