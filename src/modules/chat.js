const axios = require('axios');

async function chat() {

    // Jogador
    let id_jog = 'lm35';
    let jog = await axios(`http://localhost:3000/jogadores/${id_jog}`);
    let jog_data = jog.data;
    let isLider = jog_data.lider;
    let nomeJogador = jog_data.nome;
    
    let classe = '';
    if(isLider) {
        classe = 'isLider'
    } else {
        classe = 'nomeJog'
    }

    // Collapsible
    var coll = document.getElementsByClassName("collapsible");

    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");

            var content = this.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }

        });
    }

    function getTime() {
        let today = new Date();
        hours = today.getHours();
        minutes = today.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let time = hours + ":" + minutes;
        return time;
    }

    //Gets the text text from the input box and processes it
    function getResponse() {
        let userText = $("#textInput").val();
        
        if (userText == "") {
            userText = "";
        }

        let userHtml = `<p class="userText"><span class="${classe}">${nomeJogador}</span><span class="texto">${userText}</span></p>`;

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

    }

    // Handles sending text via button clicks
    function buttonSendText(sampleText) {
        let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

        $("#textInput").val("");
        $("#chatbox").append(userHtml);
        document.getElementById("chat-bar-bottom").scrollIntoView(true);

    }

    function sendButton() {
        getResponse();
    }

    // Press enter to send a message
    const textInput = document.querySelector('#textInput');
    textInput.addEventListener('keypress', e => {
        if(e.which === 13){
            getResponse();
        }
    })

}
module.exports = chat;