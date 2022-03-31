let titulo = document.querySelector('h1')
let instrucoes = document.querySelector('#instrucoes')
let aviso = document.querySelector('#aviso')
//let respostaEsta = document.querySelector('#respostaEsta')
let pontos = 0 // pontos para o placar
let placar = 0 // placar

// PERGUNTA
let numQuestao = document.querySelector('#numQuestao')
let pergunta   = document.querySelector('#pergunta')

// ALTERNATIVAS
let a = document.querySelector('#a')
let b = document.querySelector('#b')
let c = document.querySelector('#c')
let d = document.querySelector('#d')

// article com a class questoes
let articleQuestoes = document.querySelector('.questoes')
// ol li com as alternativas
let alternativas = document.querySelector('#alternativas')

// Jogadores
let divJogador1 = document.querySelector('.jogador1');
let jogador1 = document.querySelector('.nome_jogador_1');
let divJogador2 = document.querySelector('.jogador2');
let jogador2 = document.querySelector('.nome_jogador_2');

// Botão jogadores
let botao_j1 = document.querySelector('.botao_j1');
let botao_j2 = document.querySelector('.botao_j2');
// configura botões
let clicou = ''
// 1
botao_j1.addEventListener('click', () => {
    instrucoes.textContent = `${jogador1.textContent} joga!`
    clicou = 'jogador1'
    botao_j2.disabled = true;
    clicouPrajogar = true
});
// 2
botao_j2.addEventListener('click', () => {
    instrucoes.textContent = `${jogador2.textContent} joga!`
    clicou = 'jogador2'
    botao_j1.disabled = true;
    clicouPrajogar = true
});

// Pontos jogadores
let pontos_j1 = document.querySelector('.pontos_1');
let pontos_j1_num = 0;
let pontos_j2 = document.querySelector('.pontos_2');
let pontos_j2_num = 0;


// Botão jogar
const botaoJogar = document.querySelector('.botao_jogar');

botaoJogar.addEventListener('click', () => {
    if (botaoJogar.disabled === true) {
        console.log('função bloqueada');
    } else {
        console.log('botão jogar');
    }
})

// Questões
const q0 = {
    numQuestao   : 0,
    pergunta     : "Pergunta",
    alternativaA : "Alternativa A",
    alternativaB : "Alternativa B",
    alternativaC : "Alternativa C",
    alternativaD : "Alternativa D",
    correta      : "0",
}

const q1 = {
    numQuestao   : 1,
    pergunta     : "Qual filósofo grego pediu que Alexandre, o Grande, saísse da frente do sol, quando questionado sobre qual era o seu maior desejo?",
    alternativaA : "Epicuro",
    alternativaB : "Diógenes",
    alternativaC : "Epiteto",
    alternativaD : "Sócrates",
    correta      : "Diógenes",
}

const q2 = {
    numQuestao   : 2,
    pergunta     : "Quem foi o Ultímo presidente antes do Golpe Militar de 1964?",
    alternativaA : "Jânio Quadros",
    alternativaB : "Jacinto Anjos",
    alternativaC : "Getúlio Vargas",
    alternativaD : "João Goulart",
    correta      : "João Goulart",
}

const q3 = {
    numQuestao   : 3,
    pergunta     : "Quem é o autor de “O Príncipe”?",
    alternativaA : "Maquiavel",
    alternativaB : "Antoine de Saint-Exupéry",
    alternativaC : "Montesquieu",
    alternativaD : "Thomas Hobbes",
    correta      : "Maquiavel",
}

const q4 = {
    numQuestao   : 4,
    pergunta     : "Quem foi o Autor(a) de Frankenstein?",
    alternativaA : "H.P Lovecratf",
    alternativaB : "Mary Ann Shelly",
    alternativaC : "Bram Stoker",
    alternativaD : "Ian Fleming",
    correta      : "Mary Ann Shelly",
}

