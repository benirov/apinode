'use strict'

const express = require('express');
const ProductCtrl = require('../controllers/product.js');
const auth = require('../middleware/auth.js');
const userCtrl = require('../controllers/user')
const api = express.Router();
// rutas de productos
api.get('/products', auth, ProductCtrl.getProducts);

api.get('/product/:id', auth, ProductCtrl.getProduct);

api.post('/product', auth, ProductCtrl.saveProduct);

api.put('/product/:id', auth, ProductCtrl.updateProduct)

api.delete('/product/:id', auth, ProductCtrl.deleteProduct);

api.get('/private', auth, (req, res) =>
{
  res.status(200).send({message: 'Tiene Acceso'})
});

// rutas de usuarios

api.get('/users', auth, userCtrl.getUsers);
api.post('/signup', userCtrl.signUp);

api.post('/signin', userCtrl.signIn);
api.post('/deleteuser/:id', auth, userCtrl.deleteUser);

module.exports = api;
