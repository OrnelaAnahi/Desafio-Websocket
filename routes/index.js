const { Router } = require('express')

const router = Router()

const ContenedorProductos = require('../contenedores/ContenedorProductos')
const productos = new ContenedorProductos('productos')


router.get('/', async (req, res) => {
  let todosLosProductos = await productos.getAllProducts()
  res.render('index', { todosLosProductos })
})


module.exports = router