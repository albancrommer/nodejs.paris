/**
  * A basic fs script: open 1..n files and search string 
  * 
  * @usage needle file1 .. fileN
  * @name Multiple files grep
  * @description A basic fs script: open 1..n files and search string 
  * @tags cli fs grep
  * @author Nodejs.paris
  */ 

var fs = require("fs");
var args = process.argv.slice(2);
if( args.length < 1 ){ console.log("Not enough arguments"); process.exit(1); }
var str_search = args[ 0 ];
var fileList = args.slice(1);
var re = new RegExp(str_search, "gmi");
for( var i = 0; i < fileList.length; i ++){
    fs.readFile(fileList[i], function(err, cont) {
        if (err){
            console.log( err);
            return;
        }
        while ((found = re.exec(cont)) !== null)
        { 
           console.log("Found " + found[0] + " in "+fileList[i]);
        }
    });
};
