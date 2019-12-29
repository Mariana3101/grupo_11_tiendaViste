const fs = require('fs');
const path = require('path');


const controller = {
    root: (req, res) => {
        res.render('index')

    },

    cargaProducto: (req, res) => {
        res.render('cargaProducto')
    },

    carrito: (req, res) => {
        res.render('carrito')
    },
    registrar: (req, res) => {
        res.render('registrar')
    },
    detalleProducto: (req, res) => {
        res.render('detalleProducto')
    },
    ingresar: (req, res) => {
        res.render('ingresar')
    },
    todosLosProductos: (req, res) => {
        res.render('todosLosProductos')
    },

};

module.exports = controller;