const q5 = {
    numQuestao   : 5,
    pergunta     : "Em que ano terminou a Primeira Guerra Mundial?",
    alternativaA : "1917",
    alternativaB : "1915",
    alternativaC : "1920",
    alternativaD : "1914",
    correta      : "1914",
}

const q6 = {
    numQuestao   : 6,
    pergunta     : "Quem pintou Noite Estrelada?",
    alternativaA : "Leonardo da Vinci",
    alternativaB : "Pablo Picasso",
    alternativaC : "Van Gogh",
    alternativaD : "Tarsila do Amaral",
    correta      : "Van Gogh",
}

const q7 = {
    numQuestao   : 7,
    pergunta     : "Júpiter e Plutão são os correlatos romanos de quais deuses gregos?",
    alternativaA : "Ares e Hermes",
    alternativaB : "Cronos e Apolo",
    alternativaC : "Zeus e Hades",
    alternativaD : "Dionísio e Deméter",
    correta      : "Zeus e Hades",
}

// Jogadores
const j1 = {
    id: "1N33",
    nome: "Neymar",
    sobreome: "Júnior",
    email: "neyjunior@gmail.com",
    idade: "33"
}

const j2 = {
    id: "1M35",
    nome: "Messi",
    sobreome: "Lionel",
    email: "messiLio@gmail.com",
    idade: "35"
}

// Constante com uma arrau de objetos com as questões
const questoes = [q0, q1, q2, q3, q4, q5, q6, q7];

// Constante com uma array de objetos com os jogadores
const jogadores = [j1, j2];

let numero = document.querySelector('#numero')
let total  = document.querySelector('#total')

// Coloca um numero "1" de 7
numero.textContent = q1.numQuestao

// Coloca o número 1 de "7"
let totalDeQuestoes = (questoes.length)-1
console.log("Total de questões " + totalDeQuestoes)
total.textContent = totalDeQuestoes

// Monta o jogador1 
jogador1.textContent = j1.nome
pontos_j1.textContent = 'Pontos: ' + pontos_j1_num;
jogador2.textContent = j2.nome
pontos_j2.textContent = 'Pontos: ' + pontos_j2_num;

// MONTAR A 1a QUESTAO COMPLETA, para iniciar o Quiz
// // Coloca o número da questão em azul
numQuestao.textContent = q1.numQuestao

// // Coloca o parametro da questão 
pergunta.textContent   = q1.pergunta

// // Coloca o texto das alternativas
a.textContent = q1.alternativaA
b.textContent = q1.alternativaB
c.textContent = q1.alternativaC
d.textContent = q1.alternativaD

// CONFIGURAR O VALUE INICIAL DA 1a QUESTAO COMPLETA
a.setAttribute('value', '1A')
b.setAttribute('value', '1B')
c.setAttribute('value', '1C')
d.setAttribute('value', '1D')

// PARA MONTAR AS PROXIMAS QUESTOES
function proximaQuestao(nQuestao) {
    // Abilita o clicou para jogar
    clicouPrajogar = false;
    // Abilita os botões
    botao_j1.disabled = false;
    botao_j2.disabled = false;

    // 
    jaClicouPraJogar = false;

    // coloca o número
    numero.textContent = nQuestao

    // Coloca o número da questão em azul
    numQuestao.textContent = questoes[nQuestao].numQuestao

    // Coloca o parametro da questão
    pergunta.textContent   = questoes[nQuestao].pergunta

    // Coloca o texto das alternativas
    a.textContent = questoes[nQuestao].alternativaA
    b.textContent = questoes[nQuestao].alternativaB
    c.textContent = questoes[nQuestao].alternativaC
    d.textContent = questoes[nQuestao].alternativaD

    // Configura o value da questão
    a.setAttribute('value', nQuestao+'A')
    b.setAttribute('value', nQuestao+'B')
    c.setAttribute('value', nQuestao+'C')
    d.setAttribute('value', nQuestao+'D');
}

