const { Router } = require('express')

const router = Router()

const ContenedorProductos = require('../contenedores/ContenedorProductos')
const productos = new ContenedorProductos('productos')

router.get('/', (req, res) => {
  res.render('form')
})
router.post('/', async (req, res) => {
  for (const key in req.body) {
    req.session[key] = req.body[key]
  }
  res.send({ 'Sessionn------------------': req.session })
  // res.render('index', { todosLosProductos: await productos.getAllProducts() })
})


module.exports = router