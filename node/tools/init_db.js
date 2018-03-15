const config = require('../config.json');
const MongoClient = require('mongodb').MongoClient;
const url = config.database.connection.host;
const dbName = config.database.connection.dbName;
const Q = require('q');
var db;
const fs = require('fs');
MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");
    console.log('Database:' + dbName);
    db = client.db(dbName);
    db.dropDatabase();
    populateCountries().then(function() {
        console.log('Finished.');
    });
});
function populateCountries() {
    var deferred = Q.defer();
    console.log('populating countries...');
    var countries = fs.readFileSync('./countries.json', 'utf8');
    const collection = db.collection('countries');
    collection.insertMany(JSON.parse(countries));
    collection.updateMany({},{ "$set" : { "allowed": false}}, function(){
        collection.updateMany({iso : 'GB'},{ "$set" : { "allowed": true}}, function(){
            collection.updateMany({iso : 'BR'},{ "$set" : { "allowed": true}}, function (){
                deferred.resolve(true);
            });
        });
    });
    return deferred.promise;
};