const express = require('express');
const router = express.Router();

const productosApiControlller = require("../../controllers/api/productosApiController");

//Get listado de productos
router.get("/", productosApiControlller.index);


// POST - Guardar - store
router.post('/', productosApiControlller.store);

// GET - Detalle - show
router.get('/:id', productosApiControlller.show);

module.exports = router;