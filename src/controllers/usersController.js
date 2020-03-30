const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
let { check, validationResult, body } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;


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

        let errors = (validationResult(req));
        console.log(validationResult(req))
        if (errors.isEmpty()) {
            const userData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                image: req.file.filename,
                role: "guest"
                
            }
            console.log(userData)

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
                                    
                                    return res.render('usuarios/ingresar', { users })
                                })

                            .catch(err => {
                                res.send('error: ' + err)
                            })
                        })
                    } else {
                        res.json({ error: 'Usuario ya existe' })
                    }
                })
                .catch(err => {
                    res.send('error: ' + err)
                })

        } else {
            res.render('usuarios/registrar', {
                errors: errors.errors
            })
        }
    },



    // GET de ingresar
    login: (req, res) => {


        res.render('usuarios/ingresar');
        //res.render('ingresar');
    },

    // POST de ingresar
    processLogin: (req, res) => {

        let errors = (validationResult(req));

        if (errors.isEmpty()) {

            let email = req.body.email;
            let password = req.body.password;
            db.Users
                .findOne({
                    where: { email: email }
                })
                .then(function(users) {
                    if (!users) {
                        res.send('No hay usuarios registrados con ese email');
                    } else {
                        bcrypt.compare(password, users.password, function(err, result) {
                            if (result == true) {
                                // Setear en session el ID del usuario
                                req.session.user = users;

                                if (req.body.remember_user != undefined) {
                                    res.cookie("user_email", users.email, {maxAge: 60000*100} )
                                }

                                res.redirect('perfil');

                            } else {
                                res.send("Credenciales inválidas");
                                //req.session.users = users.dataValues;
                                //res.render('index');
                            }

                        });
                    }

                }).catch(error => console.log(error));

        } else {
            res.render('usuarios/ingresar', {
                errors: errors.errors
            })

        }

    },


    // GET de perfil
    perfil: (req, res) => {


        return res.render('usuarios/perfil');


    },



    // GET de cerrar sesion

    cerrarSesion: (req, res) => {
        //Destruir la session
        req.session.destroy();

        //Destruir la cookie
        res.cookie('user_email', null, { maxAge: 1 });
       
        res.cookie('ser_email', null, { maxAge: 1 });

        return res.redirect('/');

    },

};





module.exports = controller;