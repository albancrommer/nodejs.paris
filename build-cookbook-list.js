#! /usr/local/bin/node
/**
  * A basic fs script: open 1..n files and search string 
  *
  * @file build-cookbook-list.js 
  * @usage (dir:optional)
  * @author Nodejs.paris
  */ 

var fs = require("fs");
var args = process.argv.slice(2);
var dir = args[ 0 ] || "cookbook";
var myReg = new RegExp( " \* @tags (.*)$");
fs.stat(dir,function(err,stat){
	if( err ){
		console.log(err);
		process.exit( 1 );
	}	
	if( ! stat.isDirectory() ) {
		console.log( dir+" is not a directory.");
		process.exit( 1 );
	}
});
var fileList = fs.readdirSync( dir ); 
if( ! fileList.length ){
	console.log( dir + "is empty");
	process.exit( 1 );
}
var dataHandler = { 
	counter : 0, 
	dir : dir,
	fileList : fileList, 
	tagList : {all:[]}, 
	add : function(file){
		var that = this;
                that.tagList.all.push(file);
		fs.readFile( dir+file, function( err, cont ){
	
			if( err ) {
				console.log(err);
				that.count();
				return;
			 }
			var rowList = cont.toString().split("\n");
			rowList.forEach( function(row ){
				var match = myReg.exec(row);
				if( match ){
					match[1].split(" ").forEach( function(tag){
						if( ! tag ){
							return;
						}
						if( !( tag in that.tagList )){
							that.tagList[tag] = [];
						}
						that.tagList[tag].push( file );
					});
				}

			});
			that.count();	
		});
	},
	count: function(){
		this.counter++;
		if( this.counter === this.fileList.length ){
			this.output();	
		}
	},
	output : function(){
		fs.writeFile("cookbook.json", JSON.stringify(this.tagList)); 
	}
};
fs.readdir(dir, function(err, list) {
    if (err){
		console.log(err); return;
	}
	list.forEach( function(file){
		dataHandler.add(file);
	});

});
