const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
let { check, validationResult, body } = require('express-validator');


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

        // Si el usuario esta logueado
        const isLogged = req.session.user;
        if (isLogged) {
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
                            return res.render('productos/todosLosProductos', { usersLogged, products, isLogged });
                        })
                        .catch(error => console.log(error));
                })
        } else {
            //Mostrar de todas formas si el usuario no esta logueado
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

        //Buscamos de la base de datos cada campo 

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
        //validacion desde el validator express
        let errors = (validationResult(req));
        if (errors.isEmpty()) {

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



            .then(oneProducts => {
                    return res.redirect('/todosLosProductos');

                })
                .catch(error => console.log(error));
        } else {
            res.render('productos/crear', {
                errors: errors.errors
            })
        }

    },
    // Borrar producto
    destroy: (req, res) => {
      //  db.Colors
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
        
        let user = req.session.user 
        db.Products
            .findByPk(
                req.params.id, {
                    include: 
                       
                         ['categories', 'brand', 'colors', 'size']
                        
                    
                }
            )
            
            .then(products => {
                return res.render('productos/detalleProducto', { products, id: products.id,user });
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
                                                brands: brandsInDb[0],
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

    mostrarCarrito: (req,res) => {
        db.Products
        .findAll({
         where: {
             id: req.session.carrito
             
            }
        })
        .then(products => {
         
            return res.render('carrito', {products});
        });
       
    },

    carritoCompra: (req,res) => {
        let carro = req.session.carrito;

		if (!carro.includes(req.body.product)) {
			req.session.carrito.push(req.body.product);
		}

		console.log('======');
		console.log(req.session.cart);
		console.log('======');
		return res.redirect('/');
       
    }
    

}
module.exports = controller;