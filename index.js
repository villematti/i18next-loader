/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Kamil Głód @kglod
*/

var loaderUtils = require('loader-utils');
var i18next = require('i18next');


module.exports = function(source) {
	if (this.cacheable) {
    this.cacheable();
  }

  i18next.on('missingKey', function(lngs, namespace, key, res) {
    this.emitWarning('[' + lngs + '] key `' + namespace + ':' + key + '` missing');
  }.bind(this));

  var params  = loaderUtils.parseQuery(this.query);
  var funcName = params.funcName || '__';
  var quotes = params.quotes || '\'';
  var regex = new RegExp(funcName + '\\([\'"`](.*)[\'"`]\\)', ['g']);

  source = source.replace(regex, function (res, key) {
    return '\'' + i18next.t(key) + '\'';
  });

  return source;
}
