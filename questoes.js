const questoesJson = require('./questoes.json');
const questoes_obj = questoesJson.questoes;

// console.log(questoesJson);
// console.log(questoesJson.questoes);
// console.log(questoes_obj);
questoes_obj.forEach(e => {
    // console.log(e);
    console.log(e.id);
    console.log(e.paramtetros);
    console.log(e.a);
    console.log(e.b);
    console.log(e.c);
    console.log(e.d);
    console.log(e.certa);
})