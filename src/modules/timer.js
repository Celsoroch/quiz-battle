let time_sec = document.querySelector('#time_sec');

var ss = '';
var tempo = 1000;
var cron;
var cron_ler;
var cron_ini;

var format = `${ss}`;

function start_clique() {
    ss = 15;
    
    format = `${ss}`;
    time_sec.textContent = format;

    cron = setInterval(() => { timer(); }, tempo);
}

function stop() {
    clearInterval(cron);
    ss = '--';

    format = `${ss}`;
    time_sec.textContent = format;
}

function timer() {

    ss--;

    if (ss === 0) {
        stop();
        // console.log('Acabou!');
    };

    if(ss > 10) {
        format = `${ss}`;
    } else {
        format = `0${ss}`;
    }
    time_sec.textContent = format;
}

function start_ler () {
    ss = 10;

    format = `${ss}`;
    time_sec.textContent = format;

    cron_ler = setInterval(() => { timer_ler(); }, tempo);
}

function stop_ler() {
    clearInterval(cron_ler);
}

function timer_ler() {

    ss--;

    if (ss === 0) {
        stop_ler();
        // console.log('Acabou!');
    };

    if(ss > 10) {
        format = `${ss}`;
    } else {
        format = `0${ss}`;
    }
    time_sec.textContent = format;
}

function start_ini(){
    ss = 5;

    format = `0${ss}`;
    time_sec.textContent = format;

    cron_ini = setInterval(() => { timer_ini(); }, tempo);
}

function stop_ini() {
    clearInterval(cron_ini);
}

function timer_ini() {

    ss--;

    if (ss === 0) {
        stop_ler();
        // console.log('Acabou!');
    };

    if(ss > 10) {
        format = `${ss}`;
    } else {
        format = `0${ss}`;
    }
    time_sec.textContent = format;
}

module.exports = { start_clique, stop, start_ler, stop_ler, start_ini, stop_ini};