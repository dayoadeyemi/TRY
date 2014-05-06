async-try, helper module to debug asyncronous code.

usage:
```JavaScript
var _ = require("lodash");
var TRY = require("async-try").TRY;

var waitForIt = _.curry(function(time, callback){
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
});

TRY( "waiting for it", waitForIt(5),  console.log, function(result){
	console.log("This module is " + result);
})

var dontWait = function(callback){
	TRY( "pretending to wait for it", waitForIt(2),  callback, function(result){
		console.log("This module is " + result);
	});
}

TRY( "not waiting for it", dontWait,  throwErr, function(result){
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
 | While pretending to wait for it at: dontWait (C:\Users\DayoAdeyemi\vm5.6\dev-
vm\vagrant\ece-dev\projects\async-try\test.js:27:2)
 | While not waiting for it at: Object.<anonymous> (C:\Users\DayoAdeyemi\vm5.6\d
ev-vm\vagrant\ece-dev\projects\async-try\test.js:35:1)
...dary
This module is legendary!
```