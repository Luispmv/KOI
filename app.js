// // Invocamos a express

// const express = require('express');
// const app = express()

// // Invocamos a axios
// const axios = require('axios');


// // Utilizando express url  para capturar los datos del formulario
// app.use(express.urlencoded({extended:false}))
// app.use(express.json())

// // Invocamos a dotenv
// const dotenv = require("dotenv")
// dotenv.config({path:"./env/.env"})


// // Configurando el directorio public
// app.use("/resources", express.static("public"))
// app.use("/resources", express.static(__dirname + "/public"))

// app.use(express.urlencoded({ extended: true }));




// // Establecer motor de plantillas
// app.set('view engine', 'ejs');

// // Invocamos al modulo para hashear la contraseña
// const bcryptjs = require("bcryptjs")


// // Variables de sesion
// const sesion = require("express-session")
// app.use(sesion({
//     secret:'secret',
//     resave: true,
//     saveUninitialized:true
// }))


// // Breakpoint commit


// // Invocamos al modulo de conexion a la base de datos
// const connection = require("./database/db");
// const { name } = require('ejs');


// // Estableciendo rutas
// app.listen(3000, (req, res)=>{
//     console.log("Servidor corriendo en http://localhost:3000")
// })

// app.get("/register", (req, res)=>{
//     res.render("register")
// })


// app.get("/login", (req, res)=>{
//     res.render("login")
// })


// // app.get("/catalogo", (req, res) => {
// //     if (req.session.loggedin) {
// //         res.render("catalogo", {
// //             login: true,
// //             name: req.session.name, // Pasamos el nombre del usuario
// //         });
// //     } else {
// //         res.render("catalogo", {
// //             login: false,
// //             name: null, // Puedes ajustar esto según lo que quieras mostrar
// //         });
// //     }
// // });

// app.get("/puntosVenta", (req, res)=>{
//     if(req.session.loggedin){
//         res.render("puntosVenta",{
//             login: true,
//             name: req.session.name,
//         })
//     }else{
//         res.render("catalogo", {
//             login: false,
//             name: null
//         })
//     }
// })

// app.get("/catalogo", async (req, res) => {
//     try {
//         if (req.session.loggedin) {
//             // Llamada a la API para obtener los productos
//             const apiResponse = await axios.get('https://api.escuelajs.co/api/v1/products'); 
//             const productos = apiResponse.data; 

//             // Renderizamos la vista con los datos del usuario y los productos
//             res.render("catalogo", {
//                 login: true,
//                 name: req.session.name, 
//                 productos,
//             });
//         } else {
//             // Si el usuario no está autenticado, mostramos un mensaje
//             res.render("catalogo", {
//                 login: false,
//                 name: null,
//                 productos: [], 
//             });
//         }
//     } catch (error) {
//         console.error("Error al obtener los productos de la API:", error.message);

//         res.render("catalogo", {
//             login: req.session.loggedin || false,
//             name: req.session.name || null,
//             productos: [],
//         });
//     }
// });



// // Metodos para registro de usuarios
// app.post('/register', async(req, res)=>{
//     const user = req.body.user;
//     const name = req.body.name;
//     const rol = req.body.rol;
//     const pass = req.body.pass;
//     let passwordHash = await bcryptjs.hash(pass, 8);
//     connection.query('INSERT INTO usuarios SET ?', {
//         user:user,
//         name: name,
//         rol:rol,
//         password:pass
//     }, async(error, results)=>{
//         if(error){
//             console.log(error)
//         }else{
//         //    res.send("REGISTRO EXITOSO")
//             res.render("register", {
//                 alert:true,
//                 alertTitle: "Registration",
//                 alertMessage:"!Succesful Registration",
//                 alertIcon: "success", 
//                 showConfirmButton:false,
//                 timer:1500,
//                 ruta:''
//             })
//         }
//     })
// })

