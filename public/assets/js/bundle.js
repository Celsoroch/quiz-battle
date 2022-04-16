/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/jogador.js":
/*!********************************!*\
  !*** ./src/modules/jogador.js ***!
  \********************************/
/***/ ((module) => {

// Jogadores
var j1 = {
  id: "1N33",
  nome: "Neymar",
  sobreome: "Júnior",
  email: "neyjunior@gmail.com",
  idade: "33"
};
var j2 = {
  id: "1M35",
  nome: "Messi",
  sobreome: "Lionel",
  email: "messiLio@gmail.com",
  idade: "35"
};
var jogadores = [];
jogadores.push(j1);
jogadores.push(j2);
module.exports = jogadores;

/***/ }),

/***/ "./src/modules/questoes.js":
/*!*********************************!*\
  !*** ./src/modules/questoes.js ***!
  \*********************************/
/***/ ((module) => {

// Questões
var q0 = {
  numQuestao: 0,
  pergunta: "Pergunta",
  alternativaA: "Alternativa A",
  alternativaB: "Alternativa B",
  alternativaC: "Alternativa C",
  alternativaD: "Alternativa D",
  correta: "0"
};
var q1 = {
  numQuestao: 1,
  pergunta: "Qual filósofo grego pediu que Alexandre, o Grande, saísse da frente do sol, quando questionado sobre qual era o seu maior desejo?",
  alternativaA: "Epicuro",
  alternativaB: "Diógenes",
  alternativaC: "Epiteto",
  alternativaD: "Sócrates",
  correta: "Diógenes"
};
var q2 = {
  numQuestao: 2,
  pergunta: "Quem foi o Ultímo presidente antes do Golpe Militar de 1964?",
  alternativaA: "Jânio Quadros",
  alternativaB: "Jacinto Anjos",
  alternativaC: "Getúlio Vargas",
  alternativaD: "João Goulart",
  correta: "João Goulart"
};
var q3 = {
  numQuestao: 3,
  pergunta: "Quem é o autor de “O Príncipe”?",
  alternativaA: "Maquiavel",
  alternativaB: "Antoine de Saint-Exupéry",
  alternativaC: "Montesquieu",
  alternativaD: "Thomas Hobbes",
  correta: "Maquiavel"
};
var q4 = {
  numQuestao: 4,
  pergunta: "Quem foi o Autor(a) de Frankenstein?",
  alternativaA: "H.P Lovecratf",
  alternativaB: "Mary Ann Shelly",
  alternativaC: "Bram Stoker",
  alternativaD: "Ian Fleming",
  correta: "Mary Ann Shelly"
};
var q5 = {
  numQuestao: 5,
  pergunta: "Em que ano terminou a Primeira Guerra Mundial?",
  alternativaA: "1917",
  alternativaB: "1915",
  alternativaC: "1920",
  alternativaD: "1914",
  correta: "1914"
};
var q6 = {
  numQuestao: 6,
  pergunta: "Quem pintou Noite Estrelada?",
  alternativaA: "Leonardo da Vinci",
  alternativaB: "Pablo Picasso",
  alternativaC: "Van Gogh",
  alternativaD: "Tarsila do Amaral",
  correta: "Van Gogh"
};
var q7 = {
  numQuestao: 7,
  pergunta: "Júpiter e Plutão são os correlatos romanos de quais deuses gregos?",
  alternativaA: "Ares e Hermes",
  alternativaB: "Cronos e Apolo",
  alternativaC: "Zeus e Hades",
  alternativaD: "Dionísio e Deméter",
  correta: "Zeus e Hades"
};
var questoes = [q0, q1, q2, q3, q4, q5, q6, q7];
module.exports = questoes;

/***/ }),

/***/ "./src/modules/timer.js":
/*!******************************!*\
  !*** ./src/modules/timer.js ***!
  \******************************/