function bloquearAlternativas() {
    a.classList.add('bloqueado')
    b.classList.add('bloqueado')
    c.classList.add('bloqueado')
    d.classList.add('bloqueado')
}

function desbloquearAlternativas() {
    a.classList.remove('bloqueado')
    b.classList.remove('bloqueado')
    c.classList.remove('bloqueado')
    d.classList.remove('bloqueado')
}

let jaClicouPraJogar = false;
function chamaAcertou(nQuestao, resposta) {
    if(jaClicouPraJogar === false) {
        verificarSeAcertou(nQuestao, resposta);
    } else {
        alert('Você não pode clicar de novo!');
    }
}

let clicouPrajogar = false;
function verificarSeAcertou(nQuestao, resposta) {

    if (clicouPrajogar === true) {
        jaClicouPraJogar = true;
        bloquearAlternativas();
        let numeroDaQuestao = nQuestao.value
        console.log("Questão " + numeroDaQuestao)
    
        let respostaEscolhida = resposta.textContent
        //console.log("RespU " + respostaEscolhida)
    
        let certa = questoes[numeroDaQuestao].correta
        //console.log("RespC " + certa)
    
        if(respostaEscolhida == certa) {
            if (clicou === 'jogador1'){
                pontos_j1_num += 10;
                pontos_j1.textContent = 'Pontos: ' + pontos_j1_num;
                console.log('Pontos jogador 1 ' + pontos_j1_num);
            }
            if (clicou === 'jogador2'){
                pontos_j2_num += 10;
                pontos_j2.textContent = 'Pontos: ' + pontos_j2_num;
                console.log('Pontos jogador 2 ' + pontos_j2_num);
            }
            instrucoes.textContent = 'Acertou! Parabéns!'
            
            setTimeout(function() {
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
            }, 5000);
        } else {
            instrucoes.textContent = 'Errou, preste mais atenção!'

            setTimeout(function() {
                instrucoes.textContent = `Leia a questão e clique na resposta correta`;
            }, 5000);
        }
    
        // bloquear a escolha de opcoes
        // bloquearAlternativas();
    
        setTimeout(function() {
            proxima = numeroDaQuestao+1
    
            if(proxima > totalDeQuestoes) {
                console.log('Fim do Jogo!')
                fimDoJogo()
            } else {
                proximaQuestao(proxima);
                botaoJogar.disabled = false;
    
            }
        }, 5000)
        desbloquearAlternativas()
    } else {
        alert('Calma!!, quem clicar primeiro joga!')
    }
    
}

function fimDoJogo() {
    instrucoes.textContent = "Fim de Jogo!"
    numQuestao.textContent = ""

    if(pontos_j1_num > pontos_j2_num) {
        let pont = ''
        pontos == 0 ? pont = 'ponto' : pont = 'pontos'

        let avisoFinal = `
            Parabéns ${j1.nome}\n
            Você conseguiu ${pontos_j1_num} ${pont}
        `
        aviso.textContent = avisoFinal;
    }

    if (pontos_j2_num > pontos_j1_num) {
        let pont = ''
        pontos == 0 ? pont = 'ponto' : pont = 'pontos'

        let avisoFinal = `
            Parabéns ${j2.nome}\n
            Você conseguiu ${pontos_j2_num} ${pont}
        `
        aviso.textContent = avisoFinal;
    }

    a.textContent = ""
    b.textContent = ""
    c.textContent = ""
    d.textContent = ""

    a.setAttribute('value', '0')
    b.setAttribute('value', '0')
    c.setAttribute('value', '0')
    d.setAttribute('value', '0')

    // OCULTAR O ARTICLE DA QUESTAO
    articleQuestoes.style.display = 'none';
    divJogador1.style.display = 'none';
    divJogador2.style.display = 'none';

    setTimeout(function() {
        pontos_j1_num = 0;
        pontos_j2_num = 0
        location.reload();
    }, 10000)
}
