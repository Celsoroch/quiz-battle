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

exports.getEquipeById = async (id) => {
    console.log('Equipes id');
    return await database.oneOrNone(`select nome_equipe from equipes where id_equipe::text = '${id}'`);
}