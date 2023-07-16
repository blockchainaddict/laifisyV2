// confidential vars
require('dotenv').config();

// express
const express = require('express');
const session = require('express-session'); // Para poder utilizar session de usuario
const cookieParser = require('cookie-parser'); // Para poder guardar los cookies de usuario
const rememberMiddleware = require('./middlewares/cookieAuthMiddleware');

const bodyParser = require('body-parser');
const cors = require('cors');
const corsOptions = {
    origin:['http://localhost:3000']
 }

 
const port = 3500; //Heroku port => process.env.PORT ||

const app = express();
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json());
// app.use(express.json()); // Para poder leer el body


// To Create a Session (user login)
app.use(session({
    secret: 'laifisy_session',
    resave: false,
    saveUninitialized: false
  }));

// Cookies
app.use(cookieParser());
app.use(rememberMiddleware);

// ************ Route System require and use() ************
const mainRoutes = require('./routes/mainRoutes'); //
const userRoutes = require('./routes/userRoutes'); //
const contentRoutes = require('./routes/contentRoutes'); //

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/content', contentRoutes);

//NotFound404
app.use((req, res, next) => {
    res.status(404).render("error404")
  });

app.listen(port, () => console.log(`Listening on 3500!`));