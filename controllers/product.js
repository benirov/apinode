'use strict'

/* para utlizar el Shema que creamos en models/product*/
const Product = require('../models/product');

function getProduct(req, res)
{
  let id = req.params.id;
  Product.findById(id, (error, product) =>
  {
    if(error)
    {
      return res.status(500).send({message: `error al realizar la peticion: ${error}`});
    }
    else if(!product)
    {
      return res.status(404).send({message: `El prodcuto no existe`});
    }
    else
    {
      return res.status(200).send({product});
    }
  });
}

function getProducts(req, res)
{
  Product.find({}, (error, products) =>
  {
    if(error)
    {
      res.status(400).send({message: `error al realizar la peticion: ${error}`});
    }
    else if(!products)
    {
      res.status(404).send({message: 'no existen productos en la base de datos'});
    }
    else
    {
      res.status(200).send({products});
    }
  })

}

function saveProduct(req, res)
{
  console.log("POST /api/product");
  console.log(req.body);
  let product = new Product();
  product.name = req.body.name;
  product.img = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((error, statusProduct) =>
  {
    if(error)
    {
      res.status(500).send({message: `Error al guardar producto : ${error}`})
    }
    else
    {
      res.status(200).send({message: `producto guardado con id : ${statusProduct}`});
    }
  })

}

function updateProduct(req, res)
{
  let id = req.params.id;
  let update = req.body;

  Product.findByIdAndUpdate(id, update, (error, productUpdate) =>
  {
    if(error)
    {
      res.status(500).send({message: `error al actualizar el producto ${error}`});
    }
    else
    {
      res.status(200).send({product: productUpdate});
    }
  })

}

function deleteProduct(req, res)
{
  let id = req.params.id;

  Product.findById(id, (error, product) =>
  {
    if(error)
    {
      res.status(500).send({message: `Error al eliminar producto: ${error}`});
    }
    else
    {
      product.remove(err =>
        {
          if(err)
          {
            res.status(500).send({message: `Error al eliminar producto: ${err}`});
          }
          else
          {
            res.status(200).send({message: `Producto con id: ${id} eliminado`});
          }
        });
    }
  });

}

module.exports =
{
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
