const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
let { check, validationResult, body } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;

// Constants
const userFilePath = path.join(__dirname, "../data/users.json");

// Helper Functions
/*
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
}*/

// Controller Methods
const controller = {

    //Get de registrar
    register: (req, res) => {
        db.Users
            .findAll()

        .then(users => {
                return res.render('usuarios/registrar', { users });


            })
            .catch(error => console.log(error));


    },

    // POST de registrar
    store: (req, res) => {


        db.Users.create({

            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password

        });


        return res.render('index');
    },

    // GET de ingresar
    login: (req, res) => {
        //const isLogged = req.session.userId ? true : false;

        res.render('usuarios/ingresar');
        //res.render('ingresar');
    },

    // POST de ingresar
    processLogin: (req, res) => {

        let errors = (validationResult(req));
        if (errors.isEmpty()) {

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
        } else {
            return res.render('usuarios/registrar', { errors: errors.errors });
        }
    },

    // GET de perfil
    perfil: (req, res) => {
        // const isLogged = req.session.userId ? true : false;
        //let userLogged = getUserById(req.session.userId);
        res.render('usuarios/perfil');

    },
    // GET de cerrar sesion
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