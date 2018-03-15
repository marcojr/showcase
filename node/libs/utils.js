exports.sendOk = function (res, data) {
    res.json(
        {
            successfully: true,
            data: data
        }
    );
}
exports.sendFail = function (res,error) {
    res.json(
        {
            successfully: false,
            error: error
        }
    );
}
exports.sendException = function (httpErrorCode,res,error) {
    res.status(httpErrorCode).send(error);
}
exports.sendDbError = function(res,context) {
    const e = {
        code: 'DATABASE_ERROR',
        context : context
    }
    global.utils.sendException(500,res, e);
}
exports.generateRandomRange = function (ini, end, count, exclusion) {
    var numbers = [];
    if (count < end) {
        count = end;
    }
    for (var i = 0; i < count; i++) {
        var num = Math.floor(Math.random() * (end - ini + 1)) + ini;
        var addIt = true;
        for (var j = 0; j < exclusion.length; j++) {
            if (exclusion[j] === num) {
                addIt = false;
            }
        }
        for (var j = 0; j < numbers.length; j++) {
            if (numbers[j] === num) {
                addIt = false;
            }
        }
        if (addIt) {
            numbers.push(num);
        } else {
            i--;
        }
    }
    return numbers;
}
exports.validateToken = function (token) {
    var deferred = Q.defer();
    var criteria = {
        "sessions": {
            "$elemMatch":
                {
                    "token": token,
                    "expiration": {
                        "$gt": new Date()
                    }
                }
        }
    };
    global.db.users.findOne(criteria, {uuid: true}, function (err, doc) {
        if (doc == null) {
            deferred.resolve(null);

        } else {
            deferred.resolve(doc.uuid);
        }
    });
    return deferred.promise;
}
exports.getCountryByIso3166 = function (iso) {
    var deferred = global.Q.defer();
    global.db.countries.findOne({iso: iso}, function (err, doc) {
        deferred.resolve(doc);
    });
    return deferred.promise;

}
exports.resolveAddress = function (g) {
    var deferred = global.Q.defer();
    try {
        const https = require('https');
        var par = g.replace(/ /g, "+");
        par = require('utf8').encode(par);
        const options = {
            host: 'maps.googleapis.com',
            path: '/maps/api/geocode/json?key=' + global.config.google.geolocationKey + '&address=' + par
        };
        http.request(options, function (response) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function () {
                try {
                    if (JSON.parse(str).status === 'ZERO_RESULTS') {
                        deferred.resolve({
                            lat: null,
                            lon: null,
                            msg: "Unable to locate the address"
                        });
                        return;
                    }
                    if (JSON.parse(str).error_message) {
                        deferred.resolve({
                            lat: null,
                            lon: null,
                            msg: JSON.parse(str).error_message
                        });
                        return;
                    }
                    var r = JSON.parse(str).results[0];
                    var countryName = "";
                    var countryIso2 = "";
                    for (var i = 0; i < r.address_components.length; i++) {
                        if (r.address_components[i].types[0] === "country") {
                            countryName = r.address_components[i].long_name;
                            countryIso2 = r.address_components[i].short_name;
                        }
                    }
                    deferred.resolve({
                        lat: r.geometry.location.lat,
                        lon: r.geometry.location.lng,
                        countryName: countryName,
                        countryIso2: countryIso2,
                        formatedAddress: r.formatted_address,
                        fullResponse: r
                    });

                }
                catch (ex) {
                    deferred.resolve({
                        lat: null,
                        lon: null,
                        msg: ex
                    });
                }
            });
        }).end();
    }
    catch (ex) {
        deferred.resolve({
            lat: null,
            lon: null,
            error: ex
        });
    }
    return deferred.promise;
}
exports.getUser = function (uuid) {
    var deferred = global.Q.defer();
    const crit = { "uuid": uuid };
    global.db.users.findOne(crit, function (err, doc) {
        deferred.resolve(doc);
    });
    return deferred.promise;
}
exports.checkConstraints = function (req, res, context)  {
    var sendResult = function(r) {
        for (var i = 0; i < r.length; i++) {
            if(typeof(r[i]) === 'undefined') {
                r.splice(i,1);
                i--;
            }
        }
        if(r.length === 0) {
            return {
                isValid : true
            }
        } else {
            return {
                isValid : false,
                warnings : r
            }
        }
    }
    if(context === 'registration/sendSMS') {
        return sendResult(require('../constraints/registration').registration_SendSMS(req));
    }
    if(context === 'registration/confirmSMS') {
        return sendResult(require('../constraints/registration').registration_ConfirmSMS(req));
    }
    if(context === 'registration/checkUsernameAvailability') {
        return sendResult(require('../constraints/registration').registration_checkUsernameAvailability(req));
    }
    if(context === 'registration/checkMobileAvailability') {
        return sendResult(require('../constraints/registration').registration_checkMobileAvailability(req));
    }
    if(context === 'registration/checkEmailAvailability') {
        return sendResult(require('../constraints/registration').registration_checkEmailAvailability(req));
    }
    if(context === 'registration/register') {
        return sendResult(require('../constraints/registration').registration_register(req));
    }
    return {
        isValid : false,
        warnings : ['INVALID_CONTEXT_FOR_CHECK']
    }
}
exports.validateAlpha = function(field, value,canBeNull,min,max) {
    if(typeof(value) ==='undefined') {
        return 'MISSING_' + field;
    }
    if(value === null && !canBeNull) {
        return field + '_CANNOT_BE_NULL';
    }
    if(value !== null && value.length < min) {
        return field + '_TOO_SMALL';
    }
    if(value !== null && value.length > max && value !== null && max > -1) {
        return field + '_TOO_LONG';
    }
}
exports.validateRegEx = function(field, value,canBeNull,regex) {
    if(typeof(value) ==='undefined') {
        return 'MISSING_' + field;
    }
    if(value === null && !canBeNull) {
        return field + '_CANNOT_BE_NULL';
    }
    var rg = new RegExp(regex);
    if(!rg.test(value)) {
        return field + '_INVALID';
    }
}
exports.validateDate = function(field, value,canBeNull) {
    if(typeof(value) ==='undefined') {
        return 'MISSING_' + field;
    }
    if(value === null && !canBeNull) {
        return field + '_CANNOT_BE_NULL';
    }
    if(value !== null) {
        var timestamp = Date.parse(value);
        if (isNaN(timestamp)) {
            return field + '_INVALID';
        }
    }
}
exports.validateNumber = function(field, value,canBeNull,min,max) {
    if(typeof(value) ==='undefined') {
        return 'MISSING_' + field;
    }
    if(value === null && !canBeNull) {
        return field + '_CANNOT_BE_NULL';
    }
    if(value !== null) {
        if (isNaN(value)) {
            return field + '_INVALID';
        }
        if (typeof(value) !== 'number') {
            return field + '_INVALID';
        }
        if (min !== null) {
            if (value < min) {
                console.log(value, min);
                console.log(1);
                return field + '_INVALID';
            }
        }
        if (max !== null) {
            if (value > max) {
                console.log(2);
                return field + '_INVALID';
            }
        }
    }
}
exports.validateVenuesArray = function(array,minCount){

    if(!array.constructor === Array) {
        return 'VENUE_INVALID_DATA';
    }
    if(array.length < minCount) {
        return 'VENUE_MIN_COUNT_NOT_REACHED';
    }
    var srvs = global.static.venues;
    for(var h=0; h < array.length;h++){
        var found = false;
        for(var i=0; i < srvs.length;i++){
            if(array[h] === srvs[i].key) {
                found = true;
            }
        }
        if(!found) {
            return 'INVALID_VENUE_LIST';
        }
    }
}
exports.validatePrivacyArray = function(array,minCount){
    if(!array.constructor === Array) {
        return 'PRIVACY_OPTIONS_INVALID_DATA';
    }
    if(array.length < minCount) {
        return 'PRIVACY_OPTIONS_MIN_COUNT_NOT_REACHED';
    }
    var opts = global.static.privacyOptions;
    for(var h=0; h < array.length;h++){
        var found = false;
        for(var i=0; i < opts.length;i++){
            if(array[h].key === opts[i].key) {
                var valueOk = false;
                for(j=0; j < opts[i].availableOptions.length;j++){
                    if(array[h].value === opts[i].availableOptions[j]){
                        valueOk = true;
                    }
                }
                if(!valueOk) {
                    return 'INVALID_PRIVACY_OPTION_VALUE';
                }
                found = true;
            }
        }
        if(!found) {
            return 'INVALID_PRIVACY_OPTIONS';
        }
    }
}