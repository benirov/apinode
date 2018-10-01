'use strict'

const services = require('../services')

function isAuth(req, res, next)
{
  console.log(req.headers.authorization)
  if(!req.headers.authorization)
  {
    return res.status(403).send({message: 'no tienes autorizaciòn'});
  }
    let tokenReq = 'Bearer '+req.headers.authorization; 
    const token = tokenReq.split(" ")[1];
    console.log(`token: ${token}`);


  services.decodeToken(token)
  .then(response =>
    {
      req.user = response;
      next();
    })
  .catch(response =>
    {
      res.status(response.status).send({message: response.message})
    })
}
module.exports = isAuth
