const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');
const todosLosProductos = getProducts();

//parseo para llamarlo en el metodo todosLosProductos

function getProducts() {
    const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
    return JSON.parse(contenidoProductosJSON);
}

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

    mostrarCargaProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        let productos = getProducts();
        res.render('cargaProducto', { productos, isLogged, userLogged });
    },

    cargaProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        req.body = {
            id: arrayDeProductos.length + 1,
            ...req.body

        };

        req.body.creador = 'Producto guardado por equipo Viste';
        req.body.avatar = req.file.filename;

        arrayDeProductos.push(req.body);

        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);


        // res.send("¡Producto guardado!");
        return res.render('todosLosProductos', { isLogged, userLogged, todosLosProductos })

    },

    carrito: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('carrito', { isLogged, userLogged });

    },


    detalleProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        let idProducto = req.params.id;

        const todosLosProductos = getProducts();

        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('detalleProducto', {
            idProducto: idProducto,
            elProducto: elProducto,
            isLogged,
            userLogged

        });
    },

    todosLosProductos: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();

        res.render('todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos,
            isLogged,
            userLogged
        });
    },

    editarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();

        let idProducto = req.params.id;
        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('editar', {
            idProducto: idProducto,
            elProducto: elProducto,
            isLogged,
            userLogged

        });

    },

    productoEditado: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        let todosLosProductos = getProducts();

        todosLosProductos = todosLosProductos.map(function(unProducto) {
            if (unProducto.id == req.params.id) {
                unProducto = {
                    categoria: req.body.categoria,
                    talle: req.body.talle,
                    color: req.body.color,
                    producto: req.body.producto,
                    cantidad: req.body.cantidad,
                    precio: req.body.precio,
                    avatar: req.file ? req.file.filename : unProducto.avatar,
                }
                return unProducto;
            }
            return unProducto;
        })

        console.log(todosLosProductos);


        let contenidoAGuardar = JSON.stringify(todosLosProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        return res.redirect('/todosLosProductos');
    },

    borrarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();
        let productosSinElQueBorramos = todosLosProductos.filter(function(unProducto) {
            return unProducto.id != req.params.id;
        })

        // return res.send(productosSinElQueBorramos)
        // guardo el array con los productos finales
        fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));

        return res.redirect('/todosLosProductos');
    },
};
module.exports = controller;