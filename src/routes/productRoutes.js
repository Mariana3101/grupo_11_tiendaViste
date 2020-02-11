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
//const controller = require('../controllers/productController');



const productController = require('../controllers/productController');

/* GET - carga-producto  CREACION PRODUCTO 1*/
router.get('/cargaProducto', productController.create);
/* POST - carga-producto CREACION PRODUCTO 2*/
router.post("/productos/crear", upload.single('avatar'), productController.cargaProducto);
/* detalle-producto 3*/
router.get('/productos/detalleProducto/:id', productController.detalleProducto);
//Listado de productos que ve el usuarioso 4
router.get('/todosLosProductos', productController.show);
/*GET Formulario de edicion 5 */
router.get('/productos/editar/:id', productController.editarProducto);
/* PUT Accion de edicion 6  */
router.put('/productos/editar/:id', upload.single('avatar'), productController.productoEditado);
/*DELETE Accion de borrado  7*/
router.delete('/productos/borrar/:id', productController.borrarProducto);
/* GET -carrito*/
router.get('/carrito', productController.carrito);

module.exports = router;