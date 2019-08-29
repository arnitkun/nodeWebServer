const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //setting up for using handlebars partials
app.set('view engine', 'hbs');//setting the view engine as hbs. But what is the view engine?
app.use(express.static(__dirname + '/public')); //static content serving,using middleware

app.use((req, res, next) => {//next checks when the current request is done
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err) console.log('Unable to append log.');  
    });
    next();
});//app.use registers middleware

app.use('/maintenance', (req, res, next) => {
    res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {//is this a type of API??
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Well hello there!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
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