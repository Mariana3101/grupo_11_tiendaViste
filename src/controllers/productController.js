const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;


const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');
const todosLosProductos = getProducts();

//parseo para llamarlo en el metodo todosLosProductos

function getProducts() {
    const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
    return JSON.parse(contenidoProductosJSON);
}

// Constants
//const userFilePath = path.join(__dirname, "../data/users.json");


// Helper Functions
function getAllUsers() {
    // let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    // let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
    // return finalUsers;
    db.User
        .findAll({
            include: ['users']
        })
        .then(products => {
            return res.render('usuarios/perfil');
            // return finalUsers;
        })
        .catch(error => console.log(error));

}

function getUserById(id) {
    let allUsers = getAllUsers();
    let userById = allUsers.find(oneUser => oneUser.id == id);
    return userById;
}



const controller = {
    // todos los productos
    index: (req, res) => {

        const isLogged = req.session.user; 
        if(isLogged) {
            db.Products
            .findAll({
                include: ['user', 'categories', 'brand', 'colors', 'size']
            })
            .then(products => {
            db.Users
            .findByPk(
                req.session.user.id,
                )
            .then(usersLogged => {
                return res.render('productos/todosLosProductos', { usersLogged,products, isLogged }); 
        })
            .catch(error => console.log(error));
    })
} else {
    db.Products
            .findAll({
                include: ['user', 'categories', 'brand', 'colors', 'size']
            })
            .then(products => {
    return res.render('productos/todosLosProductos', { products }); 
})
            .catch(error => console.log(error));
}
},
  
    // crear producto por GET 
    create: (req, res) => {

        // falta hacer que se agregue el resto de los campos que no se cargan en la base de datos

        db.Brands
            .findAll()
            .then(brands => {
                db.Categories
                    .findAll()
                    .then(categories => {
                        db.Colors
                            .findAll()
                            .then(colors => {

                                db.Sizes
                                    .findAll()
                                    .then(sizes => {
                                        return res.render('productos/crear', { brands, categories, colors, sizes });
                                    })
                            })
                    })

            })
            .catch(error => console.log(error));

    },


    // Crear producto por POST
    store: (req, res) => {


        db.Products.create({
                id: req.body.id,
                name: req.body.name,
                price: req.body.price,
                image: req.file.filename,
                brand_id: req.body.brand_id,
                size_id: req.body.size_id,
                category_id: req.body.category_id,
                colors_id: req.body.colors_id,

            })
            //  console.log(req.body.category)


        .then(oneProducts => {
                return res.redirect('/todosLosProductos');

            })
            .catch(error => console.log(error));
    },
    // Borrar producto
    destroy: (req, res) => {
        db.Colors
        db.Products
            .destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                return res.redirect('/todosLosProductos');
            })
            .catch(error => console.log(error));
    },
    // Detalle Producto
    show: (req, res) => {
        db.Products
            .findByPk(
                req.params.id, {
                    include: [{

                            association: 'categories',

                        },

                    ],
                }
            )
            .then(products => {
                return res.render('productos/detalleProducto', { products, id: products.id });
            })
            .catch(error => console.log(error));
    },
    // Editar producto por GET
    edit: (req, res) => {
        db.brands
        db.Products
            .findByPk(req.params.id)
            .then(products => {

                sequelize
                    .query('SELECT * FROM categories')
                    .then(categoriesInDB => {
                        sequelize

                            .query('SELECT * FROM colors')
                            .then(colorsInDb => {
                                sequelize
                                    .query('SELECT * FROM sizes')

                                .then(sizesInDb => {
                                    sequelize
                                        .query('SELECT * FROM brands')
                                        .then(brandsInDb => {
                                            return res.render('productos/editar', {
                                                products,
                                                categories: categoriesInDB[0],
                                                colors: colorsInDb[0],
                                                sizes: sizesInDb[0],
                                                brands: brandsInDb[0]
                                            });
                                        })

                                })

                            })

                    })
            })
            .catch(error => console.log(error));

    },
    // Editar producto por PUT
    update: (req, res) => {
        db.Products
            .update({
                product_id: req.body.product_id,
                name: req.body.name,
                price: req.body.price,
                image: req.file.filename,
                brand_id: req.body.brand_id,
                size_id: req.body.size_id, // no cambia el talle 
                category_id: req.body.category_id, // no cambia la categoria 
                colors_id: req.body.colors_id,


            }, {
                where: {
                    id: req.params.id
                }

            })
            .then(() => {


                return res.redirect('/todosLosProductos');
            })
            .catch(error => console.log(error));
    },

