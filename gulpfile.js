const { src, dest, task, series, watch, parallel } = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const sourcemaps = require('gulp-sourcemaps');
const  babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

// const  svgo = require('gulp-svgo'); 
// const svgSprite = require('gulp-svg-sprite');
// const reload = browserSync.reload();

sass.compiler = require('node-sass');

task("clean", () => {
  console.log(env);
  return src('dist/**/*', { read: false }) .pipe( rm())
})

task("copy:css", () => {
  return src("src/styles/main.scss").pipe(dest("dist"));
});

task("copy:html", () => {
  return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
});

task("copy:img", () => {
  return src("src/img/**/*.*").pipe(dest("dist"));
});

const libs = [
  "node_modules/jquery/dist/jquery.min.js",
  "node_modules/jquery-touchswipe/jquery.touchSwipe.min.js",
  "node_modules/bxslider/dist/jquery.bxslider.min.js",
  "node_modules/mobile-detect/mobile-detect.min.js",
  "src/js/components/*.js",

]

task("scripts", () => {
  return src(libs)
  .pipe(gulpif(env === 'dev', sourcemaps.init()))
  .pipe(concat('main.min.js', {newLine: ";"}))
  .pipe(gulpif(env === 'dev', babel({
    presets: ['@babel/env']
  })))
  .pipe(gulpif(env === 'prod', uglify()))
  .pipe(gulpif(env === 'dev', sourcemaps.write()))
  .pipe(dest("dist"))
  .pipe(browserSync.reload({ stream: true }))
})

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open: true
  });
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/styles/main.scss"
]



task("styles", () => {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'dev', 
      autoprefixer({
       cascade: false
      })
    ))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS({compatibility: 'ie8'})))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(browserSync.reload({ stream: true }))
});

task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('src/js/components/*.js', series('scripts'));
});


task(
  "default",
   series(
      "clean", 
      parallel("copy:html", "styles", "scripts"),
      parallel('watch', 'server')
   )
);


task(
  "build",
   series(
      "clean", 
      parallel("copy:html", "styles", "scripts"),
   )
);