// ************ Require's ************
const express = require('express');
const main = express();
const router = express.Router();


//****************Error 404 ***************

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /* GET - home page */
router.get('/cargaProducto', mainController.cargaProducto); /* GET - carga-producto*/
router.get('/carrito', mainController.carrito); /* GET -carrito*/
router.get('/registrar', mainController.registrar); /* registrar*/
router.get('/detalleProducto', mainController.detalleProducto); /* detalle-producto*/
router.get('/ingresar', mainController.ingresar); /* Ingresar-Login*/


module.exports = router;