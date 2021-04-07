const { src, dest, watch, parallel, series } = require('gulp');
const less = require('gulp-less');
const minCss = require('gulp-minify-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create(); //from documentation
const uglify = require('gulp-uglify-es').default; //from documentation
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const del = require('del');

//BROWSER-SYNC
function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

//DELETE BUILD
function cleanDist() {
    return del('dist')
}

//IMAGES MINIFY
function images() {
    return src('app/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

//SCRIPTS
function scripts() {
    return src([
        'node_modules/swiper/swiper-bundle.js',
        'app/js/main.js'
    ])
        .pipe(concat('main.min.js')) //to one file
        .pipe(uglify()) //minify
        .pipe(dest('app/js'))
        .pipe(browserSync.stream()) //browser-sync
}

//LESS TO CSS, MINIFY CSS, *.CSS TO *.MIN.CSS
function styles() {
    return src('app/less/style.less')
        .pipe(less())
        .pipe(minCss())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'], //gulp-autoprefixer option from documentation
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream()) //browser-sync
}

//BUILD
function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], {base: 'app'}) //base dir in build
        .pipe(dest('dist'))
}

//WATCHING
function watching() {
    watch(['app/less/**/*.less'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload); //browser-sync
}

//EXPORTS
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching); //start parallel using command 'gulp' in console