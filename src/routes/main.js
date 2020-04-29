const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
let { check, validationResult, body } = require('express-validator');

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

const mainController = require('../controllers/mainController');

// ************ Middlewares ************
const adminMiddleware = require('../middlewares/adminMiddleware');

router.get('/', mainController.root); /* GET - home page */


/* GET - carga-producto  CREACION PRODUCTO 1*/
router.get('/productos/crear', adminMiddleware, mainController.create);
/* POST - carga-producto CREACION PRODUCTO 2*/
router.post("/productos/crear",adminMiddleware, upload.single('image'), [
    check('name').isLength({ min: 2 }).withMessage('Este campo debe contener 2 caracteres minimo'),

], mainController.store);
/* detalle-producto 3*/
router.get('/productos/detalle/:id',mainController.show);
//Listado de productos que ve el usuarioso 4
router.get('/listado', mainController.index);
/*GET Formulario de edicion 5 */
router.get('/productos/editar/:id', adminMiddleware, mainController.edit);
/* PUT Accion de edicion 6  */
router.post('/productos/editar/:id', adminMiddleware, upload.single('image'), mainController.update);
/*DELETE Accion de borrado  7*/
router.delete('/productos/borrar/:id', adminMiddleware, mainController.destroy);
/* GET -carrito*/
//router.get('/productos/carrito', mainController.carrito);

module.exports = router;