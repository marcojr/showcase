const trace = require('../../libs/trace');
exports.getReady = function(req, res) {
    const context = 'registration/getReady';
    global.db.countries.find({ allowed: true})
        .project({ iso :true, name : true, areaCode: true, _id: false})
        .toArray(function(err, countries){
            for(var i=0; i < countries.length; i++){
                countries[i].areaCode = parseInt(countries[i].areaCode);
            }
        if(err !== null) {
            global.utils.sendDbError(res,context);
            return;
        }
        const out = {
            countries: countries,
            venues : global.static.venues,
            texts : global.static.texts,
            privacyOptions : global.static.privacyOptions
        };
        global.utils.sendOk(res, out);
    });
}
exports.sendSMS = function (req, res) {
    const context = 'registration/sendSMS';
    var e;
    const cc = global.utils.checkConstraints(req,res,context);
    if(!cc.isValid) {
        e = {
            code: 'CONSTRAINTS_CHECK_FAILURE',
            context : context,
            warnings : cc.warnings
        }
        global.utils.sendException(400,res, e);
        return;
    }
    const preCheck = {
        "$or":
            [
                { "ipAddress": req.connection.remoteAddress},
                { "mobileNumber" : req.body.mobileNumber }
            ]
    };
    global.db.verify.findOne(preCheck, function(err,pc) {
        if(err !== null) {
            global.utils.sendDbError(res,context);
            return;
        }
        if (pc !== null) {
            const d1 = new Date();
            const d2 = new Date(pc.timestamp);
            const diff = Math.abs((d1.getTime() - d2.getTime()) / 1000);
            if(diff < 60) {
                e = {
                    code: 'RECENTLY_SENT_SMS',
                    context : context
                }
                global.utils.sendException(401,res, e);
                return;
            }
        }
        checkMobileAvailability(req.body.mobileNumber).then(function (count) {
            if(count > 0) {
                e = {
                    code: 'MOBILE_IN_USE',
                    context : context
                }
                global.utils.sendException(401,res, e);
                return;
            }
            if (count < 1) {
                //For test purposes without a need of the SMS provider, the code will
                //always be 9999
                var code = generateCode();
                //const code = "9999";
                const criteria = {
                    mobileNumber: req.body.mobileNumber,
                    type: 'mobile'
                };
                const update = {
                    $set: {
                        code: code,
                        uuid: uuid = require('uuid/v4')(),
                        timestamp: new Date(),
                        ipAddress: req.connection.remoteAddress
                    }
                };
                global.db.verify.update(criteria, update, {upsert: true}, function (err, db) {
                    if(err !== null) {
                        global.utils.sendDbError(res,context);
                        return;
                    }
                    const from = global.config.service.shortDescription;
                    const to = '+' + req.body.mobileNumber;
                    var txt = "Your code is: " + code;
                    txt = txt.replace(/ /g, '+');
                    const path = '/sms/json?api_key=' + global.smsProviderCredentials.key + '&api_secret=' + global.smsProviderCredentials.secret + '&from=' + from + '&to=' + to + '&text=' + txt;
                    const smsProvider = require('https');
                    const options = {
                        host: 'rest.nexmo.com',
                        port: 443,
                        path: path
                    };

                    smsProvider.request(options, function (response) {
                        var str = "";
                        response.on('data', function (chunk) {
                            str += chunk;
                        });
                        response.on('end', function () {
                            resJson = JSON.parse(str);
                            if (resJson.messages[0].status == 0) {
                                trace.log('sms', 'SMS sent to ' + req.body.mobileNumber + ': ' + code);
                                trace.log('sms', 'Balance on SMS Provider :  ' + resJson.messages[0]["remaining-balance"]);
                                global.utils.sendOk(res, null);
                            } else {
                                trace.log('sms', 'Unable to send SMS to ' + req.body.mobileNumber + ' - ' + resJson.messages[0].status);
                                e = {
                                    code: 'NUMBER_CANNOT_BE_ACCEPTED',
                                    context : context
                                }
                                global.utils.sendException(400,res, e);
                            }
                        });
                    }).end();
                    //kkglobal.utils.sendOk(res, null);
                });
            }
            else {
                e = {
                    code: 'NUMBER_CANNOT_BE_ACCEPTED',
                    context : context
                }
                global.utils.sendException(400,res, e);
            }
        });
    });
}
exports.confirmSMS = function (req, res) {
    const context = 'registration/confirmSMS';
    var e;
    const cc = global.utils.checkConstraints(req,res,context);
    if(!cc.isValid) {
        e = {
            code: 'CONSTRAINTS_CHECK_FAILURE',
            context : context,
            warnings : cc.warnings
        }
        global.utils.sendException(400,res, e);
        return;
    }
    const criteria = {
        mobileNumber: req.body.mobileNumber,
        type: 'mobile',
        code: req.body.code
    };
    global.db.verify.findOne(criteria, function (err, doc) {
        if(err !== null) {
            global.utils.sendDbError(res,context);
            return;
        }
        if (doc == null) {
            e = {
                code: 'INVALID_NUMBER',
                context : 'registration/confirmSMS'
            }
            global.utils.sendException(401,res, e);
        }
        else {
            global.utils.sendOk(res, {uuid: doc.uuid});
        }
    });
}
exports.checkUsernameAvailability = function (req, res) {
    const context = 'registration/checkUsernameAvailability';
    const cc = global.utils.checkConstraints(req,res,context);
    if(!cc.isValid) {
        e = {
            code: 'CONSTRAINTS_CHECK_FAILURE',
            context : context,
            warnings : cc.warnings
        }
        global.utils.sendException(400,res, e);
        return;
    }
    checkUsernameAvailability(req.query.username.toLowerCase()).then(function (count) {
        if (count < 0) {
            global.utils.sendDbError(res,context);
            return;
        }
        if (count > 0) {
            global.utils.sendOk(res, {
                isAvailable: false
            });
        }
        else {
            global.utils.sendOk(res, {
                isAvailable: true
            });
        }
    });
}
exports.checkEmailAvailability = function (req, res) {
    const context = 'registration/checkEmailAvailability';
    var e;
    const cc = global.utils.checkConstraints(req,res,context);
    if(!cc.isValid) {
        e = {
            code: 'CONSTRAINTS_CHECK_FAILURE',
            context : context,
            warnings : cc.warnings
        }
        global.utils.sendException(400,res, e);
        return;
    }
    checkEmailAvailability(req.query.email).then(function (count) {
        if (count < 0) {
            global.utils.sendDbError(res,context);
            return;
        }
        if (count > 0) {
            global.utils.sendOk(res, {
                isAvailable: false
            });
        }
        else {
            global.utils.sendOk(res, {
                isAvailable: true
            });
        }
    });
}
exports.checkMobileAvailability = function (req, res) {
    //Remember: If mobile starts with "+", this must be encoded ! %2B
    const context = 'registration/checkMobileAvailability';
    const cc = global.utils.checkConstraints(req,res,context);
    var e;
    if(!cc.isValid) {
        e = {
            code: 'CONSTRAINTS_CHECK_FAILURE',
            context : context,
            warnings : cc.warnings
        }
        global.utils.sendException(400,res, e);
        return;
    }
    checkMobileAvailability(req.query.mobile).then(function (count) {
        if (count < 0) {
            global.utils.sendDbError(res,context);
            return;
        }
        if (count > 0) {
            global.utils.sendOk(res, {
                isAvailable: false
            });
        }
        else {
            global.utils.sendOk(res, {
                isAvailable: true
            });
        }
    });
}
exports.register = function (req, res) {
    const context = 'registration/register';
    const cc = global.utils.checkConstraints(req,res,context);
    var e;
    if(!cc.isValid) {
        e = {
            code: 'CONSTRAINTS_CHECK_FAILURE',
            context : context,
            warnings : cc.warnings
        }
        global.utils.sendException(400,res, e);
        return;
    }
    getPhoneByUUID(req.body.phoneUUID, req.body.phoneCode).then(function (phone) {
        if (phone == null) {
            e = {
                code: 'INVALID_MOBILE',
                context : 'registration/register'
            }
            global.utils.sendException(400,res, e);
            return;
        }
        checkEmailAvailability(req.body.email).then(function (countEmail) {
            if (parseInt(countEmail) > 0) {
                e = {
                    code: 'EMAIL_ALREADY_IN_USE',
                    context : 'registration/register'
                }
                global.utils.sendException(400,res, e);
                return;
            }
            checkUsernameAvailability(req.body.username).then(function (countUsername) {
                if (parseInt(countUsername) >  0) {
                    e = {
                        code: 'USERNAME_UNAVAILABLE',
                        context : 'registration/register'
                    }
                    global.utils.sendException(400,res, e);
                    return;
                }
                const uuid = require('uuid/v4')();
                const getPrivacyOptions = function() {
                    var opts = global.static.privacyOptions;
                    var bdy = req.body.privacyOptions;
                    var out = [];
                    for(var i=0; i < opts.length;i++){
                        var o = {
                            key : opts[i].key,
                            value: opts[i].defaultValue
                        }
                        for(var j=0; j < bdy.length;j++){
                            if(bdy[j].key === opts[i].key){
                                o.value = bdy[j].value
                            }
                        }
                        out.push(o);
                    }
                    return out;
                }
                const newUser = {
                    "type": "user",
                    "username": req.body.username.toLowerCase(),
                    "uuid": uuid,
                    "password": require('MD5')(req.body.password),
                    "name" : req.body.name,
                    "bio": req.body.bio,
                    "registrationDate": new Date(),
                    "status": "active",
                    "blockedUntil": null,
                    "gender": req.body.gender,
                    "passwordMustBeChanged": false,
                    "birthDay": new Date(req.body.birthDay),
                    "address": {
                        "streetLine1": req.body.address.streetLine1,
                        "streetLine2": req.body.address.streetLine2,
                        "city": req.body.address.city,
                        "stateOrCounty": req.body.address.stateOrCounty,
                        "postCode": req.body.address.postCode,
                        "latitude": req.body.address.latitude,
                        "longitude": req.body.address.longitude,
                        "country": {
                            "iso3166": req.body.address.country.iso,
                            "name": req.body.address.country.name,
                            "areaCode": req.body.address.country.areaCode
                        }
                    },
                    "contactInfo": [
                        {
                            "type": "email",
                            "value": req.body.email,
                            "confirmed": false
                        },
                        {
                            "type": "mobile",
                            "value": phone,
                            "confirmed": true
                        }
                    ],
                    "lastRelevantUpdate" : null,
                    "tos" : [{
                        timestamp: new Date(),
                        ipAddress: req.connection.remoteAddress,
                        agreed: req.body.tos
                    }],
                    "requiresNewTosAcceptance" : false,
                    "sessions": [],
                    "venues": req.body.venues,
                    "privacyOptions" : getPrivacyOptions(),
                    "customData": req.body.customData ? req.body.customData : null
                };
                global.db.users.insertOne(newUser, function (err) {
                    if (err) {
                        e = {
                            code: 'REGISTRATION_ERROR',
                            context : 'registration/register'
                        }
                        global.utils.sendDbError(res,context);
                    }
                    else {
                        global.utils.sendOk(res, null);
                        //Delete SMS verify
                        var critSmsDel = {
                            uuid: req.body.phoneUUID
                        }
                    }
                    if(req.body.picture != null) {
                        global.cloudStorage.writeFile('users', uuid +'.png',req.body.picture);
                    }
                    global.db.verify.remove(critSmsDel, function(err, result) {});
                });
            });
        });
    });
}
function checkUsernameAvailability(username) {
    var deferred = Q.defer();
    const criteria = {
        $or: [
            {"username": username},
            {"alias.username": username}
        ]
    };
    global.db.users.count(criteria, function (err, count) {
        if(err !== null) {
            deferred.resolve(-1);
        }
        else {
            deferred.resolve(count);
        }
    });
    return deferred.promise;
}

