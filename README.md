Gulp Angular Module Renamer
====================
![gulp-ng-module-renamer build status](https://travis-ci.org/crivas/gulp-ng-module-renamer.svg?branch=master)

> Uses a regex pattern search and replace any js files with angular.modules('\*') to angular.module('ute.ui.custom') or whatever you want

Example

```js
var moduleRenamer = require('gulp-ng-module-renamer');

gulp.task('module-rename', function () {

  return gulp.src('app/js/**/*.js')
    .pipe(moduleRenamer()) // will default to default module name
    .pipe(gulp.dest('dist/js'))

});
```

Example With Options
```js
var moduleRenamer = require('gulp-ng-module-renamer');

gulp.task('module-rename', function () {

  return gulp.src('app/js/**/*.js')
    .pipe(moduleRenamer({
      newModuleName: 'custom.module.name'
      showLogs: true
    }))
    .pipe(gulp.dest('dist/js'))

});
```
