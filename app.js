const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { port } = require('./config');
const userRouter = require('./routes/users');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//render landing page
app.get('/', (req, res) => res.render('./index'));
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server listening at PORT: ${port}`);
});