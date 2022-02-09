
import sqlite3 from "sqlite3"
const database = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./db.sqlite"
    }
  });

database.schema.hasTable('students').then((exists) =>{
    if(!exists){
        return database.schema.createTable('students',function(table){
            table.increments('id').primary();
            table.string('name', 100);
            table.string('class', 100);
        })
    }
})
export default database;