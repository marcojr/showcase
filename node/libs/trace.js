exports.log = function (context,txt){
    //0 - Normal
    //1 - Db
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    var d = time.getDate();
    var mo = time.getMonth() + 1;
    var y = time.getFullYear();
    var timeStamp = pad(h,2) + ":" + pad(m,2) + ":" + pad(s,2);
    var line;
    line = timeStamp + "|" + context +'|' + txt;
    console.log(line);
    writeLine('trace', line, y,mo,d);
}
function writeLine(file,line, y,m,d){
    var fs = require('fs');
    var r = global.appDir + '/logs/';
    var dir = r + pad(y,4) +'/' + pad(m,2);
    if (!fs.existsSync(r + pad(y,4))){
        fs.mkdirSync(r + pad(y,4));
        if (!fs.existsSync(r + pad(y,4) +'/' + pad(m,2))){
            fs.mkdirSync(r + pad(y,4) + '/' +  pad(m,2));
        }
    }
    else {
        if (!fs.existsSync(r + pad(y,4) +'/' + pad(m,2))){
            fs.mkdirSync(r + pad(y,4) + '/' + pad(m,2));
        }
    }
    fs.appendFile(dir + '/' + pad(d, 2) + '_' + file + '.log', line + '\r\n');
}
function pad (num, size) {
    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
}