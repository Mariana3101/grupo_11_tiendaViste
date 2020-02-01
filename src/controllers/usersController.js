const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

// Constants
const userFilePath = path.join(__dirname, "../data/users.json");

// Helper Functions
function getAllUsers() {
    let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
    return finalUsers;
}

function storeUser(newUserData) {
    // Traer a todos los usuariosos
    let allUsers = getAllUsers();
    // Generar el ID y asignarlo al nuevo usuarioso
    newUserData = {
        id: generateUserId(),
        ...newUserData
    };
    // Insertar el nuevo usuarioso en el array de TODOS los usuarios
    allUsers.push(newUserData);
    // Volver a reescribir el users.json
    fs.writeFileSync(userFilePath, JSON.stringify(allUsers, null, ' '));
    // Finalmente, retornar la información del usuarioso nuevo
    return newUserData;
}

function generateUserId() {
    let allUsers = getAllUsers();
    if (allUsers.length == 0) {
        return 1;
    }
    let lastUser = allUsers.pop();
    return lastUser.id + 1;
}

function getUserByEmail(email) {
    let allUsers = getAllUsers();
    let userByEmail = allUsers.find(oneUser => oneUser.email == email);
    return userByEmail;
}

function getUserById(id) {
    let allUsers = getAllUsers();
    let userById = allUsers.find(oneUser => oneUser.id == id);
    return userById;
}

// Controller Methods
const controller = {
    register: (req, res) => {
        const isLogged = req.session.userId ? true : false;

        res.render('registrar', { isLogged });
        //res.render('registrar');
    },

    store: (req, res) => {
        // Hash del password
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        // Eliminar la propiedad rePassword
        delete req.body.rePassword;

        // Asignar el nombre final de la imagen
        req.body.avatar = req.file.filename;

        // Guardar al usario y como la función retorna la data del usuarioso lo almacenamos en ela variable "user"
        let user = storeUser(req.body);

        // Setear en session el ID del usuarioso nuevo para auto loguearlo
        req.session.userId = user.id;

        // Setear la cookie para mantener al usuarioso logueado
        res.cookie('userIdCookie', user.id, { maxAge: 60000 * 60 });

        // Redirección al login
        // res.redirect('perfil');
        res.redirect('/usuarios/perfil');
    },

    login: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        res.render('ingresar', { isLogged });
        //res.render('ingresar');
    },

    processLogin: (req, res) => {
        // Buscar usuarioso por email
        let user = getUserByEmail(req.body.email);

        // Si encontramos al usuarioso
        if (user != undefined) {
            // Al ya tener al usuarioso, comparamos las contraseñas
            if (bcrypt.compareSync(req.body.password, user.password)) {
                // Setear en session el ID del usuarioso
                req.session.userId = user.id;

                // Setear la cookie
                if (req.body.remember_user) {
                    res.cookie('userIdCookie', user.id, { maxAge: 60000 * 60 });
                }

                // Redireccionamos al visitante a su perfil
                return res.redirect('/usuarios/perfil');
            } else {
                res.send('Credenciales inválidas');
            }
        } else {
            res.send('No hay usuarios registrados con ese email');
        }
    },

    perfil: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('perfil', { isLogged, userLogged });
        
    },
    cerrarSesion: (req, res) => {
        /*Destruir la session*/
        req.session.destroy();

        //Destruir la cookie
        res.cookie('userIdCookie', null, { maxAge: 1 });
        // return res.redirect('/usuariosperfil');
        /*res.cookie('userCookie', null, { maxAge: 1 });*/

        return res.redirect('/usuarios/perfil');
    }

};

module.exports = controller;