'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema(
  {
    name: String,
    img: String,
    price: {type: Number, default: 0},
    category: {type: String, enum: ['computer', 'phones', 'accesories']},
    description: String,

  });

  module.exports =  mongoose.model('Product', productSchema); /*para que sea accesible desde toda la aplicacion*/
