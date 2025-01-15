const RegistroDecisaoService = require("../services/registroDecisaoService");

class RegistroDecisaoController {
  constructor() {
    this.registroDecisaoService = new RegistroDecisaoService();
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async create(req, res) {
    try {
      const registroDecisao =
        await this.registroDecisaoService.createRegistroDecisao(req.body);
      res.status(201).json(registroDecisao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const registrosDecisoes =
        await this.registroDecisaoService.getAllRegistrosDecisoes();
      res.status(200).json(registrosDecisoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const registroDecisao =
        await this.registroDecisaoService.getRegistroDecisaoById(req.params.id);
      if (!registroDecisao) {
        return res
          .status(404)
          .json({ error: "Registro de decisão não encontrado" });
      }
      res.status(200).json(registroDecisao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const registroDecisao =
        await this.registroDecisaoService.updateRegistroDecisao(
          req.params.id,
          req.body
        );
      res.status(200).json(registroDecisao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await this.registroDecisaoService.deleteRegistroDecisao(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RegistroDecisaoController();
