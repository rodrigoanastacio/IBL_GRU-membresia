const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RegistroDecisaoRepository {
  async create(data) {
    return await prisma.registroDecisao.create({
      data: {
        nome: data.nome,
        telefone: data.telefone,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        desejo: data.desejo,
        idade: data.idade,
      },
    });
  }

  async findAll() {
    return await prisma.registroDecisao.findMany();
  }

  async findById(id) {
    return await prisma.registroDecisao.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.registroDecisao.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.registroDecisao.delete({
      where: { id },
    });
  }
}

module.exports = RegistroDecisaoRepository;
