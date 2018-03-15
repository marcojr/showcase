const aws = require('aws-sdk');
const config = require('../config.json');
var Q = require('q');
aws.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    signatureVersion: 'v4'
});
exports.writeFile = function (folder, filename, data) {
    console.log('uploading ' + filename);
    var deferred = Q.defer();
    const fileX = data.substring(data.indexOf(',')+1);
    const file = new Buffer(fileX, 'base64');
    var s3 = new aws.S3();
    s3.putObject({
        Bucket: config.aws.bucket,
        Key: folder + '/' + filename,
        Body: file
    }, function (err) {
        if (err) {
            deferred.resolve({
                successfully: false,
                error: err
            })
        }
        else {
            deferred.resolve({
                successfully: true
            })
        }
    });
    return deferred.promise;
}
exports.deleteFile = function (folder, filename) {
    var deferred = Q.defer();
    var s3 = new aws.S3();
    s3.deleteObject({
        Bucket: config.aws.bucket,
        Key: folder + '/' + filename
    }, function (err) {
        if (err) {t
            deferred.resolve({
                successfully: false,
                error: err
            })
        }
        else {
            deferred.resolve({
                successfully: true
            })
        }
    });
    return deferred.promise;
}
exports.getFile = function (folder, filename) {
    var deferred = Q.defer();
    var s3 = new aws.S3();
    s3.getObject({
        Bucket: config.aws.bucket,
        Key: folder + '/' + filename
    }, function (err, data) {
        if (err) {
            deferred.resolve({
                successfully: false,
                error: err
            })
        }
        else {
            deferred.resolve({
                successfully: true,
                data: data
            })
        }
    });
    return deferred.promise;
}
exports.writeFileAscII = function (folder, filename, data) {
    var deferred = Q.defer();
    var file = new Buffer(data, 'base64');
    var s3 = new aws.S3();
    s3.putObject({
        Bucket: config.aws.bucket,
        Key: folder + '/' + filename,
        Body: file
    }, function (err) {
        if (err) {
            deferred.resolve({
                successfully: false,
                error: err
            })
        }
        else {
            deferred.resolve({
                successfully: true
            })
        }
    });
    return deferred.promise;
}
exports.deleteFolder = function(folder, callback){
    const params = {
        Bucket: config.aws.bucket,
        Prefix: folder + '/'
    };
    var s3 = new aws.S3();
    s3.listObjects(params, function(err, data) {
        if (err) return callback(err);
        if (data.Contents.length === 0) callback();
        params = {Bucket: config.aws.bucket};
        params.Delete = {Objects:[]};
        data.Contents.forEach(function(content) {
            params.Delete.Objects.push({Key: content.Key});
        });
        s3.deleteObjects(params, function(err, data) {
            if (err) return callback(err);
        });
    });
}