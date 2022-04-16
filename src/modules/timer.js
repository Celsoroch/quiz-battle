let time_sec = document.querySelector('#time_sec');

var ss = 15;
var tempo = 1000;
var cron;

function start() {
    cron = setInterval(() => { timer(); }, tempo);
}

function pause() {
    clearInterval(cron);
}

function stop() {
    clearInterval(cron);
}

function timer() {

    ss--;

    if (ss === 0) {
        stop();
        console.log('Acabou!');
    };

    var format = `${ss}`;
    time_sec.textContent = format;
}

module.exports = start;