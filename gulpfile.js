var gulp         = require('gulp');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var reactify     = require('reactify');
var watchify     = require('watchify');
var browserify   = require('browserify');
var browserSync  = require('browser-sync');
var sass  		 = require('gulp-sass');



var config = {
    paths: {
        html: {
            src:  ["src/**/*.html"],
            dest: "build"
        },
        sass: {
            src:  ["src/sass/main.scss"],
            dest: "build/styles"
        },
    }
}

// Input file.
var bundler = watchify(browserify('./src/js/index.js', watchify.args));

// React JSX transform
bundler.transform(reactify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {
 
    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream: true, once: true}));
}

gulp.task("html", function(){
    return gulp.src(config.paths.html.src)
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task('bundle', function () {
    return bundle();
});

gulp.task('sass', function() {
	return gulp.src(config.paths.sass.src)
		.pipe(sass({sourceComments: 'map'}))
		.pipe(gulp.dest(config.paths.sass.dest));
});

gulp.task('default', ['bundle', 'html', 'sass'], function () {
    browserSync({
        server: "./build",
        browser: "google chrome",
        port: 5004
    });

    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch(config.paths.html.src, ['html']);
    gulp.watch("build/styles/*.css").on('change', browserSync.reload);
  	gulp.watch("build").on('change', browserSync.reload);

});