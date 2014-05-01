var subdue = require('../');

function getFoo(callback) {
    setTimeout(function() {
        callback(null, 'hello'); // callback(err, result)
    }, 200);
}

function getBar(callback) {
    setTimeout(function() {
        callback(null, 'world'); // callback(err, result)
    }, 200);
}

subdue(function * (resume) {
    var foo = yield getFoo(resume);
    var bar = yield getBar(resume);
    console.log(foo, bar);
});

//output: hello world