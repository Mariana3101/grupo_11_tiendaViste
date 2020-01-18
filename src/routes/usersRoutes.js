// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/usersAvatars'));
    },

    filename: function(req, file, cb) {
        let userName = req.body.name.replace(/ /g, '_').toLowerCase();
        let imageFinalName = userName + 'userAvatar' + Date.now() + path.extname(file.originalname);
        cb(null, imageFinalName);
    }
});

const upload = multer({ storage: diskStorage });



// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ Middlewares ************
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

router.get('/usuarios/registrar', guestMiddleware, usersController.register); /* registrar*/
router.post('/usuarios/registrar', upload.single("avatar"), usersController.store);
router.get('/usuarios/ingresar', guestMiddleware, usersController.login); /* Ingresar-Login*/
router.post('/usuarios/ingresar', usersController.processLogin);
router.get("/usuarios/perfil", authMiddleware, usersController.perfil);

router.get('/usuarios/cerrarSesion', usersController.cerrarSesion);


module.exports = router;