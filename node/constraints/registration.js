var v = global.utils;
exports.registration_SendSMS = function(req) {
    var warnings= [];
    warnings.push(v.validateAlpha('MOBILE_NUMBER',req.body.mobileNumber,false,8,15));
    return warnings;
}
exports.registration_ConfirmSMS = function(req) {
    var warnings= [];
    warnings.push(v.validateAlpha('MOBILE_NUMBER',req.body.mobileNumber,false,8,15));
    warnings.push(v.validateAlpha('MOBILE_CONFIRMATION_CODE',req.body.code,false,4,4));
    return warnings;
}
exports.registration_checkUsernameAvailability = function (req) {
    var warnings = [];
    warnings.push(v.validateRegEx('USERNAME',req.query.username.toLowerCase(),false,/^[a-z]\w{2,20}$/));
    return warnings;
}
exports.registration_checkEmailAvailability = function (req) {
    var warnings = [];
    warnings.push(v.validateRegEx('EMAIL',req.query.email,false,/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
    return warnings;
}
exports.registration_checkMobileAvailability = function (req) {
    var warnings = [];
    warnings.push(v.validateRegEx('USERNAME','+' + req.query.mobile,false,/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/));
    return warnings;
}
exports.registration_register = function (req) {
    var warnings = [];
    //"MISSING_PHONE_CONFIRMATION_UUID","BIRTHDAY_INVALID","LATITUDE_INVALID","LONGITUDE_INVALID","COUNTRY_AREA_CODE_INVALID"]}
    warnings.push(v.validateRegEx('USERNAME',req.body.username.toLowerCase(),false,/^[a-z]\w{2,20}$/));
    warnings.push(v.validateAlpha('PHONE_CONFIRMATION_CODE',req.body.phoneCode,false,4,4));
    warnings.push(v.validateAlpha('PHONE_CONFIRMATION_UUID',req.body.phoneUUID,false,36,36));
    warnings.push(v.validateAlpha('PICTURE',req.body.picture,true,1,-1));
    warnings.push(v.validateRegEx('PASSWORD',req.body.password,false,/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,12}$/));
    warnings.push(v.validateAlpha('NAME_TITLE',req.body.name.title,false,0,10));
    warnings.push(v.validateAlpha('NAME',req.body.name.name,false,2,50));
    warnings.push(v.validateAlpha('BIO',req.body.bio,false,0,256));
    warnings.push(v.validateAlpha('GENDER',req.body.gender,true,4,15));
    warnings.push(v.validateDate('BIRTHDAY',req.body.birthDay,true));
    warnings.push(v.validateAlpha('STREET_LINE_1',req.body.address.streetLine1,true,0,150));
    warnings.push(v.validateAlpha('STREET_LINE_2',req.body.address.streetLine2,true,0,150));
    warnings.push(v.validateAlpha('CITY',req.body.address.city,true,0,150));
    warnings.push(v.validateAlpha('STATE_OR_COUNTY',req.body.address.stateOrCounty,true,0,100));
    warnings.push(v.validateAlpha('POST_CODE',req.body.address.postCode,true,0,20));
    warnings.push(v.validateNumber('LATITUDE',req.body.address.latitude,true,-90,90));
    warnings.push(v.validateNumber('LONGITUDE',req.body.address.latitude,true,-180,180));
    warnings.push(v.validateAlpha('COUNTRY_ISO',req.body.address.country.iso,false,2,2));
    warnings.push(v.validateAlpha('COUNTRY_NAME',req.body.address.country.name,false,2,70));
    warnings.push(v.validateNumber('COUNTRY_AREA_CODE',req.body.address.country.areaCode,false,1,999999));
    warnings.push(v.validateRegEx('EMAIL',req.body.email,false,/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/));
    warnings.push(v.validateAlpha('TOS',req.body.tos,false,2,20000));
    warnings.push(v.validateVenuesArray(req.body.venues,1));
    warnings.push(v.validatePrivacyArray(req.body.privacyOptions,0));
    return warnings;
}