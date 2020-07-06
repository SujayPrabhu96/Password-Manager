const express = require('express');
const app = express();
const { port } = require('./config');

app.get('/', (req, res) => res.send('<h1>Welcome TO Password Manager</h1>'));

app.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
});