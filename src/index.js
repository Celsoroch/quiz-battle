import './assets/css/styles.css';
const questoes = require('./modules/questoes');
const jogadores = require('./modules/jogador');

let titulo = document.querySelector('h1');
let instrucoes = document.querySelector('#instrucoes');
let aviso = document.querySelector('#aviso');

// PERGUNTA
let numQuestao = document.querySelector('#numQuestao');
let pergunta   = document.querySelector('#pergunta');

// ALTERNATIVAS
let a = document.querySelector('#a');
let b = document.querySelector('#b');
let c = document.querySelector('#c');
let d = document.querySelector('#d');

// article com a class questoes
let articleQuestoes = document.querySelector('.questoes');

// ol li com as alternativas
let alternativas = document.querySelector('#alternativas');

// Jogadores
let divJogador1 = document.querySelector('.jogador1');
let jogador1 = document.querySelector('.nome_jogador_1');
let divJogador2 = document.querySelector('.jogador2');
let jogador2 = document.querySelector('.nome_jogador_2');

// Botão jogadores
let botao_j1 = document.querySelector('.botao_j1');
let botao_j2 = document.querySelector('.botao_j2');

// Seta respostas
const respostaA = document.querySelector('.respostaA');
const respostaB = document.querySelector('.respostaB');
const respostaC = document.querySelector('.respostaC');
const respostaD = document.querySelector('.respostaD');

// Configura respostas
let jaClicouPraJogar = false;
respostaA.addEventListener('click', () => {
    let nQuestao = a;
    let resposta = a;
    chamaAcertou(nQuestao, resposta);
});
respostaB.addEventListener('click', () => {
    let nQuestao = b;
    let resposta = b;
    chamaAcertou(nQuestao, resposta);
});
respostaC.addEventListener('click', () => {
    let nQuestao = c;
    let resposta = c;
    chamaAcertou(nQuestao, resposta);
});
respostaD.addEventListener('click', () => {
    let nQuestao = d;
    let resposta = d;
    chamaAcertou(nQuestao, resposta);
});

// configura botões
let clicou = '';

// // 1
botao_j1.addEventListener('click', () => {
    instrucoes.textContent = `${jogador1.textContent} joga!`;
    clicou = 'jogador1';
    botao_j2.disabled = true;
    clicouPrajogar = true;
});
// // 2
botao_j2.addEventListener('click', () => {
    instrucoes.textContent = `${jogador2.textContent} joga!`;
    clicou = 'jogador2';
    botao_j1.disabled = true;
    clicouPrajogar = true;
});

// Pontos jogadores
let pontos_j1 = document.querySelector('.pontos_1');
let pontos_j1_num = 0;
let pontos_j2 = document.querySelector('.pontos_2');
let pontos_j2_num = 0;

// número 
let numero = document.querySelector('#numero');

// total
let total  = document.querySelector('#total');

// Coloca um numero "1" de 7
const q0 = questoes[0];
numero.textContent = q0.numQuestao;

// Coloca o número 1 de "7"
let totalDeQuestoes = (questoes.length)-1;
console.log("Total de questões " + totalDeQuestoes);
total.textContent = totalDeQuestoes;

// Monta o jogador1
const j1 = jogadores[0];
jogador1.textContent = j1.nome;
pontos_j1.textContent = 'Pontos: ' + pontos_j1_num;
const j2 = jogadores[1];
jogador2.textContent = j2.nome;
pontos_j2.textContent = 'Pontos: ' + pontos_j2_num;

// MONTAR A 1a QUESTAO COMPLETA, para iniciar o Quiz
// // Coloca o número da questão em azul
const q1 = questoes[1];
numQuestao.textContent = q1.numQuestao;

// // Coloca o parametro da questão 
pergunta.textContent   = q1.pergunta;

// // Coloca o texto das alternativas
a.textContent = q1.alternativaA;
b.textContent = q1.alternativaB;
c.textContent = q1.alternativaC;
d.textContent = q1.alternativaD;

// CONFIGURAR O VALUE INICIAL DA 1a QUESTAO COMPLETA
a.setAttribute('value', '1A');
b.setAttribute('value', '1B');
c.setAttribute('value', '1C');
d.setAttribute('value', '1D');

