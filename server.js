const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./twoFactorAuth');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/2fa', routes);


app.get('/', (req,res) => {
    res.redirect("/2fa")
});


app.listen(port, () => {
  console.log(`Listening on port `+ port);
  console.log('127.0.0.1:'+port)
});

