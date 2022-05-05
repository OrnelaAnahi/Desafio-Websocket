

const express = require('express')
const app = express()

// SERVER
const http = require('http')
const server = http.createServer(app)



// SOCKET
const {Server} = require('socket.io')
const io = new Server(server)


// ARCHIVOS ESTATICOS
app.use(express.static(__dirname + '/public'))

// EJS
app.set('views', __dirname+"/views")
app.set('view engine', 'ejs')

// CONTENEDOR
const ContenedorArchivo = require('./contenedores/ContenedorArchivo')

// MENSAJES
const msj = new ContenedorArchivo('msj.json')


// PRODUCTOS
const productos = []

io.on('connection', async (socket)=> {

  console.log('Usuario conectado')

  socket.emit('msj_del_backend', 'hola desde el backend')

  socket.on('message_client', (data) => {
    console.log(data)
  })

  socket.emit('mensajes', await msj.listarAll())
  // actualizacion de mensajes
  socket.on('nuevoMensaje', async mensaje => {
      mensaje.fyh = new Date().toLocaleString()
      await msj.guardar(mensaje)
      io.sockets.emit('mensajes', await msj.listarAll());
  })
  
  // RECIBIR PRODUCTOS
  socket.on('productos_front', (data) => {
    data.id = productos.length + 1
    productos.push(data)
    socket.emit('productos', productos)
  })
})



app.get('/', (req, res) => {
  res.render('index', {productos})
})




// SERVER LISTEN

server.listen(8080,()=>{
  console.log('server is running on port 8080')
})