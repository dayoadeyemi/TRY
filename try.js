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
      return fail("while " + desc + "\n -> " + error );
    }
    if (_.isFunction(succ)) {
      succ.apply(this, args);
    } else {
      fail.apply(this, argsArray);
    }
  });
};