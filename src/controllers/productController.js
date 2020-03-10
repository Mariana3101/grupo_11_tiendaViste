const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;


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
        db.Products
            .findAll({
                include: ['user', 'categories', 'brand', 'colors', 'sizes']
                    //no puedo mostrar el talle
            })
            .then(products => {
                return res.render('productos/todosLosProductos', { products });
            })
            .catch(error => console.log(error));
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
                        return res.render('productos/crear', { brands, categories });
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
            brand_id: req.body.brand,
            size_id: req.body.size,
            category_id: req.body.categories,
            colors_id: req.body.colors_id,

        })

        .then(oneProducts => {
                return res.redirect('/todosLosProductos');

            })
            .catch(error => console.log(error));
    },
    // Borrar producto
    destroy: (req, res) => {
        db.Products
            .findByPk(req.params.id, {
                include: ['categories']
            })
            .then(products => {
                let categories = products.categories;
                categories.map(cat => {
                    sequelize
                        .query(`DELETE FROM category_product WHERE product_id = ${products.id} AND category_id = ${cat.id}`)
                        .then(() => console.log('Done!'))
                        .catch(() => console.log('Ups I did it again!'));
                });
                products.destroy();
                return res.status(200).redirect('/todosLosProductos');
            })
            .catch(() => console.log('Is the final count down!'));
    },
    // Detalle Producto
    show: (req, res) => {
        db.Products
            .findByPk(
                req.params.id, {
                    include: [{

                            association: 'categories'
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

        db.Products
            .findByPk(req.params.id)
            .then(products => {

                sequelize
                    .query('SELECT * FROM categories')
                    .then(categoriesInDB => {
                        return res.render('productos/editar', { products, categories: categoriesInDB[0] });
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
                // image: req.file.filename,
                brand_id: req.body.brands,
                size_id: req.body.size,
                category_id: req.body.categories,
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

    // const isLogged = req.session.userId ? true : false;
    //let userLogged = getUserById(req.session.userId);
    /*
    let idProducto = req.params.id;

    const todosLosProductos = getProducts();

    let elProducto = todosLosProductos.find(function(unProducto) {
        return unProducto.id == idProducto;
    })

    res.render('productos/detalleProducto', {
        idProducto: idProducto,
        elProducto: elProducto,
        isLogged,
        userLogged

    });


    const isLogged = req.session.userId ? true : false;
    let userLogged = getUserById(req.session.userId);

    let productos = getProducts();
    res.render('productos/cargaProducto', { productos, isLogged, userLogged });


    cargaProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');

        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        req.body = {
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

    carrito: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('carrito', { isLogged, userLogged });

    },


    detalleProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        let idProducto = req.params.id;

        const todosLosProductos = getProducts();

        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('productos/detalleProducto', {
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

        res.render('productos/todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos,
            isLogged,
            userLogged
        });
    },

    editarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();

        let idProducto = req.params.id;
        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('productos/editar', {
            idProducto: idProducto,
            elProducto: elProducto,
            isLogged,
            userLogged

        });

    },

    productoEditado: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        let todosLosProductos = getProducts();

        todosLosProductos = todosLosProductos.map(function(unProducto) {
            if (unProducto.id == req.params.id) {
                unProducto = {
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

    borrarProducto: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);

        const todosLosProductos = getProducts();
        let productosSinElQueBorramos = todosLosProductos.filter(function(unProducto) {
            return unProducto.id != req.params.id;
        })

        // return res.send(productosSinElQueBorramos)
        // guardo el array con los productos finales
        fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));

        return res.redirect('/productos/todosLosProductos');
    },*/
};

module.exports = controller;
module.exports = controller;