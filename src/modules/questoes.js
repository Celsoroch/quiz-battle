const axios = require('axios');
const { async } = require('regenerator-runtime');
const {start_clique, stop, start_ler, stop_ler} = require('./timer');

// Só para exemplo;
// Click Equipe
let click_equipe_1 = document.querySelector('.click_eq_1');
let click_equipe_2 = document.querySelector('.click_eq_2');
let click_equipe_3 = document.querySelector('.click_eq_3');
let click_equipe_4 = document.querySelector('.click_eq_4');
// Só para exemplo;

// Total de perguntas
let total  = document.querySelector('#total');

// Aviso
let aviso = document.querySelector('#aviso');

// Opcoes de tela
let contador = document.querySelector('.contador');
let centro = document.querySelector('.centro');
let questoesHTML = document.querySelector('.questoes');
let quiz = document.querySelector('.quiz');
let box_equipe = document.querySelector('.box_equipes');
let minhaEqui = document.querySelector('.equipe_botao');

// Minha equipe
let pontosMinhaEq = document.querySelector('.pontos_meq');
let pontos = 0;
pontosMinhaEq.setAttribute('value', pontos);
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

// Instruções
let instrucoes = document.querySelector('#instrucoes');

// // Configurações de botões
// Botões
let botao_j1 = document.querySelector('.botao_responder');

async function configQuestoes() {

    // let clicouPrajogar = false;
    let clique_botao = false
    let qual_botao = '';

    // Configurações de cliques
    let jaClicouPraJogar = false;
    let clicouPrajogar = false;

    start_ler();
    let cont_questoes = 0;
    let { data } = await axios ('http://localhost:3000/questoes/1');
    // console.log(data);
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
    a.setAttribute('value', cont_questoes+'A');
    b.setAttribute('value', cont_questoes+'B');
    c.setAttribute('value', cont_questoes+'C');
    d.setAttribute('value', cont_questoes+'D');

    // Jogador
    let id_jog = 'lm35';
    let jog = await axios(`http://localhost:3000/jogadores/${id_jog}`);
    let jog_data = jog.data;
    let nome_jog = jog_data.nome;
    let isLider = jog_data.lider;

    botao_j1.addEventListener('click', ()=> {
        if (isLider) {
            if (clique_botao === false) {
                qual_botao = 'Jogar';
                // console.log('Clicou');
                clique_botao = true;
                instrucoes.textContent = 'Você joga!'
                stop_ler();
                start_clique();
            } else {
                alert('Você já clicou!');
            }
        } else {
            alert('Você não é líder, somente o líder pode clicar!');
        }
    });

    respostaA.addEventListener('click', () => {
        if (qual_botao === 'Jogar') {
            clique_botao = false;
            stop();
            // pause();
            let resposta = a;
            clicouPrajogar = true;
            chamaAcertou(resposta);
        } else {
            alert('Você não pode clicar aqui!');
        };
    });
    respostaB.addEventListener('click', () => {
        if (qual_botao === 'Jogar') {
            clique_botao = false;
            stop();
            let resposta = b;
            clicouPrajogar = true;
            chamaAcertou(resposta);
        } else {
            alert('Você não pode clicar aqui!');
        };
    });
    respostaC.addEventListener('click', () => {
        if (qual_botao === 'Jogar') {
            clique_botao = false;
            stop();
            let resposta = c;
            clicouPrajogar = true;
            chamaAcertou(resposta);
        } else {
            alert('Você não pode clicar aqui!');
        };
    });
    respostaD.addEventListener('click', () => {
        if (qual_botao === 'Jogar') {
            clique_botao = false;
            stop();
            let resposta = d;
            clicouPrajogar = true;
            chamaAcertou(resposta);
        } else {
            alert('Você não pode clicar aqui!');
        };
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
            // console.log('verifica acertou = true');
            jaClicouPraJogar = true;
            // let numeroDaQuestao = nQuestao.value;
            // console.log("Questão " + numeroDaQuestao);
        
            // Pega resposta escolhida
            let respostaEscolhida = resposta.textContent;
            // console.log('resposta = ' + respostaEscolhida);
        
            // Pega resposta certa
            let certa = data[cont_questoes].correta;
            // console.log('certa = ' + certa);
        
            if(respostaEscolhida == certa) {
                instrucoes.textContent = 'Acertou! Parabéns!';
                
                pontos += 100;
                pontosMinhaEq.setAttribute('value', pontos);
                pontosMinhaEq.textContent = pontos;

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
                cont_questoes++;
        
                if(cont_questoes === totalDeQuestoes) {
                    // console.log('Fim do Jogo!');
                    fimDoJogo();
                } else {
                    clicouPrajogar = false;
                    proximaQuestao(cont_questoes);
                };
            }, 5000);
        } else {
            alert('Calma!!, quem clicar primeiro joga!');
        };
        
    };

    // Proxima questão
    function proximaQuestao(nQuestao) {
        // configura timer
        start_ler();

        // 
        qual_botao = '';

        // Abilita o clicou para jogar
        clicouPrajogar = false;
    
        // ja cliclou
        jaClicouPraJogar = false;
    
        // coloca o número
        numero.textContent = nQuestao + 1;
        // console.log(nQuestao);
    
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
        // console.log('a value' +  a.value);
    };

    // Fim de jogo

    function fimDoJogo() {
        instrucoes.textContent = "Fim de Jogo!";
        numQuestao.textContent = "";
        pergunta.textContent = "";
        quiz.textContent = "";

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
        }, 500); // 10000
    };

    let botao_j2 = document.querySelector('.botao_passar');
    let clicou_passar = false;

    botao_j2.addEventListener('click', () => {
        if(isLider) {
            pontos = parseInt(pontosMinhaEq.getAttribute('value'));
            if (pontos > 75) {
                clicou_passar = true;
                pontos -= 75;
                pontosMinhaEq.setAttribute('value', pontos);
                pontosMinhaEq.textContent = pontos;
            } else {
                alert('Você não tem pontos suficiente!');
            }
        } else {
            alert('Você não é líder, somente o líder pode clicar!');
        }
    });

    click_equipe_1.addEventListener('click', () => {
        if(clicou_passar === true) {
            clicou_passar = false;
            setTimeout(() => {
                cont_questoes++;
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
                proximaQuestao(cont_questoes);
            }, 2500);
        } else {
            alert('Você tem que clicar pra passar!');
        }
    });

    click_equipe_2.addEventListener('click', () => {
        if(clicou_passar === true) {
            setTimeout(() => {
                cont_questoes++;
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
                proximaQuestao(cont_questoes);
                clicou_passar = false;
            }, 2500);
        } else {
            alert('Você tem que clicar pra passar!');
        }
    });

    click_equipe_3.addEventListener('click', () => {
        if(clicou_passar === true) {
            setTimeout(() => {
                cont_questoes++;
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
                proximaQuestao(cont_questoes);
                clicou_passar = false;
            }, 2500);
        } else {
            alert('Você tem que clicar pra passar!');
        }
    });

    click_equipe_4.addEventListener('click', () => {
        if(clicou_passar === true) {
            setTimeout(() => {
                cont_questoes++;
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
                proximaQuestao(cont_questoes);
                clicou_passar = false;
            }, 2500);
        } else {
            alert('Você tem que clicar pra passar!');
        }
    });
}

module.exports = configQuestoes;