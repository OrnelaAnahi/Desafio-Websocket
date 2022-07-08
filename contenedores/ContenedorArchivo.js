const { promises: fs } = require('fs')

// const { normalize, schema } = require("normalizr")
// const { inspect } = require("util")

// // ESQUEMA PARA NORMALIZACION
// const authorSchema = new schema.Entity('author')

// const mensajeSchema = new schema.Entity('mensaje', {
//   user: authorSchema,
// })

// const singlePostsSchema = new schema.Entity('singlePosts', {
//   user: authorSchema,
//   mensaje: [mensajeSchema]
// })

// const postsSchema = new schema.Entity('posts', {
//   posts: [singlePostsSchema]
// })

// function print(obj) {
//   console.log(inspect(obj, false, 12, true))
// }






class ContenedorArchivo {

  constructor(ruta) {
    this.ruta = ruta;
  }

  async listarAllArray() {
    try {
      const objs = await fs.readFile(this.ruta, 'utf-8')
      return JSON.parse(objs)
    } catch (error) {
      return []
    }

  }

  async listarAll() {
    try {
      const objs = await fs.readFile(this.ruta, 'utf-8')
      const { mensajes } = JSON.parse(objs)
      return mensajes
    } catch (error) {
      return []
    }
  }

  // async listarAllNormalizado() {
  //   const info = await this.listarAllArray()
  //   const normalizado = normalize(info, postsSchema)
  //   print(normalizado)
  // }


  async guardar(obj) {
    const objs = await this.listarAllArray()
    objs.mensajes.push(obj)
    try {
      await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
      console.log('Se guardo el mensaje')
    } catch (error) {
      console.log(`Error al guardar: ${error}`)
    }
  }
}

module.exports = ContenedorArchivo 