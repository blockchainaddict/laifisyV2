// confidential vars
require('dotenv').config();

// express
const express = require('express');
const bodyParser = require('body-parser');
// app.use(express.json()); // Para poder leer el body
const cors = require('cors');
const corsOptions = {
    origin:['https://santiagovb.io', 'http://localhost:3000']
 }
 
const port = process.env.PORT || 3500; //Heroku port

const app = express();
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json());

// ************ Route System require and use() ************
const mainRouter = require('./routes/mainRoutes'); //

app.use('/', mainRouter);

app.listen(port, () => console.log(`Listening on Heroku or port 3500!`));