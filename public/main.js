const socket = io()

socket.on('msj_del_backend', (data) => {
  console.log(data)
  socket.emit('message_client', 'Hola desde el cliente')
})


socket.on('productos', (productos)=>{
  lastPord = productos.length - 1;
  let refresh_table = `                                                        
    <td align="center">${productos[lastPord].nombre}</td>
    <td align="center">${productos[lastPord].precio}</td>
    <td align="center"><img src="${productos[lastPord].url}" height="170px"  alt="5"></td>
  `
  const tr = document.createElement('tr')
  tr.innerHTML = refresh_table
  document.getElementById("tabla").appendChild(tr)
  document.getElementById("cajaTbody").remove()
})


const formProductos = document.getElementById('formProducts')
formProductos.addEventListener('submit', function(e){
  e.preventDefault()
  let producto ={
    nombre: e.target.nombre.value,
    precio: parseInt(e.target.precio.value),
    url: e.target.url.value
  }
  socket.emit('productos_front', producto)
  console.log(producto)
  e.target.reset()
})

const formMsj = document.getElementById('formChat')
formMsj.addEventListener('submit', function(e){
  e.preventDefault
  let msj ={
    mail: e.target.mail.value,
    mensaje: e.target.mensaje.value
  }
  socket.emit('nuevoMensaje', msj)
  e.target.reset()
})

function renderMsj(msj){
  const html = msj.map(e=>{
    return `
      <div>
        <b style="color:blue;">${e.mail}</b>
        [<span style="color:brown;">${e.fyh}</span>] :
        <i style="color:green;">${e.mensaje}</i>
      </div>
    `
  }).join(" ")
  document.getElementById("cajaMensajes").innerHTML = html
}
socket.on('mensajes', (msj)=>{
  renderMsj(msj)
})