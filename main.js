const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();

app.use(function (req, res, next) {
    res.status(404).send('Sorry Cant find that');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})