exports.checkUsernameAvailability2 = function (username) {
    var deferred = Q.defer();
    const criteria = {
        $or: [
            {"username": username},
            {"alias.username": username}
        ]
    };
    global.db.users.count(criteria, function (err, count) {
        if(err !== null) {
            deferred.resolve(-1);
        }
        else {
            deferred.resolve(count);
        }
    });
    return deferred.promise;
}

function checkEmailAvailability(email) {
    var deferred = Q.defer();
    const criteria = {
        "contactInfo": {
            "$elemMatch":
                {
                    "value": email,
                    "type": "email"
                }
        }
    };
    global.db.users.count(criteria, function (err, count) {
        if(err !== null) {
            deferred.resolve(-1);
        }
        else {
            deferred.resolve(count);
        }
    });
    return deferred.promise;
}

function checkMobileAvailability(mobile) {
    var deferred = Q.defer();
    const criteria = {
        "contactInfo": {
            "$elemMatch":
                {
                    "value": mobile,
                    "type": "mobile"
                }
        }
    };
    global.db.users.count(criteria, function (err, count) {
        if(err !== null) {
            deferred.resolve(-1);
        }
        else {
            deferred.resolve(count);
        }
    });
    return deferred.promise;
}

function generateCode() {
    const length = 4,
        charset = "0123456789";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function getPhoneByUUID(uuid, code) {
    var deferred = Q.defer();
    const criteria = {
        uuid: uuid,
        code: code
    };
    global.db.verify.findOne(criteria, function (err, doc) {
        if (doc == null) {
            deferred.resolve(null);
        }
        else {
            deferred.resolve(doc.mobileNumber);
        }
    });
    return deferred.promise;
}


