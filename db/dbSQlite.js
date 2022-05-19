
const knexSQlite = require('knex')({
  client: 'sqlite3',
  connection: { filename: './msj.sqlite'},
  useNullAsDefault: true
})

knexSQlite.schema.createTableIfNotExists('mensajes', (table) => {
  table.increments('id').primary()
  table.string('mail')
  table.string('mensaje')
  table.timestamp('fyh').defaultTo(knexSQlite.fn.now())
}).then(()=>{
  console.log('tabla mensajes creada')
}).catch((err)=>{
  console.log(err)
})

module.exports = knexSQlite