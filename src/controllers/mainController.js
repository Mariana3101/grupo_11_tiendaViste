const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

const userFilePath = path.join(__dirname, "../data/users.json");

// Helper Functions
function getAllUsers() {
    let usersFileContent = fs.readFileSync(userFilePath, 'utf-8');
    let finalUsers = usersFileContent == '' ? [] : JSON.parse(usersFileContent);

    /*
        db.Users
            .findAll({
                include: ['users']
            })
            .then(products => {
                return res.render('usuarios/perfil');
                // return finalUsers;
            })
            .catch(error => console.log(error));
*/
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

//function getUserById(id) {
//let allUsers = getAllUsers();
// let userById = allUsers.find(oneUser => oneUser.id == id);
//let userById =
//db.Users
//.findByPk(req.params.id)
//return userById;
//}

const controller = {
    root: (req, res) => {

        

        res.render("index")



    },

    nosotros: (req, res) => {
        const isLogged = req.session.userId ? true : false;

        res.render('index');
    },
};
module.exports = controller;