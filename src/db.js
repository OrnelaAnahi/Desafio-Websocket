const knexMysql = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port:'3306',
    user: 'root',
    password: '',
    database: 'database_productos'
  },
  pool: {min: 2, max: 8}
})

knexMysql.schema.createTableIfNotExists('productos', (table) => {
  table.increments('id').primary()
  table.string('nombre')
  table.float('precio')
  table.string('url_imagen')
  table.timestamp('fecha_creacion').defaultTo(knexMysql.fn.now())
}).then(()=>{
  console.log('tabla productos creada')
}).catch((err)=>{
  console.log(err)
})

module.exports = knexMysql