const fs = require('fs');
const path = require('path');

const ubicacionProductosJSON = path.join(__dirname, '../data/productos.json');
const contenidoProductosJSON = fs.readFileSync(ubicacionProductosJSON, 'utf-8');
//parseo para llamarlo en el metodo todosLosProductos
const todosLosProductos = JSON.parse(fs.readFileSync(ubicacionProductosJSON, 'utf-8'));

//Function HElP!

function getAllUsers () {
	let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
	let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent); 
	return finalUsers;
}

function storeUser (newUserData) {
	let allUsers = getAllUsers();
	allUsers.push(newUserData);
	fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, '../data/user.json'));
}

function generateUserId () {
	let allUsers = getAllUsers();
	if (allUsers.length == 0) {
		return 1;
	}
	let lastUser = allUsers.pop();
	return lastUser.id + 1;
}

function getUserByEmail(email) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.email == email);
	return userToFind;
}

function getUserById(id) {
	let allUsers = getAllUsers();
	let userToFind = allUsers.find(oneUser => oneUser.id == id);
	return userToFind;
}

const controller = {
    root: (req, res) => {
        res.render('index');
    },

    mostrarCargaProducto: (req, res) => {
        let productos = JSON.parse(contenidoProductosJSON);
        res.render('cargaProducto', { productos });
    },



    cargaProducto: (req, res) => {

        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }

        req.body = {
            id: arrayDeProductos.length + 1,
            ...req.body,

        };


        req.body.creador = 'Producto guardado por equipo Viste';

        arrayDeProductos.push(req.body);

        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("¡Producto guardado!");

    },

    carrito: (req, res) => {
        res.render('carrito')
    },
    registrar: (req, res) => {
        res.render('registrar')
    },
    detalleProducto: (req, res) => {
        let idProducto = req.params.id;
        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('detalleProducto', {
            idProducto: idProducto,
            elProducto: elProducto,

        });
    },

    ingresarFormulario: (req, res) => {
                               
        res.render('ingresar')
    },
    
    registerForm: (req, res) => {
		res.render('register');
	},
	store: (req, res) => {
		let userFinalData = {
			id: generateUserId(),
			name: req.body.name,
			lastname: req.body.lastname,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 10),
			
		};
		
		// Guardar al usario
		storeUser(userFinalData);
		
		// Redirección al login
		res.redirect('/login');
	},
	loginForm: (req, res) => {
		res.render('login');
	},
	processLogin: (req, res) => {
		// Buscar usuario por email
		let user = getUserByEmail(req.body.email);

		// Si encontramos al usuario
		if (user != undefined) {
			// Al ya tener al usuario, comparamos las contraseñas
			if (bcrypt.compareSync(req.body.password, user.password)) {
				// Redireccionamos al visitante a su perfil
				res.redirect(`/profile/${user.id}`);
			} else {
				res.send('Credenciales inválidas');
			}
		} else {
			res.send('No hay usuarios registrados con ese email');
		}
	},
	profile: (req, res) => {
		let userLoged = getUserById(req.params.id);

		res.render('profile', { user: userLoged });
	},

    
    todosLosProductos: (req, res) => {
        res.render('todosLosProductos', {
            pageClass: 'page-product',
            todosLosProductos
        });
    },

    editarProducto: (req, res) => {
        let idProducto = req.params.id;
        let elProducto = todosLosProductos.find(function(unProducto) {
            return unProducto.id == idProducto;
        })

        res.render('editar', {
            idProducto: idProducto,
            elProducto: elProducto,

        });


    },
    productoEditado: (req, res) => {
        let arrayDeProductos = [];

        if (contenidoProductosJSON != '') {
            arrayDeProductos = JSON.parse(contenidoProductosJSON);
        }



        arrayDeProductos.forEach(element => {
            console.log(req.body.avatar);
            if (element.id == req.body.id) {
                element.categoria = req.body.categoria;
                element.talle = req.body.talle;
                element.color = req.body.color;
                element.producto = req.body.producto;
                element.cantidad = req.body.cantidad;
                element.precio = req.body.precio;
                element.avatar = req.body.avatar;
            }
        });




        let contenidoAGuardar = JSON.stringify(arrayDeProductos, null, ' ');
        fs.writeFileSync(ubicacionProductosJSON, contenidoAGuardar);

        res.send("¡Producto guardado!");
    },

    borrarProducto: (req, res) => {
        let productosArray = JSON.parse(contenidoProductosJSON);
        let productosSinElQueBorramos = productosArray.filter(function(unProducto) {
                return unProducto.id != req.params.id;
            })
            // guardo el array con los productos finales
        fs.writeFileSync(ubicacionProductosJSON, JSON.stringify(productosSinElQueBorramos, null, ' '));
        res.redirect('/todosLosProductos');
    },


};

module.exports = controller;