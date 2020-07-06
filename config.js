require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbname: process.env.DB_NAME
};