// PARA MONTAR AS PROXIMAS QUESTOES
function proximaQuestao(nQuestao) {
    // Abilita o clicou para jogar
    clicouPrajogar = false;
    // Abilita os botões
    botao_j1.disabled = false;
    botao_j2.disabled = false;

    // ja cliclou
    jaClicouPraJogar = false;

    // coloca o número
    numero.textContent = nQuestao;

    // Coloca o número da questão em azul
    numQuestao.textContent = questoes[nQuestao].numQuestao;

    // Coloca o parametro da questão
    pergunta.textContent   = questoes[nQuestao].pergunta;

    // Coloca o texto das alternativas
    a.textContent = questoes[nQuestao].alternativaA;
    b.textContent = questoes[nQuestao].alternativaB;
    c.textContent = questoes[nQuestao].alternativaC;
    d.textContent = questoes[nQuestao].alternativaD;

    // Configura o value da questão
    a.setAttribute('value', nQuestao+'A');
    b.setAttribute('value', nQuestao+'B');
    c.setAttribute('value', nQuestao+'C');
    d.setAttribute('value', nQuestao+'D');
};

// Verifica se já foi escolhida a resposta certa
function chamaAcertou(nQuestao, resposta) {
    if(jaClicouPraJogar === false) {
        verificarSeAcertou(nQuestao, resposta);
    } else {
        alert('Você não pode clicar de novo!');
    };
};

// Verifica se acertou a resposta
let clicouPrajogar = false;
function verificarSeAcertou(nQuestao, resposta) {

    if (clicouPrajogar === true) {
        jaClicouPraJogar = true;
        let numeroDaQuestao = nQuestao.value;
        console.log("Questão " + numeroDaQuestao);
    
        // Pega resposta escolhida
        let respostaEscolhida = resposta.textContent;
    
        // Pega resposta certa
        let certa = questoes[numeroDaQuestao].correta;
    
        if(respostaEscolhida == certa) {
            if (clicou === 'jogador1'){
                pontos_j1_num += 10;
                pontos_j1.textContent = 'Pontos: ' + pontos_j1_num;
                console.log('Pontos jogador 1 ' + pontos_j1_num);
            };
            if (clicou === 'jogador2'){
                pontos_j2_num += 10;
                pontos_j2.textContent = 'Pontos: ' + pontos_j2_num;
                console.log('Pontos jogador 2 ' + pontos_j2_num);
            };
            instrucoes.textContent = 'Acertou! Parabéns!';
            
            setTimeout(function() {
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
            }, 5000);
        } else {
            instrucoes.textContent = 'Errou, preste mais atenção!';

            setTimeout(function() {
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
            }, 5000);
        };
    
        setTimeout(function() {
            let proxima = numeroDaQuestao+1;
    
            if(proxima > totalDeQuestoes) {
                console.log('Fim do Jogo!');
                fimDoJogo();
            } else {
                proximaQuestao(proxima);    
            };
        }, 5000);
    } else {
        alert('Calma!!, quem clicar primeiro joga!');
    };
    
};

function fimDoJogo() {
    instrucoes.textContent = "Fim de Jogo!";
    numQuestao.textContent = "";

    if(pontos_j1_num > pontos_j2_num) {
        let pont = '';
        pontos_j1_num === 0 ? pont = 'ponto' : pont = 'pontos';

        let avisoFinal = `
            Parabéns ${j1.nome}\n
            Você conseguiu ${pontos_j1_num} ${pont}
        `;

        aviso.textContent = avisoFinal;
    };

    if (pontos_j2_num > pontos_j1_num) {
        let pont = '';
        pontos_j2_num === 0 ? pont = 'ponto' : pont = 'pontos';

        let avisoFinal = `
            Parabéns ${j2.nome}\n
            Você conseguiu ${pontos_j2_num} ${pont}
        `;

        aviso.textContent = avisoFinal;
    };

    if(pontos_j1_num === pontos_j2_num) {
        let avisoFinal = `
            Parabéns ${j1.nome} e ${j2.nome}\n
            Tivemos um empate!
        `;

        aviso.textContent = avisoFinal;
    };

    a.textContent = "";
    b.textContent = "";
    c.textContent = "";
    d.textContent = "";

    a.setAttribute('value', '0');
    b.setAttribute('value', '0');
    c.setAttribute('value', '0');
    d.setAttribute('value', '0');

    // OCULTAR O ARTICLE DA QUESTAO
    articleQuestoes.style.display = 'none';
    divJogador1.style.display = 'none';
    divJogador2.style.display = 'none';

    // Faz com que a página recarregue
    setTimeout(function() {
        pontos_j1_num = 0;
        pontos_j2_num = 0;
        location.reload();
    }, 10000);
};
