var gulp = require('gulp');
var copy = require('gulp-copy');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');

// Create an external CSS style that can optionally be used by devs instead of the webpack style loader
// This is useful when using Angular CLI since all styles must be specified in the styles property of a component
// See: https://github.com/angular/angular-cli/issues/1459
// Note: the typestyles will still be imported fine since they are not css files
// TODO: Add that this can be used in the README with an example for Angular CLI
gulp.task('create-styles', function(){
    return gulp.src('./src/styles.css')
        .pipe(concatCss('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./lib'));
});

// Copy all assets that aren't js or ts
gulp.task('copy:assets', function() {
    return gulp.src('./src/**/!(*.ts|*.tsx|*.js|*.jsx|*.map|*.log)')
        .pipe(copy('./lib', {
            prefix: 1 // Remove the src part of the path
        }))
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['copy:assets', 'create-styles']);