require('dotenv').config();
const pgp = require('pg-promise')();

const db = pgp({
    user: process.env.USER_STRING,
    password: process.env.PASSWORD_STRING,
    host: process.env.HOST_STRING,
    port: process.env.PORT_NUMBER,
    database: process.env.DATABASE_STRING
});


module.exports = db;
