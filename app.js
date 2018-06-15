'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const app =  express();

const api = require('./route');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.engine('.hbs', hbs({
  defaultlayout: 'default',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.get('/login', (req, res) =>
{
  res.render('login');
});
app.get('/products', (req, res) =>
{
  res.render('product');
});

app.use('/api', api);

module.exports = app;
