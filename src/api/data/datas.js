const { async } = require('regenerator-runtime');
const database = require('../infra/database');

exports.getQuestoes = async () => {
    console.log('Questões Data');
    return await database.query('select * from questoes');
}

exports.getQuestoesDificult = async (dificuldade) => {
    console.log('Questões Data Dificuldade');
    return await database.query(`select * from questoes where dificuldade = '${dificuldade}'`);
};

exports.getJogadores = async () => {
    console.log('Jogadores Data');
    return await database.query('select * from jogadores');
}

exports.getJogadoresById = async (id) => {
    console.log('Jogadores Data By Id');
    // Retorna apenas o selecionado
    return await database.oneOrNone(`select * from jogadores where id_jog::text = '${id}'`);
}

exports.getJogadoresByIdEquipe = async (id) => {
    console.log('id = ' + id);
    console.log('Jogadores by id equipe');
    return await database.query(`select * from jogadores where id_equipe::text = '${id}'`)
}

exports.getEquipeById = async (id) => {
    console.log('Equipes data id');
    return await database.oneOrNone(`select * from equipes where id_equipe::text = '${id}'`);
}

exports.getEquipes = async () => {
    console.log('Equipe data');
    return await database.query(`select * from equipes`);
}