/***/ ((module) => {

var time_sec = document.querySelector('#time_sec');
var ss = 15;
var tempo = 1000;
var cron;

function start() {
  cron = setInterval(function () {
    timer();
  }, tempo);
}

function pause() {
  clearInterval(cron);
}

function stop() {
  clearInterval(cron);
}

function timer() {
  ss--;

  if (ss === 0) {
    stop();
    console.log('Acabou!');
  }

  ;
  var format = "".concat(ss);
  time_sec.textContent = format;
}

module.exports = start;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/styles.css":
/*!*************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/assets/css/styles.css ***!
  \*************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n\r\n    /*CORES A SEREM ADICIONADAS*/\r\n    --fundo-color: #4B80F2;\r\n    --contador-color: #4EB4FC;\r\n    --equipes-color: #52D0E6;\r\n    --equipePRINC-color: #4EFCE8;\r\n    --respost-color: #4BF2AF;\r\n    --respostMOUSE-color: #4B80F2;\r\n    --contorno-color: #03ff9e;\r\n\r\n    /*GRADUAÇÃO DE CORES*/\r\n    --gradual-color: linear-gradient(-40deg, #a3e0d6, #168897, #e56df5, #00ffaa);\r\n    --gradualEQUIPE-color: linear-gradient(-40deg,  #00ffaa, #e56df5, #1aecf3, #1a52ee);\r\n\r\n    /*ADICIONAR FONTES PARA TEXTO*/\r\n\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-size: 1.25rem;   \r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    min-height: 100vh;\r\n    background: var(--gradual-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 20s ease infinite;\r\n    color: #fff;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\nmain {\r\n    flex-grow: 3;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    width: 80%;\r\n    padding: 50px; /* espacamento interno */\r\n}\r\n\r\nsection {\r\n    width: 100%;\r\n    margin: 0 auto;\r\n    height: 700px;\r\n    padding: 1rem;\r\n    margin-bottom: 0.625rem;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    position: relative;\r\n    text-align: center;\r\n    font-size: 1.75rem;\r\n    margin: 0.625rem;\r\n}\r\n\r\n.centro {\r\n    text-align: center;\r\n}\r\n\r\n.questao {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n#numQuestao {\r\n    display: block;\r\n    background: #00b0ff;\r\n    padding: 4px 10px 2px 10px;\r\n    border-radius: 50%;\r\n}\r\n\r\n#pergunta {\r\n    margin-left: 1rem;\r\n}\r\n\r\n.questoes {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 10px 5px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    margin-bottom: 20px;\r\n    min-width: 60%;\r\n    max-width: 90%;\r\n    background: #4B80F2;\r\n}\r\n\r\n.questoes ol li {\r\n    display: block;\r\n    margin: 1rem;\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n}\r\n\r\n.questoes ol li:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.bloqueado {\r\n    display: none;\r\n}\r\n\r\n.bloqueado li:hover {\r\n    display: none;\r\n}\r\n\r\n#instrucoes {\r\n    background: rgb(8, 211, 126);\r\n    color: #191919;\r\n    padding: 0.625rem;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-bottom: 1rem;\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n#aviso {\r\n    color: #600872;\r\n}\r\n\r\n.botao{\r\n    color: whitesmoke;\r\n    background: #045c85;\r\n    height: 50px;\r\n    margin-top: 5px;\r\n}\r\n\r\n.botao:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.pontos_1, .pontos_2 {\r\n    color:#00b0ff;\r\n    background-color: #ffffff;\r\n    margin-top: 0px;\r\n}\r\n\r\n/* ANIMACAO */\r\n\r\n/* Animar o input */\r\n@keyframes piscar {\r\n    0% {\r\n        filter: drop-shadow(0 0 20px #00b0ff);\r\n        -webkit-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -moz-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -o-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -ms-filter: drop-shadow(0 0 20px #00b0ff);\r\n    }\r\n    100% {\r\n    }\r\n}\r\n\r\n.animar {\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n.aparecer {\r\n    animation: aparecer .5s infinite alternate;\r\n}\r\n\r\n@keyframes aparecer {\r\n    0% {\r\n        opacity: 0\r\n    }\r\n    100% {\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n.timer {\r\n    display: flex;\r\n    background: #00b0ff;\r\n    padding: 0.45rem;\r\n    border-radius: 50%;\r\n    margin-bottom: 10px;\r\n}\r\n/* TELA DAS TABELAS */\r\n.box_equipes {\r\n    display: flex;\r\n    flex-direction: column;        \r\n}\r\n/* TELA DA TABELA */\r\n.equipes {\r\n    position: relative;\r\n    top: 22%;\r\n    padding: 25px 28px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    right: 30px;\r\n    max-width: 100%;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 15s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\n.tabelas {\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE/BOTAO  */\r\n.equipe_botao {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-self: flex-start;\r\n    top: 30%;\r\n    left: 15%;\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE  */\r\n.box_Tela-Usuario {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 5px 10px;\r\n    border: 2px solid var(--contorno-color);\r\n    border-radius: 10rem;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 12s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n/* botao*/\r\n.players {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n.jogador2 {\r\n    margin-left: 30%;\r\n}\r\n\r\n.botao {\r\n    border-radius: 10rem;\r\n    padding: 10px;\r\n}\r\n\r\n.jog_equipe {\r\n    padding-left: 15px;\r\n    padding-right: 5px;\r\n}", "",{"version":3,"sources":["webpack://./src/assets/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');\r\n\r\n:root {\r\n\r\n    /*CORES A SEREM ADICIONADAS*/\r\n    --fundo-color: #4B80F2;\r\n    --contador-color: #4EB4FC;\r\n    --equipes-color: #52D0E6;\r\n    --equipePRINC-color: #4EFCE8;\r\n    --respost-color: #4BF2AF;\r\n    --respostMOUSE-color: #4B80F2;\r\n    --contorno-color: #03ff9e;\r\n\r\n    /*GRADUAÇÃO DE CORES*/\r\n    --gradual-color: linear-gradient(-40deg, #a3e0d6, #168897, #e56df5, #00ffaa);\r\n    --gradualEQUIPE-color: linear-gradient(-40deg,  #00ffaa, #e56df5, #1aecf3, #1a52ee);\r\n\r\n    /*ADICIONAR FONTES PARA TEXTO*/\r\n\r\n}\r\n\r\n* {\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-size: 1.25rem;   \r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n    min-height: 100vh;\r\n    background: var(--gradual-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 20s ease infinite;\r\n    color: #fff;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\nmain {\r\n    flex-grow: 3;\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: center;\r\n    width: 80%;\r\n    padding: 50px; /* espacamento interno */\r\n}\r\n\r\nsection {\r\n    width: 100%;\r\n    margin: 0 auto;\r\n    height: 700px;\r\n    padding: 1rem;\r\n    margin-bottom: 0.625rem;\r\n    display: flex;\r\n    flex-direction: column;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n\r\nh1 {\r\n    position: relative;\r\n    text-align: center;\r\n    font-size: 1.75rem;\r\n    margin: 0.625rem;\r\n}\r\n\r\n.centro {\r\n    text-align: center;\r\n}\r\n\r\n.questao {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n#numQuestao {\r\n    display: block;\r\n    background: #00b0ff;\r\n    padding: 4px 10px 2px 10px;\r\n    border-radius: 50%;\r\n}\r\n\r\n#pergunta {\r\n    margin-left: 1rem;\r\n}\r\n\r\n.questoes {\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 10px 5px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    margin-bottom: 20px;\r\n    min-width: 60%;\r\n    max-width: 90%;\r\n    background: #4B80F2;\r\n}\r\n\r\n.questoes ol li {\r\n    display: block;\r\n    margin: 1rem;\r\n    padding: 1rem;\r\n    border-radius: 8px;\r\n}\r\n\r\n.questoes ol li:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.bloqueado {\r\n    display: none;\r\n}\r\n\r\n.bloqueado li:hover {\r\n    display: none;\r\n}\r\n\r\n#instrucoes {\r\n    background: rgb(8, 211, 126);\r\n    color: #191919;\r\n    padding: 0.625rem;\r\n    border-radius: 8px;\r\n    display: flex;\r\n    justify-content: center;\r\n    margin-bottom: 1rem;\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n#aviso {\r\n    color: #600872;\r\n}\r\n\r\n.botao{\r\n    color: whitesmoke;\r\n    background: #045c85;\r\n    height: 50px;\r\n    margin-top: 5px;\r\n}\r\n\r\n.botao:hover {\r\n    background: #00b0ff;\r\n    cursor: pointer;\r\n}\r\n\r\n.pontos_1, .pontos_2 {\r\n    color:#00b0ff;\r\n    background-color: #ffffff;\r\n    margin-top: 0px;\r\n}\r\n\r\n/* ANIMACAO */\r\n\r\n/* Animar o input */\r\n@keyframes piscar {\r\n    0% {\r\n        filter: drop-shadow(0 0 20px #00b0ff);\r\n        -webkit-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -moz-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -o-filter: drop-shadow(0 0 20px #00b0ff);\r\n        -ms-filter: drop-shadow(0 0 20px #00b0ff);\r\n    }\r\n    100% {\r\n    }\r\n}\r\n\r\n.animar {\r\n    animation: piscar .75s infinite alternate;\r\n}\r\n\r\n.aparecer {\r\n    animation: aparecer .5s infinite alternate;\r\n}\r\n\r\n@keyframes aparecer {\r\n    0% {\r\n        opacity: 0\r\n    }\r\n    100% {\r\n        opacity: 1\r\n    }\r\n}\r\n\r\n.timer {\r\n    display: flex;\r\n    background: #00b0ff;\r\n    padding: 0.45rem;\r\n    border-radius: 50%;\r\n    margin-bottom: 10px;\r\n}\r\n/* TELA DAS TABELAS */\r\n.box_equipes {\r\n    display: flex;\r\n    flex-direction: column;        \r\n}\r\n/* TELA DA TABELA */\r\n.equipes {\r\n    position: relative;\r\n    top: 22%;\r\n    padding: 25px 28px;\r\n    border: 3px solid var(--contorno-color);\r\n    border-radius: 5px;\r\n    right: 30px;\r\n    max-width: 100%;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 15s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n\r\n.tabelas {\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE/BOTAO  */\r\n.equipe_botao {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-self: flex-start;\r\n    top: 30%;\r\n    left: 15%;\r\n    text-align: center;\r\n}\r\n/* TELA DO USUARIO COM SUA EQUIPE  */\r\n.box_Tela-Usuario {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    padding: 5px 10px;\r\n    border: 2px solid var(--contorno-color);\r\n    border-radius: 10rem;\r\n    background: var(--gradualEQUIPE-color);\r\n    background-size: 800% 100%;\r\n    animation: colors 12s ease infinite;\r\n}\r\n\r\n@keyframes colors {\r\n    0% {\r\n        background-position: 0% 50%;\r\n    }\r\n    25% {\r\n        background-position: 50% 0%;\r\n    }\r\n    50% {\r\n        background-position: 100% 50%;\r\n    }\r\n    75% {\r\n        background-position: 50% 0%;\r\n    }\r\n    100% {\r\n        background-position: 0% 50%;\r\n    }\r\n}\r\n/* botao*/\r\n.players {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n.jogador2 {\r\n    margin-left: 30%;\r\n}\r\n\r\n.botao {\r\n    border-radius: 10rem;\r\n    padding: 10px;\r\n}\r\n\r\n.jog_equipe {\r\n    padding-left: 15px;\r\n    padding-right: 5px;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/assets/css/styles.css":
/*!***********************************!*\
  !*** ./src/assets/css/styles.css ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/assets/css/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/css/styles.css */ "./src/assets/css/styles.css");


var questoes = __webpack_require__(/*! ./modules/questoes */ "./src/modules/questoes.js");

var jogadores = __webpack_require__(/*! ./modules/jogador */ "./src/modules/jogador.js");

var startTime = __webpack_require__(/*! ./modules/timer */ "./src/modules/timer.js");

var instrucoes = document.querySelector('#instrucoes');
var aviso = document.querySelector('#aviso'); // PERGUNTA

var numQuestao = document.querySelector('#numQuestao');
var pergunta = document.querySelector('#pergunta'); // ALTERNATIVAS

var a = document.querySelector('#a');
var b = document.querySelector('#b');
var c = document.querySelector('#c');
var d = document.querySelector('#d'); // article com a class questoes

var articleQuestoes = document.querySelector('.questoes'); // Jogadores

var divJogador1 = document.querySelector('.jogador1');
var jogador1 = document.querySelector('.nome_jogador_1');
var divJogador2 = document.querySelector('.jogador2');
var jogador2 = document.querySelector('.nome_jogador_2'); // Botão jogadores

var botao_j1 = document.querySelector('.botao_j1');
var botao_j2 = document.querySelector('.botao_j2'); // Seta respostas

var respostaA = document.querySelector('.respostaA');
var respostaB = document.querySelector('.respostaB');
var respostaC = document.querySelector('.respostaC');
var respostaD = document.querySelector('.respostaD'); // Configura respostas

var jaClicouPraJogar = false;
respostaA.addEventListener('click', function () {
  var nQuestao = a;
  var resposta = a;
  chamaAcertou(nQuestao, resposta);
});
respostaB.addEventListener('click', function () {
  var nQuestao = b;
  var resposta = b;
  chamaAcertou(nQuestao, resposta);
});
respostaC.addEventListener('click', function () {
  var nQuestao = c;
  var resposta = c;
  chamaAcertou(nQuestao, resposta);
});
respostaD.addEventListener('click', function () {
  var nQuestao = d;
  var resposta = d;
  chamaAcertou(nQuestao, resposta);
}); // configura botões

var clicou = ''; // // 1
// botao_j1.addEventListener('click', () => {
//     // configEquipe_1();
//     instrucoes.textContent = `${jogador1.textContent} joga!`;
//     clicou = 'jogador1';
//     botao_j2.disabled = true;
//     clicouPrajogar = true;
// });

botao_j1.addEventListener('click', function () {
  console.log('clicou'); // config(5);

  startTime();
}); // // 2

botao_j2.addEventListener('click', function () {
  // configEquipe_1();
  instrucoes.textContent = "".concat(jogador2.textContent, " joga!");
  clicou = 'jogador2';
  botao_j1.disabled = true;
  clicouPrajogar = true;
}); // Pontos jogadores

var pontos_j1 = document.querySelector('.pontos_1');
var pontos_j1_num = 0;
var pontos_j2 = document.querySelector('.pontos_2');
var pontos_j2_num = 0; // número 

var numero = document.querySelector('#numero'); // total

var total = document.querySelector('#total'); // Coloca um numero "1" de 7

var q0 = questoes[0];
numero.textContent = q0.numQuestao; // Coloca o número 1 de "7"

var totalDeQuestoes = questoes.length - 1;
console.log("Total de questões " + totalDeQuestoes);
total.textContent = totalDeQuestoes; // Monta o jogador1

var j1 = jogadores[0]; // jogador1.textContent = j1.nome;
// pontos_j1.textContent = 'Pontos: ' + pontos_j1_num;

var j2 = jogadores[1]; // jogador2.textContent = j2.nome;
// pontos_j2.textContent = 'Pontos: ' + pontos_j2_num;
// MONTAR A 1a QUESTAO COMPLETA, para iniciar o Quiz
// // Coloca o número da questão em azul

var q1 = questoes[1];
numQuestao.textContent = q1.numQuestao; // // Coloca o parametro da questão 

pergunta.textContent = q1.pergunta; // // Coloca o texto das alternativas

a.textContent = q1.alternativaA;
b.textContent = q1.alternativaB;
c.textContent = q1.alternativaC;
d.textContent = q1.alternativaD; // CONFIGURAR O VALUE INICIAL DA 1a QUESTAO COMPLETA

a.setAttribute('value', '1A');
b.setAttribute('value', '1B');
c.setAttribute('value', '1C');
d.setAttribute('value', '1D'); // PARA MONTAR AS PROXIMAS QUESTOES

function proximaQuestao(nQuestao) {
  // Abilita o clicou para jogar
  clicouPrajogar = false; // Abilita os botões

  botao_j1.disabled = false;
  botao_j2.disabled = false; // ja cliclou

  jaClicouPraJogar = false; // coloca o número

  numero.textContent = nQuestao; // Coloca o número da questão em azul

  numQuestao.textContent = questoes[nQuestao].numQuestao; // Coloca o parametro da questão

  pergunta.textContent = questoes[nQuestao].pergunta; // Coloca o texto das alternativas

  a.textContent = questoes[nQuestao].alternativaA;
  b.textContent = questoes[nQuestao].alternativaB;
  c.textContent = questoes[nQuestao].alternativaC;
  d.textContent = questoes[nQuestao].alternativaD; // Configura o value da questão

  a.setAttribute('value', nQuestao + 'A');
  b.setAttribute('value', nQuestao + 'B');
  c.setAttribute('value', nQuestao + 'C');
  d.setAttribute('value', nQuestao + 'D');
}

; // Verifica se já foi escolhida a resposta certa

function chamaAcertou(nQuestao, resposta) {
  if (jaClicouPraJogar === false) {
    verificarSeAcertou(nQuestao, resposta);
  } else {
    alert('Você não pode clicar de novo!');
  }

  ;
}

; // Verifica se acertou a resposta

var clicouPrajogar = false;

function verificarSeAcertou(nQuestao, resposta) {
  if (clicouPrajogar === true) {
    jaClicouPraJogar = true;
    var numeroDaQuestao = nQuestao.value;
    console.log("Questão " + numeroDaQuestao); // Pega resposta escolhida

    var respostaEscolhida = resposta.textContent; // Pega resposta certa

    var certa = questoes[numeroDaQuestao].correta;

    if (respostaEscolhida == certa) {
      if (clicou === 'jogador1') {
        pontos_j1_num += 10;
        pontos_j1.textContent = 'Pontos: ' + pontos_j1_num;
        console.log('Pontos jogador 1 ' + pontos_j1_num);
      }

      ;

      if (clicou === 'jogador2') {
        pontos_j2_num += 10;
        pontos_j2.textContent = 'Pontos: ' + pontos_j2_num;
        console.log('Pontos jogador 2 ' + pontos_j2_num);
      }

      ;
      instrucoes.textContent = 'Acertou! Parabéns!';
      setTimeout(function () {
        instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
      }, 5000);
    } else {
      instrucoes.textContent = 'Errou, preste mais atenção!';
      setTimeout(function () {
        instrucoes.textContent = "Leia a quest\xE3o e clique na resposta correta";
      }, 5000);
    }

    ;
    setTimeout(function () {
      var proxima = numeroDaQuestao + 1;

      if (proxima > totalDeQuestoes) {
        console.log('Fim do Jogo!');
        fimDoJogo();
      } else {
        proximaQuestao(proxima);
      }

      ;
    }, 5000);
  } else {
    alert('Calma!!, quem clicar primeiro joga!');
  }

  ;
}

;

function fimDoJogo() {
  instrucoes.textContent = "Fim de Jogo!";
  numQuestao.textContent = "";

  if (pontos_j1_num > pontos_j2_num) {
    var pont = '';
    pontos_j1_num === 0 ? pont = 'ponto' : pont = 'pontos';
    var avisoFinal = "\n            Parab\xE9ns ".concat(j1.nome, "\n\n            Voc\xEA conseguiu ").concat(pontos_j1_num, " ").concat(pont, "\n        ");
    aviso.textContent = avisoFinal;
  }

  ;

  if (pontos_j2_num > pontos_j1_num) {
    var _pont = '';
    pontos_j2_num === 0 ? _pont = 'ponto' : _pont = 'pontos';

    var _avisoFinal = "\n            Parab\xE9ns ".concat(j2.nome, "\n\n            Voc\xEA conseguiu ").concat(pontos_j2_num, " ").concat(_pont, "\n        ");

    aviso.textContent = _avisoFinal;
  }

  ;

  if (pontos_j1_num === pontos_j2_num) {
    var _avisoFinal2 = "\n            Parab\xE9ns ".concat(j1.nome, " e ").concat(j2.nome, "\n\n            Tivemos um empate!\n        ");

    aviso.textContent = _avisoFinal2;
  }

  ;
  a.textContent = "";
  b.textContent = "";
  c.textContent = "";
  d.textContent = "";
  a.setAttribute('value', '0');
  b.setAttribute('value', '0');
  c.setAttribute('value', '0');
  d.setAttribute('value', '0'); // OCULTAR O ARTICLE DA QUESTAO

  articleQuestoes.style.display = 'none';
  divJogador1.style.display = 'none';
  divJogador2.style.display = 'none'; // Faz com que a página recarregue

  setTimeout(function () {
    pontos_j1_num = 0;
    pontos_j2_num = 0;
    location.reload();
  }, 10000);
}

; // // Teste 
// const equipe_1 = document.querySelector('.equipe_1');
// const jogador_1_e1 = document.querySelector('.jogador_1_e1');
// const jogador_2_e1 = document.querySelector('.jogador_2_e1');
// const jogador_3_e1 = document.querySelector('.jogador_3_e1');
// const jogador_4_e1 = document.querySelector('.jogador_4_e1');
// const pontos = document.querySelector('.pontos_e1');
// function configEquipe_1 () {
//     jogador_1_e1.textContent = 'jogador1    sdas';
//     jogador_2_e1.textContent = 'jogador2';
//     jogador_3_e1.textContent = 'jogador3';
//     jogador_4_e1.textContent = 'jogador4';
//     pontos.textContent = 0;
// }
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map