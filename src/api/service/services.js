const data = require('../data/datas');

exports.getQuestoes = async () => {
    console.log('Questoes Service');
    return await data.getQuestoes();
}

exports.getQuestoesDificult = async (dificuldade) => {
    console.log('Questões Service dificuldade');
    return await data.getQuestoesDificult(dificuldade);
}

exports.getJogadores = async () => {
    console.log('Jogadores service');
    return await data.getJogadores();
}

exports.getJogadoresById = async (id) => {
    console.log('Jogador Service Id');
    return await data.getJogadoresById(id);
}

exports.getEquipeById = async (id) => {
    console.log('Equipe service by id');
    return await data.getEquipeById(id);
}