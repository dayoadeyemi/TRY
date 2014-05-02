/**
 * TRY
 */
var _ = require ('lodash');
module.exports.TRY = function (desc, fn, fail, succ){
  fn(function(){
    var argsArray = _.toArray(arguments);
    var error = _.first(argsArray);
    var args = _.rest(argsArray);
    if (error) {
      fail("while " + desc + "\n -> " + error );
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