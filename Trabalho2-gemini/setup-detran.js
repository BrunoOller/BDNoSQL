/**
 * ARQUIVO: setup_detran.js
 * OBJETIVO: Criar o banco e popular com dados desnormalizados.
 */

// Para converter um modelo relacional (DER) para o MongoDB, o segredo é a Desnormalização: em vez de espalhar os dados em 12 tabelas diferentes , nós juntamos as informações relacionadas em um único documento "rico" para que a leitura seja rápida.

// 1. Definir o banco de dados
const db = db.getSiblingDB('detran_exercicio');

// 2. Limpar a coleção para evitar duplicatas ao rodar o script várias vezes
db.multas.drop();

// 3. Inserção de dados (Transformando o DER em Documentos)
// Note que embutimos 'veiculo', 'agente' e 'proprietario' dentro da multa.
db.multas.insertMany([
    {
        _id: 1,
        agente: { matricula: "789", nome: "Toin", contrato: "CLT" }, // Dados do Agente [cite: 100]
        veiculo: {
            placa: "EVA4960", // [cite: 112]
            modelo: "Polo",
            marca: "Volkswagen", // [cite: 105, 108]
            cor: "Branco",
            proprietario: {
                nome: "Prof. Tiago",
                cpf: "12345678910",
                sexo: "Masculino" // [cite: 94, 110]
            }
        },
        infracao: {
            descricao: "Avançar o sinal vermelho ou parada obrigatória", // [cite: 103]
            valor: 293.47,
            pontos: 7
        },
        cidade: "Guaxupé", // [cite: 96, 116]
        estado: "MG",
        data: ISODate("2018-12-30T00:22:00Z"),
        local: "Praça do Centro"
    },
    {
        _id: 2,
        agente: { matricula: "123", nome: "Jão", contrato: "CLT" }, // [cite: 98]
        veiculo: {
            placa: "EVA4960",
            modelo: "Polo",
            marca: "Volkswagen",
            cor: "Branco",
            proprietario: { nome: "Prof. Tiago", sexo: "Masculino" }
        },
        infracao: {
            descricao: "Falta do cinto de segurança", // [cite: 104, 117]
            valor: 195.32,
            pontos: 5
        },
        cidade: "Cajuru",
        estado: "SP",
        data: ISODate("2018-12-31T08:15:00Z"),
        local: "Avenida do rio"
    },
    {
        _id: 3,
        agente: { matricula: "123", nome: "Jão", contrato: "CLT" },
        veiculo: {
            placa: "BLD7764", // [cite: 113]
            modelo: "Fusca",
            marca: "Volkswagen",
            cor: "Branco",
            proprietario: { nome: "Joazim", sexo: "Masculino" } // [cite: 123]
        },
        infracao: {
            descricao: "Transitar em velocidade superior à máxima em até 20%", // [cite: 102]
            valor: 85.15,
            pontos: 5
        },
        cidade: "Mococa",
        estado: "SP",
        data: ISODate("2019-02-28T00:22:00Z"),
        local: "Rua"
    }
    // DICA: Para exercícios parecidos, sempre identifique a entidade principal 
    // (no caso 'multa') e traga os IDs das outras tabelas como objetos internos.
]);

print("Banco Detran populado com sucesso!");