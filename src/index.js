const express = require('express')
const app = express()

// SERVER
const http = require('http')
const server = http.createServer(app)

// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// COOKIE, SESSION Y MONGO
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }



// ROUTES
const testProducts = require('../routes/testProducts')
const login = require('../routes/login')
const index = require('../routes/index')

// SOCKET
const { Server } = require('socket.io')
const io = new Server(server)


// ARCHIVOS ESTATICOS
app.use(express.static('./public'))

// COOKIES Y SESSION
app.use(cookieParser())
app.use(session({
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://ornela_anahi:ornela123@cluster0.dxfd6.mongodb.net/?retryWrites=true&w=majority',
    mongoOptions: advancedOptions
  }),
  secret: 'key',
  resave: true,
  saveUninitialized: true
}))


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

  // RECIBIR PRODUCTOS
  socket.on('productos_front', async (data) => {
    console.log(data)
    productos.addProduct(data.nombre, data.precio, data.url)
    let todosLosProductos = await productos.getAllProducts()
    console.log(await productos.getAllProducts())
    socket.emit('productos', todosLosProductos)
  })
})



app.use('/', index)

app.use('/api/productos-test', testProducts)

app.use('/api/login', login)



// SERVER LISTEN

server.listen(8080, () => {
  console.log('server is running on port 8080')
})
