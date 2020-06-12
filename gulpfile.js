// generated on 2020-04-09 using generator-webapp 4.0.0-7
const { src, dest, watch, series, parallel, lastRun } = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const fs = require("fs");
const mkdirp = require("mkdirp");
const browserSync = require("browser-sync");
const del = require("del");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { argv } = require("yargs");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");
const critical = require("critical").stream;
const workboxBuild = require("workbox-build");

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";
const isDev = !isProd && !isTest;

function styles() {
  return src("app/styles/style.scss")
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe(
      $.sass
        .sync({
          outputStyle: "expanded",
          precision: 10,
          includePaths: ["."],
        })
        .on("error", $.sass.logError)
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(!isProd, $.sourcemaps.write()))
    .pipe($.if(!isProd, dest(".tmp/styles"), dest("dist/styles")))
    .pipe(server.reload({ stream: true }));
}

function scripts() {
  return src("app/scripts/**/*.js")
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.babel())
    .pipe($.if(!isProd, $.sourcemaps.write(".")))
    .pipe($.if(!isProd, dest(".tmp/scripts"), dest("dist/scripts")))
    .pipe(server.reload({ stream: true }));
}

const lintBase = (files) => {
  return src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(server.reload({ stream: true, once: true }))
    .pipe($.eslint.format())
    .pipe($.if(!server.active, $.eslint.failAfterError()));
};

function lint() {
  return lintBase("app/scripts/**/*.js").pipe(dest("app/scripts"));
}

function html() {
  return src(["app/**/*.hbs", "!app/components/**/*.hbs"])
    .pipe($.useref({ searchPath: [".tmp", "app", "."] }))
    .pipe(
      handlebars(
        {},
        {
          ignorePartials: false,
          batch: ["./app/components"],
        }
      )
    )
    .pipe(
      rename({
        extname: ".html",
      })
    )
    .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
    .pipe(
      $.if(/\.css$/, $.postcss([cssnano({ safe: true, autoprefixer: false })]))
    )
    .pipe(
      $.if(
        /\.html$/,
        $.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: { compress: { drop_console: true } },
          processConditionalComments: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        })
      )
    )
    .pipe($.if(!isProd, dest(".tmp"), dest("dist")));
}

function images() {
  return src("app/images/**/*", { since: lastRun(images) })
    .pipe($.imagemin())
    .pipe(dest("dist/images"));
}

function imagesWebp() {
  return src(
    [
      "app/images/**/*.{jpg,png}",
      "!app/images/apple-touch-icon.png",
      "!app/images/favicon.png",
    ],
    {
      since: lastRun(images),
    }
  )
    .pipe($.webp())
    .pipe(dest("app/images"));
}

function fonts() {
  return src("app/fonts/**/*.{eot,svg,ttf,woff,woff2}").pipe(
    $.if(!isProd, dest(".tmp/fonts"), dest("dist/fonts"))
  );
}

function criticalCss() {
  return src("dist/**/*.html")
    .pipe(
      critical({
        inline: true,
        minify: true,
        ignore: ["font-face"],
        base: "dist/",
        dimensions: [
          {
            height: 200,
            width: 500,
          },
          {
            height: 900,
            width: 1300,
          },
        ],
      }),
      (err, output) => {
        if (err) {
          console.error(err);
        } else if (output) {
          console.log("Generated critical CSS");
        }
      }
    )
    .pipe(dest("dist"));
}

function serviceWorker() {
  return workboxBuild.generateSW({
    globDirectory: "dist",
    globPatterns: ["**/*.{html,json,js,css}"],
    swDest: "dist/sw.js",
  });
}

function compressZip() {
  return src("dist/**/*").pipe($.zip("dist.zip")).pipe(dest("./"));
}

function extras() {
  return src(["app/*", "!app/*.hbs"], {
    dot: true,
  }).pipe(dest("dist"));
}

function clean() {
  return del([".tmp", "dist", "dist.zip"]);
}

function measureSize() {
  return src("dist/**/*").pipe($.size({ title: "build", gzip: true }));
}

const build = series(
  clean,
  parallel(
    lint,
    series(parallel(styles, scripts, imagesWebp), html),
    images,
    fonts,
    extras
  ),
  criticalCss,
  serviceWorker,
  measureSize,
  compressZip
);

function startAppServer() {
  server.init({
    notify: false,
    port,
    server: {
      baseDir: [".tmp", "app"],
      routes: {
        "/node_modules": "node_modules",
      },
    },
    open: false,
  });

  watch(["app/*.hbs", "app/images/**/*", ".tmp/fonts/**/*"]).on(
    "change",
    server.reload
  );

  watch("app/**/*.hbs", html);
  watch("app/images/**/*.{jpg,png}", imagesWebp);
  watch("app/styles/**/*.scss", styles);
  watch("app/scripts/**/*.js", scripts);
  watch("app/fonts/**/*", fonts);
}

function startDistServer() {
  server.init({
    notify: true,
    port,
    server: {
      baseDir: "dist",
      routes: {
        "/node_modules": "node_modules",
      },
    },
    open: false,
  });
}

let serve;
if (isDev) {
  serve = series(clean, parallel(styles, scripts, fonts, html), startAppServer);
} else if (isTest) {
  serve = series(clean, scripts);
} else if (isProd) {
  serve = series(build, startDistServer);
}

exports.html = html;
exports.serve = serve;
exports.build = build;
exports.default = build;
