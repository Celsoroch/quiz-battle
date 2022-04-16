const axios = require('axios');
const { async } = require('regenerator-runtime');

// Minha equipe
let jog_1_meq = document.querySelector('.jog_1_meq');
let jog_2_meq = document.querySelector('.jog_2_meq');
let jog_3_meq = document.querySelector('.jog_3_meq');
let jog_4_meq = document.querySelector('.jog_4_meq');

// Equipe 1
let equipe_1 = document.querySelector('.equipe_1');
let jog_1_eq1 = document.querySelector('.jog_1_eq1');
let jog_2_eq1 = document.querySelector('.jog_2_eq1');
let jog_3_eq1 = document.querySelector('.jog_3_eq1');
let jog_4_eq1 = document.querySelector('.jog_4_eq1');

// Equipe 2
let equipe_2 = document.querySelector('.equipe_2');
let jog_1_eq2 = document.querySelector('.jog_1_eq2');
let jog_2_eq2 = document.querySelector('.jog_2_eq2');
let jog_3_eq2 = document.querySelector('.jog_3_eq2');
let jog_4_eq2 = document.querySelector('.jog_4_eq2');

// Equipe 3
let equipe_3 = document.querySelector('.equipe_3');
let jog_1_eq3 = document.querySelector('.jog_1_eq3');
let jog_2_eq3 = document.querySelector('.jog_2_eq3');
let jog_3_eq3 = document.querySelector('.jog_3_eq3');
let jog_4_eq3 = document.querySelector('.jog_4_eq3');

// Equipe 4
let equipe_4 = document.querySelector('.equipe_4');
let jog_1_eq4 = document.querySelector('.jog_1_eq4');
let jog_2_eq4 = document.querySelector('.jog_2_eq4');
let jog_3_eq4 = document.querySelector('.jog_3_eq4');
let jog_4_eq4 = document.querySelector('.jog_4_eq4');

async function config_eqps() {

    let { data } = await axios ('http://localhost:3000/equipe');
    console.log(data);
    let tamanho = data.length;
    console.log(tamanho);
    let minimo = 0;
    let nums = [];
    while (nums.length < 4) {
        let random = await Math.floor(Math.random() * (tamanho - minimo) + minimo);
        if (data[random].id_equipe !== 'Eq-ps') {
            if (nums.indexOf(random) === -1) {
                console.log(data[random].id_equipe);
                nums.push(random);
            }
        }
    }

    // equipe 1
    equipe_1.textContent = data[nums[0]].id_equipe;
    let id_eq1 = data[nums[0]].id_equipe;
    let jogs1 = await axios (`http://localhost:3000/jogadoresid/${id_eq1}`);
    let data_jog1 = jogs1.data;
    console.log(data_jog1)
    jog_1_eq1.textContent = data_jog1[0].nome;
    jog_2_eq1.textContent = data_jog1[1].nome;
    jog_3_eq1.textContent = data_jog1[2].nome;
    jog_4_eq1.textContent = data_jog1[3].nome;

    // Equipe 2
    equipe_2.textContent = data[nums[1]].id_equipe;
    let id_eq2 = data[nums[1]].id_equipe;
    let jogs2 = await axios (`http://localhost:3000/jogadoresid/${id_eq2}`)
    let data_jog2 = jogs2.data;
    jog_1_eq2.textContent = data_jog2[0].nome;
    jog_2_eq2.textContent = data_jog2[1].nome;
    jog_3_eq2.textContent = data_jog2[2].nome;
    jog_4_eq2.textContent = data_jog2[3].nome;

    // Equipe 3
    equipe_3.textContent = data[nums[2]].id_equipe;
    let id_eq3 = data[nums[2]].id_equipe;
    let jogs3 = await axios (`http://localhost:3000/jogadoresid/${id_eq3}`)
    let data_jog3 = jogs3.data;
    jog_1_eq3.textContent = data_jog3[0].nome;
    jog_2_eq3.textContent = data_jog3[1].nome;
    jog_3_eq3.textContent = data_jog3[2].nome;
    jog_4_eq3.textContent = data_jog3[3].nome;

    // Equipe 4 
    equipe_4.textContent = data[nums[3]].id_equipe;
    let id_eq4 = data[nums[3]].id_equipe;
    let jogs4 = await axios (`http://localhost:3000/jogadoresid/${id_eq4}`)
    let data_jog4 = jogs4.data;
    jog_1_eq4.textContent = data_jog4[0].nome;
    jog_2_eq4.textContent = data_jog4[1].nome;
    jog_3_eq4.textContent = data_jog4[2].nome;
    jog_4_eq4.textContent = data_jog4[3].nome;

    // Minha equipe
    let id_minha = 'Eq-ps';
    let jogsM = await axios(`http://localhost:3000/jogadoresid/${id_minha}`);
    let data_meq = jogsM.data;
    console.log(data_meq);
    jog_1_meq.textContent = data_meq[0].nome;
    jog_2_meq.textContent = data_meq[1].nome;
    jog_3_meq.textContent = data_meq[2].nome;
    jog_4_meq.textContent = data_meq[3].nome;
};

config_eqps();
