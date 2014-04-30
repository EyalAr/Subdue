/*
 * Take a generator, provide it with a 'resume' function
 * and run it.
 *
 * assume callbacks are in standard NodeJS form:
 *
 *     function(err, result)
 *
 */
module.exports = function(generator){

    var run;

    function resume(err, result){

        // if the callback returned an error
        // make the generator throw it.
        if (err) return run.throw(err);

        // pass the result to the last 'yield'
        // expression by calling generator's
        // 'next' with the result
        run.next.call(run, result);

    }

    run = generator(resume);
    run.next(); // start the generator immediately

};