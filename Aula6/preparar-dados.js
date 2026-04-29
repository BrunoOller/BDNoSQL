/**
 * PASSO 1: CONFIGURAÇÃO DO AMBIENTE
 * No MongoDB, antes de agregar, precisamos de dados consistentes.
 */

const db = db.getSiblingDB('aula_agregacao');

// Limpa a coleção para começar do zero
db.vendas.drop();

// Inserindo documentos de exemplo (Baseado na estrutura comum de documentos de vendas)
db.vendas.insertMany([
  { _id: 1, item: "Maçã", preco: 10, quantidade: 5, data: ISODate("2026-03-01T08:00:00Z") },
  { _id: 2, item: "Laranja", preco: 20, quantidade: 2, data: ISODate("2026-03-01T09:00:00Z") },
  { _id: 3, item: "Maçã", preco: 10, quantidade: 10, data: ISODate("2026-03-02T10:00:00Z") },
  { _id: 4, item: "Banana", preco: 5, quantidade: 20, data: ISODate("2026-03-02T11:00:00Z") },
  { _id: 5, item: "Laranja", preco: 20, quantidade: 10, data: ISODate("2026-03-03T12:00:00Z") }
]);

print("Dados de exemplo inseridos com sucesso!");