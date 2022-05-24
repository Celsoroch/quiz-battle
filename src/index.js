import './assets/css/styles.css';
import './assets/css/chat.css'
const config_eqps = require('./modules/equipes');
const configQuestoes = require('./modules/questoes');
const chat = require('./modules/chat');
const { start_ini, stop_ini } = require('./modules/timer');

const instrucoes = document.querySelector('#instrucoes');

instrucoes.textContent = 'Assim que o tempo acabar o jogo começará!Preste atenção!';
config_eqps();
start_ini();
chat();
setTimeout(function() {
    instrucoes.textContent = 'Leia a questão e clique na resposta correta!';
    stop_ini();
    configQuestoes();
}, 5000);