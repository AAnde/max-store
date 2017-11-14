var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var q = require('q');

global.__base = __dirname+"/";
var config = require(__base+'/server/config/config');
var userController = require(__base+"/server/controllers/user.controller");

var app = express();
var urlEncoder = bodyParser.urlencoded({extended:true});
app.use(bodyParser.json());

//mongoose.connect(config.DATABASE);
mongoose.connect(config.MLAB_DATABASE);
// q
mongoose.Promise = q.Promise;
// native promises
mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    res.send("server is up and running..");
})

//user api's
app.route('/api/user/signUp').post(userController.createUser);
app.route('/api/user/login').post(userController.login);
app.route('/api/user/update').post(userController.updateUser);
app.route('/api/user/resetPassword').post(userController.resetPassword);


app.listen(process.env.PORT || 8080);
console.log("server up and running...");
// http.createServer(function (req, res) {
    
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('Hello, world!');
    
// }).listen(process.env.PORT || 8080);