const gulp = require("gulp");

// to convert sass into css 
const sass = require("gulp-sass");

// to compress css files 
const cssnano = require("gulp-cssnano");

// to reversion or rename a file with a hash maybe 
const rev = require("gulp-rev");

gulp.task('css', function(){
    console.log("Minifying css...");

    gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
});