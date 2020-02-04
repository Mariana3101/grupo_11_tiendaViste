const fs = require('fs');
const path = require('path');

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

function getUserById(id) {
    let allUsers = getAllUsers();
    let userById = allUsers.find(oneUser => oneUser.id == id);
    return userById;
}

const controller = {
    root: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('index', { isLogged, userLogged });
    },

    nosotros: (req, res) => {
        const isLogged = req.session.userId ? true : false;
        let userLogged = getUserById(req.session.userId);
        res.render('nosotros', { isLogged, userLogged });
    },
};

module.exports = controller;