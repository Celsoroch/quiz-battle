const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use('/', require('./router/rotas'));

app.listen(3000, () => {
    console.log('Servidor rodando!');
    console.log('http://localhost:3000');
})