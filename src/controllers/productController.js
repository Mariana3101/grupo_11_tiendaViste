const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

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

    create: (req, res) => {


        db.Products
            .findAll()
            .then(Products => {
                db.Categories
                    .findAll()
                    .then(categories => {
                        return res.render('productos/cargaProducto', { Products, categories });
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    },
    /*
    const isLogged = req.session.userId ? true : false;
    let userLogged = getUserById(req.session.userId);

    let productos = getProducts();
    res.render('productos/cargaProducto', { productos, isLogged, userLogged });*/


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
        return res.render('productos/todosLosProductos', { isLogged, userLogged, todosLosProductos })

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

        res.render('productos/detalleProducto', {
            idProducto: idProducto,
            elProducto: elProducto,
            isLogged,
            userLogged

        });
    },

    show: (req, res) => {
        db.Products
            .findAll({
                include: ['user', 'categories']
            })
            .then(products => {
                return res.render('productos/todosLosProductos', { products });
            })
            .catch(error => console.log(error));

        /* res.render('productos/todosLosProductos');

        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();

        res.render('productos/todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos,
            isLogged,
            userLogged
        });*/
    },

    editarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();

        let idProducto = req.params.id;
        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('productos/editar', {
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

        return res.redirect('/productos/todosLosProductos');
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

        return res.redirect('/productos/todosLosProductos');
    },
};

module.exports = controller;