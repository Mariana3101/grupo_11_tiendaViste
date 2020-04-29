const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
let { check, validationResult, body } = require('express-validator');


const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');
const listado = getProducts();

//parseo para llamarlo en el listado

function getProducts() {
    const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
    return JSON.parse(contenidoProductosJSON);
}



const controller = {
    root: (req, res) => {
        
        
        
        res.render("index")
        
        
        
    },
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
                        return res.render('productos/listado', { usersLogged, products, isLogged });
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
                    return res.render('productos/listado', { products });
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
                    return res.redirect('/listado');
                    
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
                return res.redirect('/listado');
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
                    return res.render('productos/detalle', { products, id: products.id,user });
                })
                .catch(error => console.log(error));
            },
            // Editar producto por GET
            edit: (req, res) => {

                let pedidosProducto = db.Products.findByPk(req.params.id);
                let pedidosMarca = db.Brands.findAll();
                let pedidosCategoria = db.Categories.findAll();
                let pedidosColor = db.Colors.findAll();
                let pedidosTalle = db.Sizes.findAll();

                Promise.all([pedidosProducto,pedidosMarca,pedidosCategoria,pedidosColor,
                pedidosTalle])
                .then(function([product, brand,categories,colors,sizes]){
                    res.render('productos/editar',{product:product,
                        brand:brand,categories:categories,colors:colors,sizes:sizes})
                })
                .catch(error => console.log(error));
                
            },
            // Editar producto por PUT
            update: (req, res) => {
              

                db.Products.update({
                    name: req.body.name,
                    price: req.body.price,
                    image: req.file.filename,
                    brand_id: req.body.brand_id,
                    size_id: req.body.size_id, 
                    category_id: req.body.category_id, 
                    colors_id: req.body.colors_id,
                
                },{
                    where: {
                        id: req.params.id
                    }
                })
                .then(productSaved => {
                
                    res.redirect('/productos/detalle/'+req.params.id)
                })
                .catch(error => console.log(error));
                
                /*
                
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
                    
                    
                    return res.redirect('/listado');
                })
                .catch(error => console.log(error));
                */
            },
            
        }
        module.exports = controller;