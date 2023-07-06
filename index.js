// confidential vars
require('dotenv').config();

// express
const express = require('express');
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

// ************ Route System require and use() ************
const mainRoutes = require('./routes/mainRoutes'); //
const userRoutes = require('./routes/userRoutes'); //
const contentRoutes = require('./routes/contentRoutes'); //

app.use('/', mainRoutes);
app.use('/users', userRoutes);
app.use('/content', contentRoutes);

app.listen(port, () => console.log(`Listening on 3500!`));