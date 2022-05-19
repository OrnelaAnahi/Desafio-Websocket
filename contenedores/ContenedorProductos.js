const knex = require('../src/db')

class ContenedorProductos{

  constructor(table){
    this.table = table
  }
  
  addProduct(nombre,precio,url_imagen){

    let product ={nombre, precio, url_imagen}

    knex(this.table).insert(product).then(()=>{
      console.log('producto agregado')
    }).catch((err)=>{
      console.log(err)
    })

  }

  getAllProducts(){
    const productos = knex.from(this.table).select('*').then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
    })
    return productos
  }

}

module.exports = ContenedorProductos