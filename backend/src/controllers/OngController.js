// importar o metodo crypto que vem junto do nodejs
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  // Listar os dados de uma tabela.
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  // Criar os dados de usuario no banco de dados.
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    // Gerar um numero aleatório e tansformar lhe em Hexadecimal.
    const id = crypto.randomBytes(4).toString('HEX');

    // Inserindo os dados no banco de dados.
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id });
  }
}