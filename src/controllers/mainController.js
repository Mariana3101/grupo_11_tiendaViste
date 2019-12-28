const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');

let contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

const controller = {
    root: (req, res) => {
        let productos = JSON.parse(contenidoProductosJSON);
		res.render('index', { productos });
    },
    
    mostrarCargaProducto: (req, res) => {
        res.render('cargaProducto');
    },
    

    cargaProducto: (req, res) => {
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
		
		res.send('¡Producto guardado!')

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
    }
};

module.exports = controller;