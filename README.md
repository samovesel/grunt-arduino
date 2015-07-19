# grunt-arduino

> Arduino IDE Grunt plugin.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-arduino --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-arduino');
```

## The "arduino" task

### Options

#### options.idePath
Type: `String`
Default value: `'/Applications/Arduino.app/Contents/MacOS/arduino'`

Path to Arduino program file.

#### options.sketch
Type: `String`

Path to the sketch file.

#### options.action
Type: `String`

Defines the performed action.
##### Available actions

###### verify
Builds the sketch.

###### upload
Builds and uploads the sketch.

###### getPref
Prints the value of the given preference to the standard output stream. When the value does not exist, nothing is printed and the exit status is set (see EXIT STATUS below). If no preference is given as parameter, it prints all preferences. Used with `options.board` parameter

###### installBoards
Fetches available board support (platform) list and install the specified one, along with its related tools. If version is omitted, the latest is installed. If a platform with the same version is already installed, nothing is installed and program exits with exit code 1. If a platform with a different version is already installed, it’s replaced. Used with `options.board` parameter

###### installLibrary
Fetches available libraries list and install the specified one. If version is omitted, the latest is installed. If a library with the same version is already installed, nothing is installed and program exits with exit code 1. If a library with a different version is already installed, it’s replaced. Used with `options.libraries` parameter.

#### options.libraries
Type: `[{name: String, version: String}]`
An array of libraries to install. Parameter `version` is optional.

#### options.board.package
Type: `String`

Package is the identifier of the vendor (the first level folders inside the hardware directory). Default arduino boards use `arduino`.

#### options.board.arch
Type: `String`

Architecture is the architecture of the board (second level folders inside the hardware directory). Default arduino boards use either `avr` for all AVR-based boards (like Uno, Mega or Leonardo) or ´sam´ for 32bit SAM-based boards (like Arduino Due).

#### options.board.board
Type: `String`

Board is the actual board to use, as defined in boards.txt contained in the architecture folder selected. For example, `uno` for the Arduino Uno, `diecimila` for the Arduino Duemilanove or Diecimila, or ´mega´ for the Arduino Mega.

#### options.preference
Type: `String`

Used with ´getPref´ action;

#### options.parameters
Type: `String`
Parameters is a comma-separated list of boards specific parameters that are normally shown under submenus of the "Tools" menu. For example 'cpu=atmega168' to Select the mega168 variant of the Arduino Nano board.

#### options.verboseBuild
Type: `Boolean`
Default value: `false`

Enable verbose mode during build. If this option is not given, verbose mode during build is disabled regardless of the current preferences.

#### options.verboseUpload
Type: `Boolean`
Default value: `false`

Enable verbose mode during upload. If this option is not given, verbose mode during upload is disabled regardless of the current preferences.

This option is only valid together with actions 'verify' or 'upload'.

#### options.verbose
Type: `Boolean`
Default value: `false`

Enable verbose mode during build and upload. This option has the same effect of using both verboseBuild and --verboseUpload.

#### options.preserveTempFiles
Type: `Boolean`
Default value: `false`

Keep temporary files (preprocessed sketch, object files…) after termination. If omitted, temporary files are deleted.

This option is only valid together with actions `verify´ or `upload`.

#### options.preferencesFile
Type: `Boolean`
Default value: `false`

Read and store preferences from the specified filename instead of the default one.

#### options.savePrefs
Type: `Boolean`
Default value: `false`

Save any (changed) preferences to preferences.txt. In particular --board, --port, --pref, --verbose, --verbose-build and --verbose-upload may alter the current preferences.
### Usage Example

```js
grunt.initConfig({
 arduino: {
   options: {
     sketch: 'dist/server/server.ino',
     idePath: '/Applications/Arduino.app/Contents/MacOS/arduino'
   },
   settings: {
     options: {
       savePrefs: true,
       port: '/dev/cu.usbmodem123456',
       board: {
         package: 'esp8266',
         arch: 'esp8266',
         board: 'esp8266'
       }
     }
   },
   verify: {
     options: {
       action: 'verify'
     }
   },
   upload: {
     options: {
       action: 'upload'
     }
   }
 },
});
```
