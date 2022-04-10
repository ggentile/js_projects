require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const helmet = require('helmet');
const flash = require('connect-flash');
const csrf = require('csurf');


mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true}, {useUnifiedTopology: true})
.then(() => {
    console.log('Database connected.');
    app.emit('finished');
})
.catch(e => console.log(e));

const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded({extended: true}));
app.use(helmet());

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'thisismysecret',
    store: new MongoStore({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24* 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

app.use(routes);


app.on('finished', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000/paginaInicial');
        console.log('Servidor executando na porta 3000...');
    });
});