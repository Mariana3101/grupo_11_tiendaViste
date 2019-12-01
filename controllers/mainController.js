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
    cargaProducto: (req, res) => {
        let html = readHTML('cargaProducto');
        res.send(html);
    },
    carrito: (req, res) => {
        res.send('Carrito');
    },
    detalleProducto: (req, res) => {
        res.send('Detalle Producto');
    },
};

module.exports = controller