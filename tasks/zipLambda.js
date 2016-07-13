var Zip = require('adm-zip');

var zip = new Zip();
var files = [
    './dist/npm/index.js',
    './dist/npm/config.js'
].forEach(filePath => {
    zip.addLocalFile(filePath);
})
zip.writeZip('./lambda.zip');
