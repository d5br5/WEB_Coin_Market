const express = require("express");
const app = express();
app.use(express.static('public'));

const jwt=require("jsonwebtoken");
const mongoose = require("mongoose");
const fs = require("fs");
const bodyParser = require('body-parser');
const sanitizeHtml = require('sanitize-html');

const helmet = require("helmet");
app.use(helmet());

const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
const mongodbLink = "mongodb+srv://coinmaster:1111@coin.mpw8h.mongodb.net/coins?retryWrites=true&w=majority"
mongoose.connect(mongodbLink, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//routing
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const coinRouter = require('./routes/coins');
const assetRouter = require('./routes/assets');

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/coins', coinRouter);
app.use('/assets', assetRouter);

app.use(function (req, res, next) {
    res.status(404).send('404 error : No such page');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Check Your Fault')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})

