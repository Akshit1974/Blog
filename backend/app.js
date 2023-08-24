var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

var app = express();

// =+=+=+=+=+=+=+ Config =+=+=+=+=+=+=+ 
dotenv.config({ path: 'backend/config/config.env' });


cloudinary.v2.config({
  cloud_name: 'dj7cu7hpl',
  api_key: '497758672614241',
  api_secret: 'bwp2zbFr0ajj4UZLlSzXLMQAFjw',
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// =*=*=*=*=*=*= Route Imports =*=*=*=*=*=*=
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRouts");
const blogs = require("./routes/blogRoutes");

app.use("/user", user);
app.use("/admin", admin);
app.use("/blog", blogs);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;