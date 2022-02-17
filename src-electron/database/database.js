
import sqlite3 from "sqlite3"
const database = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    },
    useNullAsDefault:true
  });

database.schema.hasTable('students').then((exists) =>{
    if(!exists){
        return database.schema.createTable('students',function(table){
            table.increments('id').primary();
            table.string('name', 100);
            table.string('class', 100);
            table.enu('gender',['Male','Female'])
            table.enu('residency',['Boarding','Day'])
            table.timestamps()
        })
    }
})
database.schema.hasTable('incomes').then((exists) => {
  if(!exists) {
    return database.schema.createTable('incomes',function(table) {
      table.increments('id').primary();
      table.integer('amount',100)
      table.string('category',100)
      table.string('date',100)
      table.string('description',100)
      table.string('reference_number',100)
      table.timestamps()
    })
  }
})
database.schema.hasTable('expenses').then((exists) => {
  if(!exists) {
    return database.schema.createTable('expenses',function(table) {
      table.increments('id').primary();
      table.integer('amount',100)
      table.string('category',100)
      table.string('date',100)
      table.string('description',100).nullable()
      table.string('reference_number',100).nullable()
      table.timestamps()
    })
  }
})
// database.schema.hasTable('fees_structures').then((exists) => {
//   if(!exists) {
//     return database.schema.createTable('fees_structures',function(table) {
//       table.increments('id').primary();
//       table.string('student_id',100)
//       table.string('category',100)
//       table.string('date',100)
//       table.string('description',100)
//       table.integer('amount')
//       table.timestamps()
//     })
//   }
// })
export default database;