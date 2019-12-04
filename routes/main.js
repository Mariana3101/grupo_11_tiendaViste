// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

/* GET - home page. */
router.get('/', mainController.root);

/* GET - Registracion. */
router.get('/registrar', mainController.registrar);

/* GET - Ingresar. */
router.get('/ingresar', mainController.ingresar);

/* GET - Carga Producto. */
router.get('/cargaProducto', mainController.cargaProducto);

/* GET - Carrito. */
router.get('/carrito', mainController.carrito);

/* GET - Detalle producto. */
router.get('/detalleProducto', mainController.detalleProducto);

/* GET - 404. */
router.get('/noEncontrado', mainController.noEncontrado);

/* GET - 500. */
router.get('/errorServidor', mainController.errorServidor);

module.exports = router;