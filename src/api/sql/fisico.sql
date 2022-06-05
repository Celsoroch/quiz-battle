/* Logico_1: */

CREATE TABLE questoes (
    alternativa_a VARCHAR(100),
    alternativa_b VARCHAR(100),
    alternativa_c VARCHAR(100),
    alternativa_d VARCHAR(100),
    correta VARCHAR(100),
    assunto VARCHAR(100),
    dificuldade INTEGER,
    pergunta VARCHAR(200)
);

CREATE TABLE partida (
    assunto VARCHAR(100),
    dia_ini DATE,
    id_partida VARCHAR(6)
);

CREATE TABLE jogadores (
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    idade VARCHAR(100),
    id_jog VARCHAR(4),
    id_equipe VARCHAR(6),
    email VARCHAR(100)
);

CREATE TABLE equipes (
    nome_equipe VARCHAR(100),
    id_equipe VARCHAR(6)
);

CREATE TABLE historico (
    id_equipe VARCHAR(4),
    pontos INTEGER,
    id_partida VARCHAR(6)
);
