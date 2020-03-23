// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
let { check, validationResult, body } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;

const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/usersAvatars'));
    },

    filename: function(req, file, cb) {
        let userName = req.body.name;
        let imageFinalName = userName + 'userAvatar' + Date.now() + path.extname(file.originalname);
        cb(null, imageFinalName);
        // let imageFinalName = `user_avatar${Date.now()}${path.extname(file.originalname)}`;
        //cb(null, imageFinalName);
    }
});


const upload = multer({ storage: diskStorage });


// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');


router.get('/usuarios/registrar', guestMiddleware, usersController.register); /* registrar*/

router.post('/usuarios/registrar', upload.single("avatar"), [
    check('first_name').isAlpha().isLength({min:3}).withMessage('Este campo debe contener letras'),
    check('last_name').isAlpha().isLength({min:3}).withMessage('Este campo debe contener letras'),
    check('email').isEmail().withMessage('Debe ingresar un email valido'),
    check('password').isLength({ min: 3 }).withMessage('La contraseña debe tener por lo menos 3 caracteres'),
    check('rePassword').isLength({ min: 3 }).withMessage('La contraseña debe ser la misma'),
], usersController.store);

router.get('/usuarios/ingresar', guestMiddleware, usersController.login); /* Ingresar-Login*/

router.post('/usuarios/ingresar', [
        check('email').isEmail().withMessage('Debe ingresar un mail '),
        check('password').isLength({ min: 3 }).withMessage('La contraseña debe tener por lo menos 3 caracteres'),
    ],
    usersController.processLogin);
router.get("/usuarios/perfil", authMiddleware, usersController.perfil);

router.get('/usuarios/cerrarSesion', usersController.cerrarSesion);


module.exports = router;