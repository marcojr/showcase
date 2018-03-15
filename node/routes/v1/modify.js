exports.password = function (req, res) {
    var e;
    global.utils.validateToken(req.headers.authorization).then(function (uuid) {
        if (uuid !== null) {
            const criteria = {
                uuid: req.params.uuid,
                password: require('MD5')(req.body.currentPassword)
            };
            const update = {
                "$set": {
                    password: require('MD5')(req.body.newPassword)
                }
            }
            global.db.users.updateOne(criteria, update, function (err, feedback) {
                if (feedback.result.nModified < 1) {
                    e = {
                        code: 'CANNOT_CHANGE_PASSWORD',
                        context : 'modify/password'
                    }
                    global.utils.sendFail(res, e);
                } else {
                    global.utils.sendOk(res, 'Password successfully changed');
                }
            });
        }
        else {
            e = {
                code: 'INVALID_SESSION',
                context : 'modify/password'
            }
            global.utils.sendFail(res, e);
        }
    });
}