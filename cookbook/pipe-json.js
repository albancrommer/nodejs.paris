/**
  * Un processus de pipe simple pour rendre le JSON lisible
  * 
  * @usage cat "file.json" | node pipe-json.js 
  * @name Pipe JSON
  * @description Convertit en stdin du JSON brut en lisible
  * @tags cli pipe stream
  * @author Trent Mick, revised by Nodejs.paris
  * @url http://code.activestate.com/recipes/577549-nicerest-pretty-print-json-output/
  */ 
var stdin = process.openStdin();
var buffer = "";
stdin.setEncoding('utf8');
stdin.on('data', function (chunk) {
    buffer += chunk;
});
stdin.on('end', function () {
    if (buffer[0] === '{' || buffer[0] === '[') {
        try {
            process.stdout.write(JSON.stringify(JSON.parse(buffer), null, 2));
            process.stdout.write('\n');
        } catch(ex) {
            process.stdout.write(buffer);
            if (buffer[buffer.length-1] !== "\n") {
                process.stdout.write('\n');
            }
        }
    } else {
        process.stdout.write(buffer);
        if (buffer[buffer.length-1] !== "\n") {
            process.stdout.write('\n');
        }
    }
});