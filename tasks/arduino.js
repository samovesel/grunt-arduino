/*
 * grunt-arduino
 * https://github.com/lasselukkari/grunt-arduino
 *
 * Copyright (c) 2015 Lasse Lukkari
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function (grunt) {
  grunt.registerMultiTask('arduino', 'Grunt Arduino.', function () {
    var options = this.options({
      idePath: '/Applications/Arduino.app/Contents/MacOS/arduino'
    });
    var done = this.async();
    var args = [];

    if (options.action) {
      args.push('--' + options.action);
    }

    if (options.preferencesFile) {
      args.push('--preferences-file', options.preferencesFile);
    } else {
      if (options.board) {
        if (!options.board.package || !options.board.arch || !options.board.board) {
          grunt.fail.fatal('One or more board parameters are missing');
        } else {
          var board = [options.board.package, options.board.arch];

          if (options.action === 'installBoards') {
            if (options.board.version) {
              board.push(options.board.version)
            }
            args.push('--install-boards', board.join(':'));
          } else {
            board.push(options.board.board);
            if (options.board.parameters) {
              board.push(options.board.parameters)
            }
            args.push('--board', board.join(':'));
          }
        }
      }

      if (options.port) {
        args.push('--port', options.port);
      }

      if (options.verbose) {
        args.push('--v');
      } else {
        if (options.verboseBuild) {
          args.push('--verbose-build');
        }

        if (options.verboseUpload) {
          args.push('--verbose-upload');
        }
      }

      if (options.preserveTempFiles) {
        args.push('--preserve-temp-files');
      }

      if (options.savePrefs) {
        args.push('--save-prefs');
      }
    }

    if (options.action === 'upload' || options.action === 'verify') {
      if (!options.sketch) {
        grunt.fail.fatal('Sketch options is missing');
      } else if (!grunt.file.exists(options.sketch)) {
        grunt.fail.fatal('Sketch file not found');
      }

      args.push(path.resolve(options.sketch));
    } else if (options.action === 'getPref') {
      if (options.preference) {
        args.push(options.preference);
      }
    } else if (options.action === 'installLibrary') {
      if (options.libraries.length) {
        var libraries = [];

        options.libraries.forEach(function (library) {
          if (!library.name) {
            grunt.fail.fatal('Library name missing');
          }

          var libraryParams = [];
          libraryParams.push(library.name);
          if (library.version) {
            libraryParams.push(library.version);
          }

          libraries.push(library.join(':'))
        });

        args.push('--install-library', libraries.join(','));
      }
    }

    grunt.log.writeln('Parameters: ' + args.join(' '));

    grunt.util.spawn({
      cmd: path.resolve(options.idePath),
      args: args
    }, function (err, result) {
      if (result.stderr.indexOf('error:') >= 0) {
        grunt.fail.fatal(result.stderr);
      } else if (err) {
        grunt.fail.fatal(err);
      } else {
        if (result.stderr) {
          grunt.log.warn(result.stderr);
        }

        if (result.stdout) {
          grunt.log.ok(result.stdout);
        }
      }

      done();
    });
  });
};
