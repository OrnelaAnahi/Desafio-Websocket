const socket = io()

socket.on('msj_del_backend', (data) => {
  console.log(data)
  socket.emit('message_client', 'Hola desde el cliente')
})


socket.on('productos', (productos) => {
  lastPord = productos.length - 1;
  let refresh_table = `                                                        
    <td align="center">${productos[lastPord].nombre}</td>
    <td align="center">${productos[lastPord].precio}</td>
    <td align="center"><img src="${productos[lastPord].url_imagen}" height="150px"  alt="5"></td>
  `
  const tr = document.createElement('tr')
  tr.innerHTML = refresh_table
  document.getElementById("tabla").appendChild(tr)
  document.getElementById("cajaTbody").remove()
})


const formProductos = document.getElementById('formProducts')
formProductos.addEventListener('submit', function (e) {

  e.preventDefault()
  let producto = {
    nombre: e.target.nombre.value,
    precio: parseInt(e.target.precio.value),
    url: e.target.url.value
  }
  socket.emit('productos_front', producto)
  console.log(producto)
  e.target.reset()
})


const formMsj = document.getElementById('formChat')
formMsj.addEventListener('submit', function (e) {
  debugger
  e.preventDefault
  let msj = {
    author: {
      mail: e.target.mail.value,
      nombre: e.target.nombre.value,
      apellido: e.target.apellido.value,
      edad: e.target.edad.value,
      alias: e.target.alias.value,
    },
    mensaje: {
      id: Math.floor(Math.random() * 20),
      author: {
        mail: e.target.mail.value,
        nombre: e.target.nombre.value,
        apellido: e.target.apellido.value,
        edad: e.target.edad.value,
        alias: e.target.alias.value,
      },
      comment: e.target.mensaje.value,
    }
  }
  socket.emit('nuevoMensaje', msj)
  e.target.reset()
})

function renderMsj(msj) {
  const html = msj.map(e => {
    return `
      <div class="msj">
        <b style="color:blue;">${e.mail}</b>
        [<span style="color:brown;">${e.fyh}</span>] :
        <i style="color:green;">${e.mensaje}</i>
      </div>
    `
  }).join(" ")
  document.getElementById("cajaMensajes").innerHTML = html
}
socket.on('mensajes', (msj) => {
  renderMsj(msj)
})