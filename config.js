'use estrict'

module.exports =
{
  port: process.env.PORT || 3000,
  db: process.env.MONGOD || 'mongodb://localhost:27017/shop',
  SECRET_TOKEN : 'mykeytoken'
}
