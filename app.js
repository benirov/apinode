'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app =  express();
const api = require('./route'); 
const path = require('path');  

app.use(bodyParser.urlencoded({extended : false}));  
app.use(bodyParser.json());

// const publicPath = path.join(__dirname, '../views'); 
                
app.engine('handlebars', hbs({defaultLayout: 'default'}));

app.set('view engine', 'handlebars'); 

app.use(express.static(__dirname + '/views')); 

app.get('/', (req, res) =>
{
  res.render('index')
});

app.get('/login', (req, res) =>
{
  res.render('login'), {
    title: 'login'
  }
});
app.get('/products', (req, res) =>
{
  res.render('product');
});

app.use('/api', api);

module.exports = app;
