const { json } = require('express');
const express = require('express');
const router = express.Router();
const service = require('../service/services');

router.get('/questoes', async (req, res) => {
    // console.log('Questoes router');
    const questoes = await service.getQuestoes();
    return res.json(questoes);
})

router.get('/questoes/:dificuldade', async (req, res) => {
    // console.log('questoes router Dificuldade');
    const dificuldade = req.params.dificuldade;
    // console.log(req.params.dificuldade);
    const dificult = await service.getQuestoesDificult(dificuldade);
    return res.json(dificult);
});

router.get('/jogadores', async (req, res) => {
    // console.log('jogadores router');
    const jogadores = await service.getJogadores();
    return res.json(jogadores);
});

router.get('/jogadores/:id', async (req, res) => {
    // console.log('Jogadores router Id');
    const id = req.params.id;
    // console.log(req.params.id);
    const jogador = await service.getJogadoresById(id);
    // console.log(jogador);
    return res.json(jogador);
});

router.get('/jogadoresid/:equipe', async (req, res) => {
    // console.log('Jogadores Id equipe');
    const id = req.params.equipe
    const jogadores = await service.getJogadoresByIdEquipe(id);
    return res.json(jogadores);
})

router.get('/equipe/:id', async (req, res) => {
    // console.log('Equipe id');
    const id = req.params.id;
    // console.log(id);
    const equipe = await service.getEquipeById(id);
    // console.log(equipe);
    return res.json(equipe);
});

router.get('/equipe', async (req, res) => {
    // console.log('equipe router');
    const equipes = await service.getEquipes();
    return res.json(equipes);
})

module.exports = router;