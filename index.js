/**
 * Updated by crivas on 09/17/2015
 * Email: chester.rivas@gmail.com
 * Plugin Name: gulp-sass-packager
 */

'use strict';

var fs = require('fs'),
  through = require('through2'),
  gutil = require('gulp-util'),
  _ = require('underscore-node');

/**
 * gulp task to be piped in
 * @param options
 * @returns {*}
 */
var moduleRenamer = function (options) {

  options = options || {};

  var moduleName = !_.isUndefined(options.newModuleName) ? options.newModuleName : 'customModule';

  /**
   * rename module
   * @param object
   * @returns {object}
   */
  var reNameModules = function (object) {

    var newModuleString = 'angular.module(\'' + moduleName + '\'';

    return object.replace(/(?:angular\.module)(?:\(('|")(.*?)('|"))/gi, function (str) {
      if (options && options.showLogs) {

        //gutil.log('------------------------');
        //gutil.log('renaming after :', gutil.colors.cyan(object.substr(0,250) + ":" + str));
        //gutil.log('------------------------');
      }
      return newModuleString;
    });

  };

  /**
   * buffer each content
   * @param file
   * @param enc
   * @param callback
   */
  var bufferedContents = function (file, enc, callback) {

    if (file.isStream()) {

      this.emit('error', new gutil.PluginError('gulp-ng-module-renamer', 'Streams are not supported!'));
      callback();

    } else if (file.isNull()) {

      callback(null, file); // Do nothing if no contents

    } else {
      var ctx = file.contents.toString('utf8'),
        modulesString = reNameModules(ctx),
        path = ('' + file.history).split('/'),
        name = path[path.length - 1];

      if (name.indexOf('cartService') === -1) {
        file.contents = new Buffer(modulesString);
      }

      callback(null, file);

    }

  };

  /**
   * returns streamed content
   */
  return through.obj(bufferedContents);

};

module.exports = moduleRenamer;
