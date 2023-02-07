const express = require("express");
const app = express();
const cors = require ('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

// Routers
const WebRoute = require('./routers/web');

// Developer Defiend Modules
const { connectionDB} = require('./database/connection');

// Module Call
connectionDB();

// App Use Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(cors({ origin: true }));


app.use('/', WebRoute);





app.listen(8080, ()=>{
    console.log("http://localhost:8080");
});
