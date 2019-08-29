const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartial(__dirname + '/views/partials'); //setting up for using handlebars partial files

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); //static content serving,using middleware

app.get('/', (req, res) => {    //is this a type of API??
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Well hello there!!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});


app.get('/bad', (req, res) => {
        res.send({
            errorMessage: "error of some kind. huh. Well actually I can't handle this request."
        });
});

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});