// const mysql =  require("mysql")
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// })

// connection.connect((error)=>{
//     if(error){
//         console.log("El error de la conexion es: "+ error)
//         return;
//     }
//     console.log("!Conectado a la base de datos")
// })

// module.exports = connection;


const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

client.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.stack);
  } else {
    console.log('Conectado a la base de datos en Supabase');
  }
});

module.exports = client;
