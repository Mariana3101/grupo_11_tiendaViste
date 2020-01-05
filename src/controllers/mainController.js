const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');
const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
//parseo para llamarlo en el metodo todosLosProductos
const todosLosProductos = JSON.parse(fs.readFileSync(ubicacionProductosJSON, 'utf-8'));


const controller = {
    root: (req, res) => {
        res.render('index');
    },

    mostrarCargaProducto: (req, res) => {
        let productos = JSON.parse(contenidoProductosJSON);
        res.render('cargaProducto', { productos });
    },



    cargaProducto: (req, res, next) => {

        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        req.body = {
            id: arrayDeProductos.length + 1,
            ...req.body
        };

        req.body.creador = 'Producto guardado por equipo Viste';

        arrayDeProductos.push(req.body);

        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("¡Producto guardado!");

    },

    carrito: (req, res) => {
        res.render('carrito')
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

    ingresar: (req, res) => {

        res.render('ingresar')
    },

    todosLosProductos: (req, res) => {
        res.render('todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos
        });
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

        //req.body = {
        //    id: arrayDeProductos.length + 1,
        //    ...req.body
        //};
        console.log('ema');

        console.log(req.body);
        req.body.creador = 'Producto guardado por equipo Viste';
        arrayDeProductos.forEach(element => {
            console.log(req.body.avatar);
            if (element.id == req.body.id) {
                element.categoria = req.body.categoria;
                element.talle = req.body.talle;
                element.color = req.body.color;
                element.producto = req.body.producto;
                element.cantidad = req.body.cantidad;
                element.precio = req.body.precio;
            }
        });


        //arrayDeProductos.push(req.body);

        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("¡Producto guardado!");
    },

    borrarProducto: (req, res) => {
        let productosArray = JSON.parse(contenidoProductosJSON);
        let productosSinElQueBorramos = productosArray.filter(function(unProducto) {
                return unProducto.id != req.params.id;
            })
            // guardo el array con los productos finales
        fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));
        res.redirect('/todosLosProductos');
    },


};

module.exports = controller;