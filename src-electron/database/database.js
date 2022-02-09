
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
export default database;