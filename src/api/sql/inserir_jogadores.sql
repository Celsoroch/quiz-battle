insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Lionel', 'Messi', 35, 'lm35', 'Eq-ps', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Neymar', 'Júnior', 33, 'nj33', 'Eq-ps', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Kylian', 'Mbappé', 32, 'km32', 'Eq-ps', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Mauro', 'Icardi', 31, 'mi31', 'Eq-ps', '@gmail.com');

insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Vinicius', 'Júnior', 25, 'vj25', 'Eq-rm', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Casimiro', 'Henrique', 35, 'ch35', 'Eq-rm', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Éder', 'Militão', 38, 'em38', 'Eq-rm', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('David', 'Alba', 32, 'da32', 'Eq-rm', '@gmail.com');

insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Daniel', 'Alves', 40, 'da40', 'Eq-ba', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Gerard', 'Piqué', 38, 'gp38', 'Eq-ba', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Sergio', 'Busquets', 39, 'sb39', 'Eq-ba', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Sergi', 'Roberto', 25, 'sr25', 'Eq-ba', '@gmail.com');

insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Robert', 'Lewandowski', 35, 'rl35', 'Eq-bm', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Thomas', 'Muller', 37, 'tm37', 'Eq-bm', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Manuel', 'Neuer', 32, 'mn32', 'Eq-bm', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Leroy', 'Sané', 25, 'ls25', 'Eq-bm', '@gmail.com');

insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Kevin', 'De Bruyne', 38, 'kb38', 'Eq-mc', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Gabriel', 'Jesus', 27, 'gj27', 'Eq-mc', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Bernardo', 'Silva', 23, 'bs23', 'Eq-mc', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Phil', 'Foden', 22, 'pf22', 'Eq-mc', '@gmail.com');

insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Cristiano', 'Ronaldo', 37, 'cr37', 'Eq-mu', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Bruno', 'Fernandes', 25, 'bf25', 'Eq-mu', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Paul', 'Pogba', 28, 'pp28', 'Eq-mu', '@gmail.com');
insert into jogadores (nome, sobrenome, idade, id_jog, id_equipe, email) values ('Edinson', 'Cavani', 31, 'ec31', 'Eq-mu', '@gmail.com');

-- Para teste --
select nome from jogadores where id_jog::text = 'nj33';
