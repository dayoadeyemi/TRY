/**
 * TRY
 */
var _ = require ('lodash');
module.exports.TRY = function (desc, fn, fail, succ){
	
	function getErrorObject(){
		try { throw Error('') } catch(err) { return err; }
	}

	var err = getErrorObject();
	var caller_line = err.stack.split("\n")[4];
	var index = caller_line.indexOf("at ");
	var clean = caller_line.slice(index+2, caller_line.length);

  fn(function(){
    var argsArray = _.toArray(arguments);
    var error = _.first(argsArray);
	var stackTrace
    var args = _.rest(argsArray);
    if (error) {
      fail(error + "\n"+ (_.isString(desc) && !_.isEmpty(desc))?(" | While " + desc):"" + " at:" + clean );
    }
    else if (_.isFunction(succ)) {
      succ.apply(this, args);
    } else if (_.isFunction(fail)) {
      fail.apply(this, argsArray);
    }
    
    return function(printer){
      printer(desc);
    };
  });
};