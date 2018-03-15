const express = require('express');
const http = require('http');
const path = require('path');
const methodOverride = require('method-override')
global.appDir = path.dirname(require.main.filename);
const app = express();
const bodyParser = require('body-parser');
global.Q = require('q');
global.md5 = require('MD5');
global.config = require('./config.json');
global.uuid = require('uuid');
global.utils = require('./libs/utils');
global.static = require('./static.json');
global.cloudStorage = require('./libs/cloudStorage');

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect(config.database.connection.host, function (err, client) {
    console.log("Connected successfully to server");
    console.log('Database:' + config.database.connection.dbName);
    global.db = {
        verify: client.db(config.database.connection.dbName).collection('verify'),
        users : client.db(config.database.connection.dbName).collection('users'),
        countries : client.db(config.database.connection.dbName).collection('countries')
    }
});

global.aws = require('aws-sdk');
global.aws.config.update({
    accessKeyId: global.config.aws.key,
    secretAccessKey: global.config.aws.secret,
    signatureVersion: 'v4'
});


global.smsProviderCredentials = {
    key: global.config.nexmo.key,
    secret: global.config.nexmo.secret
}

// all environments
var allowCrossDomain = function (req, res, next) {
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(allowCrossDomain);
app.set('port', process.argv[2] || 4600);
app.use(express.json({limit: '4mb'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.urlencoded());

//----- Registration
var registration = {
    v1: require('./routes/v1/registration')
}
app.get('/v1/registration/getReady', registration.v1.getReady);
app.post('/v1/registration/sendSMS', registration.v1.sendSMS);
app.post('/v1/registration/confirmSMS', registration.v1.confirmSMS);
app.get('/v1/registration/checkUsernameAvailability', registration.v1.checkUsernameAvailability);
app.get('/v1/registration/checkEmailAvailability', registration.v1.checkEmailAvailability);
app.get('/v1/registration/checkMobileAvailability', registration.v1.checkMobileAvailability);
app.post('/v1/registration/register', registration.v1.register);
//-----------------------------------------------------------------------

//----- Session
var session = {
    v1: require('./routes/v1/session')
}
app.post('/v1/session/login', session.v1.login);
app.get('/v1/session/logout', session.v1.logout);
//



http.createServer(app).listen(app.get('port'), function (req, res) {
    console.log('Express server listening on port ' + app.get('port'));
    console.log(global.appDir);
});




