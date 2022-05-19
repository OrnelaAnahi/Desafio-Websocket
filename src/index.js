const express = require('express')
const app = express()

// SERVER
const http = require('http')
const server = http.createServer(app)



// SOCKET
const {Server} = require('socket.io')
const io = new Server(server)


// ARCHIVOS ESTATICOS
app.use(express.static('./public'))

// EJS
app.set('views', './views', )
app.set('view engine', 'ejs')

// CONTENEDOR
const ContenedorProductos = require('../contenedores/ContenedorProductos')
const ContenedorMensajes = require('../contenedores/ContenedorMensajes')

const productos = new ContenedorProductos('productos')
const msj = new ContenedorMensajes('mensajes')




io.on('connection', async (socket)=> {

  console.log('Usuario conectado')

  socket.emit('msj_del_backend', 'hola desde el backend')

  socket.on('message_client', (data) => {
    console.log(data)
  })

  socket.emit('mensajes', await msj.getAllMensajes())
  // actualizacion de mensajes
  socket.on('nuevoMensaje', async (mensaje) => {
    msj.addMensaje(mensaje.mail, mensaje.mensaje)
    socket.emit('mensajes', await msj.getAllMensajes())
  })
  
  // RECIBIR PRODUCTOS
  socket.on('productos_front', async (data) => {
    console.log(data)
    productos.addProduct(data.nombre, data.precio, data.url)
    let todosLosProductos = await productos.getAllProducts()
    socket.emit('productos', todosLosProductos)
  })
})



app.get('/', async (req, res) => {
  let todosLosProductos = await productos.getAllProducts()
  res.render('index', {todosLosProductos})
})




// SERVER LISTEN

server.listen(8080,()=>{
  console.log('server is running on port 8080')
})