insert into equipes (nome_equipe, id_equipe) values ('Paris Saint-Germain ', 'Eq-ps');
insert into equipes (nome_equipe, id_equipe) values ('Real Madri', 'Eq-rm');
insert into equipes (nome_equipe, id_equipe) values ('Barcelona', 'Eq-ba');
insert into equipes (nome_equipe, id_equipe) values ('Bayern de Munique', 'Eq-bm');
insert into equipes (nome_equipe, id_equipe) values ('Manchester City', 'Eq-mc');
insert into equipes (nome_equipe, id_equipe) values ('Manchester United', 'Eq-mu');

-- Teste --

select nome_equipe from equipes where id_equipe::text = 'Eq-ba';