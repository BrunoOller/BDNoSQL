/**
 * PASSO 2: O PIPELINE DE AGREGAÇÃO
 * A agregação funciona como uma "esteira de fábrica" (Pipeline).
 * Cada estágio processa os documentos e passa o resultado para o próximo.
 */

const db = db.getSiblingDB('aula_agregacao');

// --- OPERAÇÃO 1: $match (O Filtro) ---
// É o equivalente ao WHERE do SQL. Filtra os documentos antes de processar.
print("--- Filtrando apenas Maçãs ---");
db.vendas.aggregate([
  { $match: { item: "Maçã" } }
]);

// --- OPERAÇÃO 2: $group (O Agrupamento) ---
// Agrupa documentos por uma chave específica (_id) e calcula métricas.
print("--- Total de vendas por Item ---");
db.vendas.aggregate([
  { 
    $group: { 
      _id: "$item",              // Agrupa pelo nome do item
      totalVendido: { $sum: "$quantidade" }, // Soma as quantidades
      precoMedio: { $avg: "$preco" }          // Calcula a média dos preços
    } 
  }
]);

// --- OPERAÇÃO 3: $project (Seleção de Campos) ---
// Decide quais campos aparecem no resultado e pode criar campos novos.
print("--- Calculando Valor Total por Venda ---");
db.vendas.aggregate([
  { 
    $project: { 
      _id: 0,                   // Oculta o ID original
      item: 1,                  // Mantém o nome do item
      faturamento: { $multiply: ["$preco", "$quantidade"] } // Cria campo novo (Preço * Qtd)
    } 
  }
]);

// --- OPERAÇÃO 4: $sort (Ordenação) ---
// Ordena os resultados (1 para ascendente, -1 para descendente).
print("--- Vendas ordenadas pela quantidade (Maior para menor) ---");
db.vendas.aggregate([
  { $sort: { quantidade: -1 } }
]);

// --- OPERAÇÃO 5: O PIPELINE COMPLETO (Combinando tudo) ---
// Exemplo: Filtrar itens com preço > 5, agrupar por item e ordenar pelo total.
print("--- Pipeline Completo: Filtro -> Grupo -> Ordenação ---");
db.vendas.aggregate([
  { $match: { preco: { $gt: 5 } } }, // Apenas itens caros
  { $group: { _id: "$item", faturamentoTotal: { $sum: { $multiply: ["$preco", "$quantidade"] } } } },
  { $sort: { faturamentoTotal: -1 } }
]);

// Guia de Estudo: Como entender e aplicar em outros exercícios
// Para que você consiga aplicar essa lógica em qualquer PDF ou exercício similar, memorize esta ordem de raciocínio:

// Entenda o Fluxo (Pipeline): Visualize a agregação como um funil. Você começa com muitos dados e vai filtrando e transformando até chegar na resposta final.


// A Chave _id no $group: Sempre que o exercício pedir "Por cidade", "Por sexo" ou "Por modelo", esse campo deve ser o seu _id dentro do bloco $group.  

// Operadores de Acumulação:

// $sum: Para contar ou somar valores.

// $avg: Para tirar médias (notas, preços).

// $max / $min: Para achar o maior ou menor valor.

// Cuidado com a Sintaxe: No MongoDB, campos existentes sempre começam com $ (ex: "$preco"), enquanto os nomes das operações começam com $ na frente (ex: $match).