<<<<<<< HEAD
}
=======
    // const isLogged = req.session.userId ? true : false;
    //let userLogged = getUserById(req.session.userId);
    /*
                                let idProducto = req.params.id;

                                const todosLosProductos = getProducts();

        elProducto = todosLosProductos.find(function(unProducto) {
        return unProducto.id == idProducto;
                                })

        render('productos/detalleProducto', {
        idProducto: idProducto,
        elProducto: elProducto,
        isLogged,
                                    userLogged

                                });


    const isLogged = req.session.userId ? true : false;
                                let userLogged = getUserById(req.session.userId);

    let productos = getProducts();
                                res.render('productos/cargaProducto', { productos, isLogged, userLogged });


        aProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
                                    let userLogged = getUserById(req.session.userId);

                                    const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

                                    let arrayDeProductos = [];

            contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
                                    }

            body = {
            id: arrayDeProductos.length + 1,
                                        ...req.body

                                    };

        req.body.creador = 'Producto guardado por equipo Viste';
                                    req.body.image = req.file.filename;

                                    arrayDeProductos.push(req.body);

        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
                                    fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);


        // res.send("¡Producto guardado!");
                                    return res.render('productos/todosLosProductos', { isLogged, userLogged, todosLosProductos })

                                },

        ito: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
                                    res.render('carrito', { isLogged, userLogged });

                                },


        lleProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
                                    let userLogged = getUserById(req.session.userId);

                                    let idProducto = req.params.id;

                                    const todosLosProductos = getProducts();

            elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
                                    })

           rrender('productos/detalleProducto', {
            idProducto: idProducto,
            elProducto: elProducto,
            isLogged,
                                        userLogged

        });
    },
                                */

    /* res.render('productos/todosLosProductos');

        const isLogged = req.session.userId ? true : false;
                                let userLogged = getUserById(req.session.userId);

                                const todosLosProductos = getProducts();

            render('productos/todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos,
            isLogged,
            userLogged
        });
                            },

     ediarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
                                let userLogged = getUserById(req.session.userId);

                                const todosLosProductos = getProducts();

        let idProducto = req.params.id;
            elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
                                })

            render('productos/editar', {
            idProducto: idProducto,
            elProducto: elProducto,
            isLogged,
                                    userLogged

                                });

                            },

        uctoEditado: (req, res) => {
        const isLogged = req.session.userId ? true : false;
                                let userLogged = getUserById(req.session.userId);

                                let todosLosProductos = getProducts();

           tsLosProductos = todosLosProductos.map(function(unProducto) {
             if unProducto.id == req.params.id) {
                    oducto = {
                    categoria: req.body.categoria,
                    talle: req.body.talle,
                    color: req.body.color,
                    producto: req.body.producto,
                    cantidad: req.body.cantidad,
                    precio: req.body.precio,
                    image: req.file ? req.file.filename : unProducto.image,
                }
                return unProducto;
            }
            return unProducto;
                                })

                                console.log(todosLosProductos);


        let contenidoAGuardar = JSON.stringify(todosLosProductos, null, ' ');
                                fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        return res.redirect('/productos/todosLosProductos');
                            },

      boarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
                                let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();
            productosSinElQueBorramos = todosLosProductos.filter(function(unProducto) {
            return unProducto.id != req.params.id;
                                })

        // return res.send(productosSinElQueBorramos)
        // guardo el array con los productos finales
                                fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));

        return res.redirect('/productos/todosLosProductos');
    },*/
};


>>>>>>> 3748effb37f83a41b3fef475c0d57a4bc7ea1e10
module.exports = controller;