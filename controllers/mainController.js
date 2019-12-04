const fs = require('fs');
const path = require('path');

// ************ Function to Read an HTML File ************
function readHTML(fileName) {
    let htmlFile = fs.readFileSync(path.join(__dirname, `/../views/${fileName}.html`), 'utf-8');
    return htmlFile;
}

const controller = {
    root: (req, res) => {
        let html = readHTML('index');
        res.send(html);
    },
    registrar: (req, res) => {
        let html = readHTML('registrar');
        res.send(html);
    },
    ingresar: (req, res) => {
        let html = readHTML('ingresar');
        res.send(html);
    },
    cargaProducto: (req, res) => {
        let html = readHTML('cargaProducto');
        res.send(html);
    },
    carrito: (req, res) => {
        let html = readHTML('carrito')
        res.send(html);
    },
    detalleProducto: (req, res) => {
        let html = readHTML('detalleProducto')
        res.send(html);
    },
    noEncontrado: (req, res) => {
        let html = readHTML('noEncontrado')
        res.send(html);
    },
    errorServidor: (req, res) => {
        let html = readHTML('errorServidor')
        res.send(html);
    },


};

module.exports = controller