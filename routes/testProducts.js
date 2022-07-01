const express = require('express')

const { Router } = express

let router = new Router()


// FAKER
const { faker } = require('@faker-js/faker')


const productosTest = []

router.get('/', (req, res) => {
  for (let i = 0; i <= 5; i++) {
    let producto = faker.vehicle.vehicle()
    productosTest.push({
      nombre: producto,
      precio: faker.commerce.price(10000000, 500000000),
      url_imagen: faker.image.imageUrl(150, 150, 'vehicle')
    })
    console.log(producto)
  }
  res.render('index', { todosLosProductos: productosTest })
})


module.exports = router