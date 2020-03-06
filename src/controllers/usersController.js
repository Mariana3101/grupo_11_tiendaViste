const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

let { check, validationResult, body } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;


//Helper Functions


function getAllUsers() {
    //let usersFileContent = fs.readFileSync(db, 'utf-8');
    //let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);
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


        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,

        }

        db.Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            //TODO bcrypt
            .then(users => {
                if (!users) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        userData.password = hash
                        db.Users.create(userData)
                            .then(users => {
                                res.json({ status: users.email + 'Registered!' })
                                let newSession = req.session;
                                newSession.email = req.body.email;
                            })
                            .catch(err => {
                                res.send('error: ' + err)
                            })
                    })
                } else {
                    res.json({ error: 'User already exists' })
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })
    },



    // GET de ingresar
    login: (req, res) => {
        const isLogged = req.session.userId ? true : false;

        res.render('usuarios/ingresar', {
            isLogged

        });
        //res.render('ingresar');
    },

    // POST de ingresar
    processLogin: (req, res) => {

        db.Users
            .findOne({
                where: {
                    email: req.body.email
                }
            }).then(function(users) {
                    if (!users) {
                        res.redirect('ingresar');
                    } else {
                        bcrypt.compare(req.body.password, users.password, function(err, result) {
                            if (result == true) {
                                req.session.email = req.body.email;
                                console.log("usuario ingreso");

                                // console.log(getUserById);
                                res.redirect('perfil');
                                console.log(result);
                            } else {
                                res.send('Incorrect password');
                                res.redirect('index');
                            }
                        });
                    }

                }

            )
            .catch(error => console.log(error));
    },

    // GET de perfil
    perfil: (req, res) => {
        console.log("hola");


        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        //res.render('usuarios/perfil');

        // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

        db.Users.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(users => {
                if (users) {
                    res.json(users)
                } else {
                    res.send('User does not exist')
                }
            })
            .catch(err => {
                res.send('error: ' + err)
            })

        let email = req.session.email;
        console.log(email);
        res.render('/perfil');
    },
    // GET de cerrar sesion
    cerrarSesion: (req, res) => {
        //Destruir la session
        req.session.destroy();

        //Destruir la cookie
        res.cookie('userIdCookie', null, { maxAge: 1 });
        // return res.redirect('/usuariosperfil');
        res.cookie('userCookie', null, { maxAge: 1 });

        return res.redirect('/usuarios/perfil');

    }

};





module.exports = controller;