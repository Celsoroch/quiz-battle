// Questões
const q0 = {
    numQuestao   : 0,
    pergunta     : "Pergunta",
    alternativaA : "Alternativa A",
    alternativaB : "Alternativa B",
    alternativaC : "Alternativa C",
    alternativaD : "Alternativa D",
    correta      : "0",
};

// Para TEste
let botao_j1 = document.querySelector('.botao_j1');

botao_j1.addEventListener('click', ()=> {
    console.log('clicou');
    clicouPrajogar = true;
})

// 

const axios = require('axios');
const { async } = require('regenerator-runtime');

// Total de perguntas
let total  = document.querySelector('#total');

// Aviso
let aviso = document.querySelector('#aviso');

// Opcoes de tela
const contador = document.querySelector('.contador');
const centro = document.querySelector('.centro');
const questoesHTML = document.querySelector('.questoes');
const quiz = document.querySelector('.quiz');
const box_equipe = document.querySelector('.box_equipes');
const minhaEqui = document.querySelector('.equipe_botao');

// Minha equipe
let pontosMinhaEq = document.querySelector('.pontos_meq');
let pontos = 0
pontosMinhaEq.textContent = pontos;

// PERGUNTA
let numQuestao = document.querySelector('#numQuestao');
let pergunta   = document.querySelector('#pergunta');
let numero = document.querySelector('#numero');

// ALTERNATIVAS
let a = document.querySelector('#a');
let b = document.querySelector('#b');
let c = document.querySelector('#c');
let d = document.querySelector('#d');

// configura respostas
let respostaA = document.querySelector('.respostaA');
let respostaB = document.querySelector('.respostaB');
let respostaC = document.querySelector('.respostaC');
let respostaD = document.querySelector('.respostaD');

async function configQuestoes() {

    // Configurações de cliques
    let jaClicouPraJogar = false;
    let clicouPrajogar = false;

    let cont_questoes = 0;
    let { data } = await axios ('http://localhost:3000/questoes/1');
    console.log(data);
    const totalDeQuestoes = data.length;
    // console.log('Total de questões = ' + totalDeQuestoes);
    total.textContent = data.length;

    numero.textContent = cont_questoes + 1;
    numQuestao.textContent = cont_questoes + 1;
    pergunta.textContent = data[cont_questoes].pergunta;
    a.textContent = data[cont_questoes].alternativa_a;
    b.textContent = data[cont_questoes].alternativa_b;
    c.textContent = data[cont_questoes].alternativa_c;
    d.textContent = data[cont_questoes].alternativa_d;
    let correta = data[cont_questoes].correta;

    a.setAttribute('value', cont_questoes+'A');
    b.setAttribute('value', cont_questoes+'B');
    c.setAttribute('value', cont_questoes+'C');
    d.setAttribute('value', cont_questoes+'D');

    respostaA.addEventListener('click', () => {
        let resposta = a;
        clicouPrajogar = true;
        chamaAcertou(resposta);
    });
    respostaB.addEventListener('click', () => {
        let resposta = b;
        clicouPrajogar = true;
        chamaAcertou(resposta);
    });
    respostaC.addEventListener('click', () => {
        let resposta = c;
        clicouPrajogar = true;
        chamaAcertou(resposta);
    });
    respostaD.addEventListener('click', () => {
        let resposta = d;
        clicouPrajogar = true;
        chamaAcertou(resposta);
    });
    
    // Chama acertou;
    function chamaAcertou(resposta) {
        if(jaClicouPraJogar === false) {
            // console.log('Chama acertou');
            verificarSeAcertou(resposta);
        } else {
            alert('Você não pode clicar de novo!');
        };
    };
    
    // // Verifica se acertou;
    function verificarSeAcertou(resposta) {

        if (clicouPrajogar === true) {
            console.log('verifica acertou = true');
            jaClicouPraJogar = true;
            // let numeroDaQuestao = nQuestao.value;
            // console.log("Questão " + numeroDaQuestao);
        
            // Pega resposta escolhida
            let respostaEscolhida = resposta.textContent;
            console.log('resposta = ' + respostaEscolhida);
        
            // Pega resposta certa
            let certa = data[cont_questoes].correta;
            console.log('certa = ' + certa);
        
            if(respostaEscolhida == certa) {
                instrucoes.textContent = 'Acertou! Parabéns!';
                
                pontos += 10;
                pontosMinhaEq.textContent = pontos;

                setTimeout(function() {
                    instrucoes.textContent = `Leia a questão e clique na resposta correta`;
                }, 100);
            } else {
                instrucoes.textContent = 'Errou, preste mais atenção!';
    
                setTimeout(function() {
                    instrucoes.textContent = `Leia a questão e clique na resposta correta`;
                }, 100);
            };
        
            setTimeout(function() {
                cont_questoes++;
        
                // cont_questoes === totalDeQuestoes
                if(cont_questoes === 3) {
                    console.log('Fim do Jogo!');
                    fimDoJogo();
                } else {
                    proximaQuestao(cont_questoes);
                };
            }, 100);
        } else {
            alert('Calma!!, quem clicar primeiro joga!');
        };
        
    };

    // Proxima questão
    function proximaQuestao(nQuestao) {
        // Abilita o clicou para jogar
        clicouPrajogar = false;
    
        // ja cliclou
        jaClicouPraJogar = false;
    
        // coloca o número
        numero.textContent = nQuestao + 1;
        console.log(nQuestao);
    
        // Coloca o número da questão em azul
        numQuestao.textContent = nQuestao+1;
    
        // Coloca o parametro da questão
        pergunta.textContent = data[nQuestao].pergunta;
    
        // Coloca o texto das alternativas
        a.textContent = data[nQuestao].alternativa_a;
        b.textContent = data[nQuestao].alternativa_b;
        c.textContent = data[nQuestao].alternativa_c;
        d.textContent = data[nQuestao].alternativa_d;
        correta = data[nQuestao].correta;
    
        // Configura o value da questão
        a.setAttribute('value', nQuestao+'A');
        b.setAttribute('value', nQuestao+'B');
        c.setAttribute('value', nQuestao+'C');
        d.setAttribute('value', nQuestao+'D');
    };

    // Fim de jogo

    function fimDoJogo() {
        instrucoes.textContent = "Fim de Jogo!";
        numQuestao.textContent = "";
        pergunta.textContent = "";
        quiz.textContent = "";

        // contador.styles.display = 'none';
        // centro.styles.display = 'none';
        // questoesHTML.styles.display = 'none';

        contador.remove('contador');
        centro.remove('centro');
        questoesHTML.remove('questoes');
        minhaEqui.remove('.equipe_botao');
        box_equipe.remove('.box_equipes');

        let avisoFinal = `
            Parabéns \n
            Você conseguiu ${pontos} pontos
        `;

        aviso.textContent = avisoFinal;
    
        a.textContent = "";
        b.textContent = "";
        c.textContent = "";
        d.textContent = "";
    
        a.setAttribute('value', '0');
        b.setAttribute('value', '0');
        c.setAttribute('value', '0');
        d.setAttribute('value', '0');
    
        // Faz com que a página recarregue
        setTimeout(function() {
            location.reload();
        }, 10000);
    };

}

configQuestoes();

const questoes = [q0];

module.exports = questoes;