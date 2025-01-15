const RegistroDecisaoRepository = require("../repositories/registroDecisaoRepository");

class RegistroDecisaoService {
  constructor() {
    this.registroDecisaoRepository = new RegistroDecisaoRepository();
  }

  async createRegistroDecisao(data) {
    return await this.registroDecisaoRepository.create(data);
  }

  async getAllRegistrosDecisoes() {
    return await this.registroDecisaoRepository.findAll();
  }

  async getRegistroDecisaoById(id) {
    return await this.registroDecisaoRepository.findById(id);
  }

  async updateRegistroDecisao(id, data) {
    return await this.registroDecisaoRepository.update(id, data);
  }

  async deleteRegistroDecisao(id) {
    return await this.registroDecisaoRepository.delete(id);
  }
}

module.exports = RegistroDecisaoService;
