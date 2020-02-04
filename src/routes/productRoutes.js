
const express = require('express');
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

// ************ Controller Require ************
const productController = require('../controllers/productController');


router.get('/cargaProducto', productController.mostrarCargaProducto); /* GET - carga-producto  CREACION PRODUCTO 1*/
router.post("/productos/crear", upload.single('avatar'), productController.cargaProducto); /* POST - carga-producto CREACION PRODUCTO 2*/
router.get('/productos/detalleProducto/:id', productController.detalleProducto); /* detalle-producto 3*/
router.get('/todosLosProductos', productController.todosLosProductos); //Listado de productos que ve el usuarioso 4
router.get('/productos/editar/:id', productController.editarProducto); /*GET Formulario de edicion 5 */
router.put('/productos/editar/:id', upload.single('avatar'), productController.productoEditado); /* PUT Accion de edicion 6  */
router.delete('/productos/borrar/:id', productController.borrarProducto); /*DELETE Accion de borrado  7*/
router.get('/carrito', productController.carrito); /* GET -carrito*/

module.exports = router;