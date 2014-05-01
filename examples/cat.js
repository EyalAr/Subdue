/**
 * Usage node --harmony cat.js file1, file2, ...
 */

var fs = require('fs'),
    subdue = require('../'),
    files = process.argv.slice(2);

subdue(function * (resume) {

    if (files.length < 1) {
        return console.error('No files specified.');
    }

    for (var i = 0; i < files.length; i++) {

        var file = files[i];

        var exists = yield fs.exists(file, function(exists) {
            resume(null, exists);
        });

        if (!exists) {
            return console.error('File', file, 'not found.');
        }

        try {
            var content = yield fs.readFile(file, {
                encoding: 'utf8'
            }, resume);
        } catch (e) {
            return console.error('Unable to read file', file, '(' + e.code + ')');
        }

        console.log(content);

    }

});