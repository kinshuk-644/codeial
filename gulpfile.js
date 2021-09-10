const gulp = require("gulp");

// to convert sass into css 
const sass = require("gulp-sass")(require("sass"));

// to compress css files 
const cssnano = require("gulp-cssnano");

// to reversion or rename a file with a hash maybe 
const rev = require("gulp-rev");

// to minify js files
const uglify = require("gulp-uglify-es").default;

const minify = require("gulp-minify");

// to minify images 
// const imagemin = require("gulp-imagemin"); 

const del = require("del");

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

    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())

    // .pipe(minify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
});

// gulp.task('images', function(done){
//     console.log("Compressing images...");

//     gulp.src('./assets/**/*.+(png|jgp|gif|svg|jpeg)')
//     .pipe(imagemin({
//         progressive: true
//     }))
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));

//     done();
// });

// empty the public/assets directory initially 
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js'), function(done){
    console.log("Building assets");
    done();
});