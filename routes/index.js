const { Router } = require('express')

const router = Router()

const ContenedorProductos = require('../contenedores/ContenedorProductos')
const productos = new ContenedorProductos('productos')


router.get('/', async (req, res) => {
  let todosLosProductos = await productos.getAllProducts()
  res.render('index', { todosLosProductos })
})

router.post('/logout', (req, res) => {
  setTimeout(() => {
    console.log('hola')
    req.session.destroy()
    res.redirect('/api/login')
  }, 2000)
})

module.exports = router