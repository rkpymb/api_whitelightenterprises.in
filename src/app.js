const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

require('dotenv').config();

const Admin = require("./controller/admin");
const Open = require("./controller/open");


const config = require('config')
const cors = require('cors');
const app = express();
app.set('token', process.env.SecretKey);



const corsOptions = {
    origin: true, 
    credentials: true, 
    optionsSuccessStatus: 204, 
};
app.use(cors(corsOptions));


// mongo database connection here
const mongoDBUrl = `mongodb://admin:SecurePass123!@194.164.149.183:27017/`; 
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection success..."))
  .catch((err) => console.log("MongoDB connection error:", err));


//bodyparsor settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/images', express.static('uploads/Content/images'));


//router here 

app.use("/admin", Admin)
app.use("/open", Open)


//for error logs and defaulr routers
app.use((req, resp, next) => {
    resp.status(404).json({
        error: "Invalid Req found"
    })
});



module.exports = app;






