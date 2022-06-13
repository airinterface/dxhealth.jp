var exec = require('child_process').exec;

module.exports = executeCommand = async function(command ){
    return new Promise( ( resolve, reject ) => {
        var child = exec(command, function(err, stdout, stderr){
            if(err != null){
                reject(err);
            }else if(typeof(stderr) != "string"){
                reject( stderr );
            }else{
                resolve(stdout);
            }
        });

    })
}

