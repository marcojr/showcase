exports.login = function (req, res) {
    var e;
    const criteria = {
        "$or": [
            {
                "username": req.body.usernameOrMobile
            },
            {
                "contactInfo": {
                    "$elemMatch": {
                        "type": "mobile",
                        "value": req.body.user
                    }
                }
            }
        ], "password": require('MD5')(req.body.password)
    };
    global.db.users.findOne(criteria, function (err, doc) {
        if (doc == null) {
            e = {
                code: 'INVALID_CREDENTIALS',
                context : 'session/login'
            }
            global.utils.sendException(401,res, e);
        }
        else {
            if(doc.status ==='deleted'){
                e = {
                    code: 'INVALID_CREDENTIALS',
                    context : 'session/login'
                }
                global.utils.sendException(401,res, e);
                return;
            }
            if(doc.blockedUntil !=null){
                if(new Date(doc.blockedUntil) > new Date())
                e = {
                    code: 'ACCOUNT_BLOCKED',
                    context : 'session/login'
                }
                global.utils.sendException(401,res, e);
                return;
            }
            const token = require('rand-token').generate(512);
            var tokenExp = new Date();
            tokenExp.setDate(tokenExp.getDate() + global.config.tokenExpDays);
            var response = {
                "type": doc.type,
                "username": doc.username,
                "uuid": doc.uuid,
                "name": doc.name,
                "bio": doc.bio,
                "registrationDate": doc.registrationDate,
                "status": doc.status,
                "blockedUntil": doc.blockedUntil,
                "requiresNewTosAcceptance" : doc.requiresNewTosAcceptance,
                "gender": doc.gender,
                "birthDay": doc.birthDay,
                "address": doc.address,
                "contactInfo": doc.contactInfo,
                "venues": doc.services,
                "customData": doc.customData,
                "privacyOptions" : doc.privacyOptions,
                "passwordMustBeChanged" : doc.passwordMustBeChanged,
                "session" : {
                    token: token,
                    expiration: tokenExp
                }
            };
            for(var i=0; i < doc.sessions.length; i++) {
                if(doc.sessions[i].localRnd === req.body.localRnd) {
                    doc.sessions.splice(i,1);
                    break;
                }
            }
            for(var i=0; i < doc.sessions.length; i++) {
                if(new Date(doc.sessions[i].expiration) <  new Date()) {
                    doc.sessions.splice(i,1);
                    break;
                }
            }
            doc.sessions.push({
                token: token,
                expiration: tokenExp,
                localRnd : req.body.localRnd,
                appType: req.body.appType,
                deviceInfo : req.body.deviceInfo
            });
            const crit = { uuid : doc.uuid};
            const updatedSessions = {
                $set : {
                    sessions : doc.sessions
                }
            };
            global.db.users.updateOne(crit,updatedSessions);
            global.utils.sendOk(res, response);
        }
    });
}
exports.logout = function (req, res) {
    var e;
    global.utils.validateToken(req.headers.authorization).then(function(uuid) {
        if(req.params.uuid !== null) {
            const update = {
                $pull: {
                    "sessions": {
                        "token": req.headers.authorization
                    }
                }
            };
            global.db.users.update({ uuid: uuid}, update, function () {
                global.utils.sendOk(res, "Session terminated");
                });
        } else {
            e = {
                code: 'INVALID_SESSION',
                context : 'session/logout'
            }
            global.utils.sendException(403,res, e);
        }
    });
};