// app.post("/auth", async (req, res) => {
//     console.log(req.body);
//     const user = req.body.user;
//     const pass = req.body.pass;
//     let passwordHash = await bcryptjs.hash(pass, 8);
//     console.log(res)
//     if (user && pass) {
//         connection.query("SELECT * FROM usuarios WHERE user = ?", [user],
//             async (error, results) => {
//                 if (results.length == 0 || pass !== results[0].password) {
//                     // res.send("USUARIO O PASSWORD INCORRECTAS");
//                     res.render("login",{
//                         alert:true,
//                         alertTitle: "Error",
//                         alertMessage: "Usuario y/o password incorrectas",
//                         alertIcon: "error",
//                         showConfirmButton: true,
//                         timer: false,
//                         ruta: "login"
//                     })
//                 } else {
//                     req.session.loggedin = true
//                     req.session.name = results[0].name
//                     // res.send("LOGIN CORRECTO");
//                     res.render("login",{
//                         alert:true,
//                         alertTitle: "Conexion Exitosa",
//                         alertMessage: "!Bienvenido!",
//                         alertIcon: "success",
//                         showConfirmButton: false,
//                         timer: 1500,
//                         ruta: ""
//                     })
//                 }
//             }
//         );
//     }else{
//         // res.send("Por favor completa los campos")
//         res.render("login",{
//             alert:true,
//             alertTitle: "Advertencia",
//             alertMessage: "!Por favor ingresa tu usuario y contraseña!",
//             alertIcon: "warning",
//             showConfirmButton: true,
//             timer: false,
//             ruta: "login"
//         })
//     }
// });




// // Autenticacion para las paginas (SESION EN UNA PAGINA)
// app.get("/",(req, res)=>{
//     if(req.session.loggedin){
//         res.render('index',{
//             login: true,
//             name: req.session.name
//         })
//     }else{
//         res.render("index", {
//             login: false,
//             name: "Bienvendio a KOI"
//         })
//     }
// })



// // CERRRAR SESION
// app.get("/logout", (req, res)=>{
//     req.session.destroy(()=>{
//         res.redirect("/")
//     })
// })


const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });
const session = require("express-session");
const connection = require("./database/db"); // Conexión a Supabase

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configurando el directorio public
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));

// Establecer motor de plantillas
app.set('view engine', 'ejs');

// Variables de sesión
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Estableciendo rutas
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

// Ruta para la página principal (raíz)
app.get("/", (req, res) => {
    res.render("index", {
        login: req.session.loggedin || false,  // Pasa la variable login
        name: req.session.name || null
    });
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/puntosVenta", (req, res) => {
    if (req.session.loggedin) {
        res.render("puntosVenta", {
            login: true,
            name: req.session.name,
        });
    } else {
        res.render("catalogo", {
            login: false,
            name: null
        });
    }
});

app.get("/catalogo", async (req, res) => {
    try {
        if (req.session.loggedin) {
            // Llamada a la API para obtener los productos
            const apiResponse = await axios.get('https://api.escuelajs.co/api/v1/products');
            const productos = apiResponse.data;

            // Renderizamos la vista con los datos del usuario y los productos
            res.render("catalogo", {
                login: true,
                name: req.session.name,
                productos,
            });
        } else {
            // Si el usuario no está autenticado, mostramos un mensaje
            res.render("catalogo", {
                login: false,
                name: null,
                productos: [],
            });
        }
    } catch (error) {
        console.error("Error al obtener los productos de la API:", error.message);

        res.render("catalogo", {
            login: req.session.loggedin || false,
            name: req.session.name || null,
            productos: [],
        });
    }
});

// Metodos para registro de usuarios
app.post('/register', async(req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;

    // Asegúrate de utilizar correctamente los valores con placeholders
    connection.query('INSERT INTO usuarios ("user", name, rol, password) VALUES ($1, $2, $3, $4)', [user, name, rol, pass], (error, results) => {
        if (error) {
            console.log(error);
            res.render("register", {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Hubo un error en el registro.",
                alertIcon: "error",
                showConfirmButton: true,
                timer: false,
                ruta: "register"
            });
        } else {
            res.render("register", {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "!Registro Exitoso!",
                alertIcon: "success", 
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            });
        }
    });
});


// Método de autenticación
app.post("/auth", async (req, res) => {
    console.log(req.body);
    const user = req.body.user;
    const pass = req.body.pass;
    console.log(res);
    if (user && pass) {
        connection.query("SELECT * FROM usuarios WHERE \"user\" = $1", [user], (error, results) => {
            if (error) {
                console.log(error);
                return res.render("login", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Hubo un error al autenticar el usuario",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "login"
                });
            }

            // Usar results.rows para acceder a los datos
            if (results.rows.length == 0 || pass !== results.rows[0].password) {
                res.render("login", {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "login"
                });
            } else {
                req.session.loggedin = true;
                req.session.name = results.rows[0].name;
                res.render("login", {
                    alert: true,
                    alertTitle: "Conexion Exitosa",
                    alertMessage: "!Bienvenido!",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ""
                });
            }
        });
    } else {
        res.render("login", {
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "!Por favor ingresa tu usuario y contraseña!",
            alertIcon: "warning",
            showConfirmButton: true,
            timer: false,
            ruta: "login"
        });
    }
});


// CERRAR SESION
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
});
