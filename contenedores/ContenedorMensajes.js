const knexSQlite = require('../db/dbSQlite')

class ContenedorMensajes {
  constructor(table) {
    this.table = table
  }

  addMensaje(mail, mensaje) {
    let msj = { mail, mensaje }
    knexSQlite(this.table).insert(msj).then(() => {
      console.log('mensaje agregado')
    }).catch((err) => {
      console.log(err)
    })
  }

  getAllMensajes() {
    const mensajes = knexSQlite.from('mensajes').select('*').then((data) => {
      return data
    }).catch((err) => {
      console.log(err)
    })
    return mensajes
  }
}

module.exports = ContenedorMensajes