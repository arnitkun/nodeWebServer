const express = require('express');

var app = express();

app.use(express.static(__dirname + '/public')); //static content serving 

app.get('/', (req, res) => {    //is this a type of API??
    res.send('</h1>Ohkay..<h1>');
});

app.get('/about', (req, res) => {
    res.send('about page');
});

app.get('/bad', (req, res) => {
        res.send({
            errorMessage: "error of some kind. huh. Well actually I can't handle this request."
        });
});

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});