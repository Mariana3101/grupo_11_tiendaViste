const express = require('express');
const router = express.Router();

const productosApiControlller = require("../../controllers/api/productosApiController");

//Get listado de productos
router.get("/productos", productosApiControlller.index);
//Get listado de Categorias
router.get("/categories", productosApiControlller.apiCategories);


// GET - listado de users
router.get('/users', productosApiControlller.apiUsers);

//router.get('/productos/:id', productosApiControlller.show);

module.exports = router;