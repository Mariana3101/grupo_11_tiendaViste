const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');
const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
//parseo para llamarlo en el metodo todosLosProductos
const todosLosProductos = JSON.parse(fs.readFileSync(ubicacionProductosJSON, 'utf-8'));

// Constants
const userFilePath = path.join(__dirname, "../data/users.json");


// Helper Functions
function getAllUsers() {
    let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
    return finalUsers;
}

function getUserById(id) {
    let allUsers = getAllUsers();
    let userById = allUsers.find(oneUser => oneUser.id == id);
    return userById;
}

const controller = {
    root: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('index', { isLogged, userLogged });

    },

    /*index: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('index', { isLogged, userLogged });
    },*/

    mostrarCargaProducto: (req, res) => {
        let productos = JSON.parse(contenidoProductosJSON);
        res.render('cargaProducto', { productos });
    },


    cargaProducto: (req, res) => {

        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        req.body = {
            id: arrayDeProductos.length + 1,
            ...req.body,

        };


        req.body.creador = 'Producto guardado por equipo Viste';
        //req.body.avatar = req.file.filename;

        arrayDeProductos.push(req.body);

        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("¡Producto guardado!");

    },

    carrito: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('carrito', { isLogged, userLogged });

    },
    registrar: (req, res) => {
        res.render('registrar')
    },
    detalleProducto: (req, res) => {
        let idProducto = req.params.id;

        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('detalleProducto', {
            idProducto: idProducto,
            elProducto: elProducto,

        });
    },

    todosLosProductos: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos,isLogged, userLogged});        
        },

    editarProducto: (req, res) => {
        let idProducto = req.params.id;
        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('editar', {
            idProducto: idProducto,
            elProducto: elProducto,

        });

    },

    productoEditado: (req, res) => {
        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        arrayDeProductos.forEach(element => {
            console.log(req.body.avatar);
            if (element.id == req.body.id) {
                element.categoria = req.body.categoria;
                element.talle = req.body.talle;
                element.color = req.body.color;
                element.producto = req.body.producto;
                element.cantidad = req.body.cantidad;
                element.precio = req.body.precio;
                element.avatar = req.body.avatar;
            }
        });


        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        return res.redirect('/');
    },

    borrarProducto: (req, res) => {
        let productosArray = JSON.parse(contenidoProductosJSON);
        let productosSinElQueBorramos = productosArray.filter(function(unProducto) {
                return unProducto.id != req.params.id;
            })
            // guardo el array con los productos finales
        fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));
        return res.redirect('/');
    },

    nosotros: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('nosotros', { isLogged, userLogged });
    },
};

module.exports = controller;