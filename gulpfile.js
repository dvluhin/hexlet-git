const { src, dest, parallel, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


const browserSyncJob = () => {
  browserSync.init({
    server: "public/",
    index: "pages/index.html"
  });

  watch('src/sass/**/*.scss', buildSass);
  watch('src/pages/**/*.html', copyHtml);
};

const buildSass = () => {
  console.log('Компиляция SASS');

  return src('src/sass/app.scss')
    .pipe(sass())
    .pipe(dest('public/css/'));
};

const copyHtml = () => {
  console.log('Копирование HTML');

  return src('src/pages/**/*.html')
    .pipe(dest('public/pages/'));
};

exports.build = parallel(buildSass, copyHtml);
exports.dev = series(buildSass, copyHtml, browserSyncJob);