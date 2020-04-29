// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const multer = require("multer"); //Necesario para poder subir archivos// 
const session = require('express-session');
const userCookieMiddleware = require('./middlewares/userCookieMiddleware');



// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method")); // Necesario para poder sobreescribir (PUT/DELETE)
app.use(session({
    secret: 'register_login',
    resave: false,
    saveUninitialized: true,

}));
app.use(userCookieMiddleware);

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', './src/views'); // Define la ruta de la carpeta "views"



// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************
const mainRouter = require('./routes/main');
const usersRoutes = require('./routes/usersRoutes');

const apiProductRouter = require('./routes/api/productos');

app.use('/', mainRouter);
app.use('/', usersRoutes);

app.use('/api', apiProductRouter);


// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.path = req.path;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log()
        // render the error page
    res.status(err.status || 500);
    res.render('not-found');
});

// ************ exports app - dont'touch ************
module.exports = app;