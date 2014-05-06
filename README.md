async-try, helper module to debug asyncronous code.

usage:
```
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

var throwErr = function(error){
	Throw new Error(error);
}
```

Then for
```
TRY( "waiting for it", waitForIt(5),  throwErr, function(result){
	console.log("This module is " + result);
})
```
we get
```
this module is legen...
...wait for it...
...dary
This module is legendary!
```

But for
```
TRY( "waiting for it", waitForIt(2),  throwErr, function(result){
	console.log("This module is " + result);
})
```

we get
```
C:\Path\to\file.js:18
        throw new Error(error);
              ^
Error: while waiting for it
 -> need more patience
