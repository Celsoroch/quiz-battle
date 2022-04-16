import './assets/css/styles.css';
const questoes = require('./modules/questoes');
const equipes = require('./modules/equipes');
const startTime = require('./modules/timer');

// PERGUNTA
let pergunta   = document.querySelector('#pergunta');

// ALTERNATIVAS
let a = document.querySelector('#a');
let b = document.querySelector('#b');
let c = document.querySelector('#c');
let d = document.querySelector('#d');

// número 
let numero = document.querySelector('#numero');

// Coloca um numero "1" de 7
const q0 = questoes[0];
numero.textContent = q0.numQuestao;
pergunta.textContent = q0.pergunta;
a.textContent = q0.alternativaA;
b.textContent = q0.alternativaB;
c.textContent = q0.alternativaC;
d.textContent = q0.alternativaD;
