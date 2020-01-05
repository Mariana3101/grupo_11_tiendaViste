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
        let imageFinalName = `producto_avatar_${Date.now()}${path.extname(file.originalname)}`;
        cb(null, imageFinalName);
    }
});

const upload = multer({ storage: storageDisk })


//****************Error 404 ***************

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /* GET - home page */

/*router.get('/cargaProducto', mainController.mostrarCargaProducto); /* GET - carga-producto  CREACION PRODUCTO 1*/
/*router.post("/productos/crear", mainController.cargaProducto); /* POST - carga-producto CREACION PRODUCTO 2*/

router.get('/cargaProducto', mainController.mostrarCargaProducto); /* GET - carga-producto  CREACION PRODUCTO*/
router.post("/productos/crear", upload.any("avatar"), mainController.cargaProducto); /* POST - carga-producto CREACION PRODUCTO*/

router.get('/carrito', mainController.carrito); /* GET -carrito*/
router.get('/registrar', mainController.registrar); /* registrar*/
router.get('/productos/detalleProducto/:id', mainController.detalleProducto); /* detalle-producto 3*/
router.get('/ingresar', mainController.ingresar); /* Ingresar-Login*/

router.get('/todosLosProductos', mainController.todosLosProductos); //Listado de productos que ve el usuario 4

router.get('/productos/editar/:id', mainController.editarProducto); /*GET Formulario de edicion 5 */
router.put('/productos/editar', mainController.productoEditado); /* PUT Accion de edicion 6  */

router.delete('/productos/borrar/:id', mainController.borrarProducto); /*DELETE Accion de borrado  7*/


module.exports = router;