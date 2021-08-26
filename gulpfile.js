const gulp = require("gulp");

// to convert sass into css 
const sass = require("gulp-sass")(require("sass"));

// to compress css files 
const cssnano = require("gulp-cssnano");

// to reversion or rename a file with a hash maybe 
const rev = require("gulp-rev");

// to minify js files
const uglify = require("gulp-uglify-es").default;

gulp.task('css', function(done){
    console.log("Minifying css...");

    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
});

gulp.task('js', function(done){
    console.log("Minifying js...");

    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
});