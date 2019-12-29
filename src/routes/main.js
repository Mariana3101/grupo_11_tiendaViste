// ************ Require's ************
const express = require('express');
const main = express();
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storageDisk = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + '/../../public/images/avatars');
	},
	filename: (req, file, cb) => {
		let imageFinalName = `user_avatar_${Date.now()}${path.extname(file.originalname)}`;
		cb(null, imageFinalName);
	}
});

const upload = multer({ storage: storageDisk })


//****************Error 404 ***************

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /* GET - home page */
router.get('/cargaProducto', mainController.mostrarCargaProducto); /* GET - carga-producto*/
router.post("/productos/crear", mainController.cargaProducto);/* POST - carga-producto*/
router.get('/carrito', mainController.carrito); /* GET -carrito*/
router.get('/registrar', mainController.registrar); /* registrar*/
router.get('/detalleProducto', mainController.detalleProducto); /* detalle-producto*/
router.get('/ingresar', mainController.ingresar); /* Ingresar-Login*/

router.get('/todosLosProductos', mainController.todosLosProductos);


module.exports = router;