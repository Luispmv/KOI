// Invocamos a express

const express = require('express');
const app = express()


// Utilizando express url  para capturar los datos del formulario
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Invocamos a dotenv
const dotenv = require("dotenv")
dotenv.config({path:"./env/.env"})


// Configurando el directorio public
app.use("/resources", express.static("public"))
app.use("/resources", express.static(__dirname + "/public"))



// Establecer motor de plantillas
app.set('view engine', 'ejs');

// Invocamos al modulo para hashear la contraseña
const bcryptjs = require("bcryptjs")


// Variables de sesion
const sesion = require("express-session")
app.use(sesion({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}))


// Breakpoint commit


// Invocamos al modulo de conexion a la base de datos
const connection = require("./database/db")


// Estableciendo rutas
app.listen(3000, (req, res)=>{
    console.log("Servidor corriendo en http://localhost:3000")
})

app.get("/", (req, res)=>{
    res.render("index", {msg:"MENSAJE DESDE NODE"})
})

app.get("/register", (req, res)=>{
    res.render("register")
})


app.get("/login", (req, res)=>{
    res.render("login")
})


// Metodos para registro de usuarios
app.post('/register', async(req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO usuarios SET ?', {
        user:user,
        name: name,
        rol:rol,
        password:pass
    }, async(error, results)=>{
        if(error){
            console.log(error)
        }else{
            res.send('ALTA EXITOSA')
        }
    })
})