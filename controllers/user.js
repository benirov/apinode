'use strict'

const moongose = require('mongoose');
const User = require('../models/user');
const services = require('../services/')


function signUp(req, res)
{
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save((error) =>
  {
    if(error)
    {
      console.log(error)
      res.status(500).send({message: 'Error al crear usuario'})
    }
    else
    {
      return res.status(200).send({token: services.createToken(user)})
    }
  })

}

function signIn(req, res)
{
  User.find({email: req.body.email}, (error, user) =>
  {
    if(error)
    {
      return res.status(500).send({message: error});
    }
    else if(!user)
    {
      return  res.status(404).send({message: 'no existe el usuario'});
    }
    else
    {
      req.user = user;
      res.status(200).send({
        message: 'logueado correctamente',
        token: services.createToken(user)
      });
    }
  });
}

function getUsers(req, res)
{
  User.find({}, (error, user) =>
  {
    res.status(200).send(user);
  })
}

function deleteUser(req, res)
{
  let id = req.params.id;
  User.findById(id, (error, user) =>
  {
    console.log(user);
    user.remove(error =>
      {
        res.status(200).send({message: `User con id: ${id} eliminado`});
      })
  })
}

module.exports =
{
  signUp,
  signIn,
  getUsers,
  deleteUser
}
