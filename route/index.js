'use strict'

const express = require('express');
const ProductCtrl = require('../controllers/product.js');
const auth = require('../middleware/auth.js');
const userCtrl = require('../controllers/user')
const api = express.Router();
// rutas de productos
api.get('/product', auth, ProductCtrl.getProducts);

api.get('/product/:id', ProductCtrl.getProduct);

api.post('/product', ProductCtrl.saveProduct);

api.put('/product/:id', ProductCtrl.updateProduct)

api.delete('/product/:id', ProductCtrl.deleteProduct);

api.get('/private', auth, (req, res) =>
{
  res.status(200).send({message: 'Tiene Acceso'})
});

// rutas de usuarios

api.get('/users', userCtrl.getUsers);
api.post('/signup', userCtrl.signUp);

api.post('/signin', userCtrl.signIn);
api.post('/deleteuser/:id', userCtrl.deleteUser);

module.exports = api;
