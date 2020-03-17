const db = require('../../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = db.Products;


const controller = {
    // todos los productos
    index: (req, res) => {

        Products
            .findAll({
                attributes: ['id', 'name', 'categories']
            })

        .then(products => {





                let result = {
                    meta: {
                        status: 200,
                        url: "/api/productos",
                        quantity: products.length
                    },
                    data: products
                }

                return res.json(result);

            })
            .catch(error => {
                return res.status(500).json({
                    metadata: {
                        status: req.status,
                        msg: 'No puedo conectar con la Base de Datos'
                    }

                });
            });


    },




    // Crear producto por POST
    store: (req, res) => {
        Products
            .create(req.body)
            .then(productSaved => {
                return res.status(201).json({
                    metadata: {
                        status: 'OK se guardó'
                    },
                    url: req.originalUrl + '/' + productSaved.id,
                    loQueSeGuardoEnLaDB: productSaved
                })
            }).catch(err => {
                return res.json(err);
            });

    },
    // Detalle Producto
    show: (req, res) => {
        Products
            .findByPk(req.params.id)
            .then(oneProduct => {
                if (oneProduct) {
                    return res.send({
                        metadata: {
                            status: 'OK vino el producto'
                        },
                        url: req.originalUrl,

                    })
                }
                return res.status(404).json({
                    metadata: {
                        status: 404,
                        data: 'Not found'
                    }
                })
            })
            .catch(error => console.log(error));
    },
}
module.exports = controller;