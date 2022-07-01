const express = require('express')
const app = express()

// SERVER
const http = require('http')
const server = http.createServer(app)

// ROUTES
const testProducts = require('../routes/testProducts')

// SOCKET
const { Server } = require('socket.io')
const io = new Server(server)


// ARCHIVOS ESTATICOS
app.use(express.static('./public'))

// EJS
app.set('views', './views',)
app.set('view engine', 'ejs')

// CONTENEDOR
const ContenedorProductos = require('../contenedores/ContenedorProductos')
// const ContenedorMensajes = require('../contenedores/ContenedorMensajes')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo')

const productos = new ContenedorProductos('productos')
// const msj = new ContenedorMensajes('mensajes')
const msj = new ContenedorArchivo('msj.json')



io.on('connection', async (socket) => {

  console.log('Usuario conectado')

  socket.emit('msj_del_backend', 'hola desde el backend')

  socket.on('message_client', (data) => {
    console.log(data)
  })

  socket.emit('mensajes', await msj.listarAll())
  // actualizacion de mensajes
  socket.on('nuevoMensaje', async (mensaje) => {
    msj.guardar({ author: mensaje.author, mensaje: mensaje.mensaje, })
    socket.emit('mensajes', await msj.listarAll())
  })
  await msj.listarAllNormalizado()
  // RECIBIR PRODUCTOS
  socket.on('productos_front', async (data) => {
    console.log(data)
    productos.addProduct(data.nombre, data.precio, data.url)
    let todosLosProductos = await productos.getAllProducts()
    console.log(await productos.getAllProducts())
    socket.emit('productos', todosLosProductos)
  })
})



app.get('/', async (req, res) => {
  let todosLosProductos = await productos.getAllProducts()
  res.render('index', { todosLosProductos })
})

app.use('/api/productos-test', testProducts)



// SERVER LISTEN

server.listen(8080, () => {
  console.log('server is running on port 8080')
})