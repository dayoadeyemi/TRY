async-try, helper module to debug asyncronous code.

usage:
```JavaScript
var TRY = require("async-try").TRY;

var waitForIt = function(time, callback){
	console.log("this module is legen...");
	console.log("...wait for it...");
	if ( time > 3 ){
		setTimeout(function(){
			console.log("...dary");
			callback(null, "legendary!");
		}, time*1000 );
	} else {
		callback("need more patience");
	}
};

var waitFor = function(time){
	return function(callback) {
		waitForIt(time, callback);
	}
}

TRY( "waiting for it", waitFor(5),  console.log, function(result){
	console.log("This module is " + result);
})

var dontWait = function(callback){
	TRY( "pretending to wait for it", waitFor(2),  callback, function(result){
		console.log("This module is " + result);
	});
}

var logError = function(error){
	console.log("[ERROR] " + error);
}
TRY( "not waiting for it", dontWait,  logError, function(result){
	console.log("This module is " + result);
})
```

will output
```AsciiDoc
this module is legen...
...wait for it...
this module is legen...
...wait for it...
[ERROR] need more patience
 | While pretending to wait for it at: dontWait (C:\Path\to\file.js:27:2)
 | While not waiting for it at: Object.<anonymous> (C:\Path\to\file.js:35:1)
...dary
This module is legendary!
```