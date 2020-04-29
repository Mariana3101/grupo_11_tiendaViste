const express = require('express');
const router = express.Router();

const productosApiControlller = require("../../controllers/api/productosApiController");

//Get listado de productos
router.get("/productos", productosApiControlller.index);



// GET - listado de users
router.get('/users', productosApiControlller.apiUsers);

//router.get('/productos/:id', productosApiControlller.show);

module.exports = router;