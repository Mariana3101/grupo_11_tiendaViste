// ************ Require's ************
const express = require('express');
const main = express();
const router = express.Router();


//****************Error 404 ***************

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /* GET - home page */
//router.get('/', mainController.index);

router.get("/nosotros",mainController.nosotros); /*nosotros página*/

module.exports = router;