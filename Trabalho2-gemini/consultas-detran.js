/**
 * ARQUIVO: consultas_detran.js
 * EXPLICAÇÃO: $group cria o agrupamento, $sum conta, e $sort ordena.
 */

const db = db.getSiblingDB('detran_exercicio');

// 1) Qual modelo de carro tem mais multas?
// Passo: Agrupar pelo nome do modelo e somar 1 para cada ocorrência.
db.multas.aggregate([
  { $group: { _id: "$veiculo.modelo", totalMultas: { $sum: 1 } } },
  { $sort: { totalMultas: -1 } }, // -1 é ordem decrescente
  { $limit: 1 } // Pega apenas o primeiro (o maior)
]);

// 4) Qual mês do ano tem mais multas?
// Passo: Usamos $project para extrair o mês do objeto de data antes de agrupar.
db.multas.aggregate([
  { $project: { mes: { $month: "$data" } } },
  { $group: { _id: "$mes", total: { $sum: 1 } } },
  { $sort: { total: -1 } },
  { $limit: 1 }
]);

// 8) Qual marca de carro os homens preferem?
// Passo: $match funciona como um filtro (WHERE) antes de processar o resto.
db.multas.aggregate([
  { $match: { "veiculo.proprietario.sexo": "Masculino" } },
  { $group: { _id: "$veiculo.marca", contagem: { $sum: 1 } } },
  { $sort: { contagem: -1 } },
  { $limit: 1 }
]);

// 10) Ranking dos veículos mais multados, decrescente.
// Passo: Agrupar por placa para identificar o veículo único.
db.multas.aggregate([
  { $group: { 
      _id: "$veiculo.placa", 
      modelo: { $first: "$veiculo.modelo" }, // Pega o nome do modelo para o relatório
      total: { $sum: 1 } 
    } 
  },
  { $sort: { total: -1 } }
]);

// Como reproduzir em outros exercícios (Guia de Bolso)
// Se você receber um novo PDF com um DER diferente, siga este Checklist:

// 1. Identifique o "Fato": No Detran, o fato é a multa. Em uma loja, é a venda. Essa será sua Coleção Principal.

// 2. Traga o Contexto: Não salve apenas o id_veiculo. Salve o objeto veiculo: { placa: "...", cor: "..." }. Isso evita que você tenha que fazer buscas em várias coleções (o MongoDB odeia isso).

// 3. Use as Datas Corretamente: Sempre use ISODate("AAAA-MM-DD"). Isso permite que você use operadores como $month, $year ou $dayOfWeek em suas consultas.

// 4. A Lógica do Pipeline: Mentalize o aggregate como um funil:
// - Filtre o que não quer ($match).
// - Extraia partes dos dados se necessário ($project).
// - Agrupe e conte ($group).
// - Ordene para ver quem ganhou ($sort).