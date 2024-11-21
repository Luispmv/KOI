// Invocamos a express

const express = require('express');
const app = express()

app.listen(3000, (req, res)=>{
    console.log("Servidor corriendo en http://localhost:3000")
})

app.get("/", (req, res)=>{
    res.send("Hola Mundo")
})

// Utilizando express url  para capturar los datos del formulario
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Invocamos a dotenv
const dotenv = require("dotenv")
dotenv.config({path:"./env/.env"})


// Configurando el directorio public
app.use("/resources", express.static("public"))
app.use("/resources", express.static(__dirname + "/public"))

