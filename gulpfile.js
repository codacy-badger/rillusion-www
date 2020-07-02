/* eslint-disable require-jsdoc */
// generated on 2020-04-09 using generator-webapp 4.0.0-7
const {src, dest, watch, series, parallel, lastRun} = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const fs = require('fs');
const mkdirp = require('mkdirp');
const browserSync = require('browser-sync');
const del = require('del');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const {argv} = require('yargs');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const critical = require('critical').stream;
const workboxBuild = require('workbox-build');

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDev = !isProd && !isTest;

function styles() {
  return src('app/styles/style.scss')
      .pipe($.plumber())
      .pipe($.if(!isProd, $.sourcemaps.init()))
      .pipe(
          $.sass
              .sync({
                outputStyle: 'expanded',
                precision: 10,
                includePaths: ['.'],
              })
              .on('error', $.sass.logError)
      )
      .pipe($.postcss([autoprefixer()]))
      .pipe($.if(!isProd, $.sourcemaps.write()))
      .pipe($.if(!isProd, dest('.tmp/styles'), dest('dist/styles')))
      .pipe(
          server.reload({
            stream: true,
          })
      );
};

function scripts() {
  return src('app/scripts/**/*.js')
      .pipe($.plumber())
      .pipe($.if(!isProd, $.sourcemaps.init()))
      .pipe($.babel())
      .pipe($.if(!isProd, $.sourcemaps.write('.')))
      .pipe($.if(!isProd, dest('.tmp/scripts'), dest('dist/scripts')))
      .pipe(
          server.reload({
            stream: true,
          })
      );
}

const lintBase = (files) => {
  return src(files)
      .pipe(
          $.eslint({
            fix: true,
          })
      )
      .pipe(
          server.reload({
            stream: true,
            once: true,
          })
      )
      .pipe($.eslint.format())
      .pipe($.if(!server.active, $.eslint.failAfterError()));
};

function lint() {
  return lintBase('app/scripts/**/*.js').pipe(dest('app/scripts'));
}

function html() {
  const templateData = {
    firstName: 'World',
    service: [
      {
        title: 'Services1',
        page_intro: '',
        services: [
          {
            title: '',
            content: '',
            tag: ['', ''],
          },
          {
            title: '',
            content: '',
            tag: ['', ''],
          },
          {
            title: '',
            content: '',
            tag: ['', ''],
          },
        ],
        approach: [
          {
            title: '',
            section_intro: '',
            image: '',
            approach_list: [
              {
                title: '',
                content: '',
              },
              {
                title: '',
                content: '',
              },
              {
                title: '',
                content: '',
              },
            ],
          },
        ],
      },
    ],
    page_project: [
      {
        title: 'A better way to create & manage wealth for individuals.',
        content: '',
        tag: ['Fin Tech', 'UX & UI Design', 'UI Development'],
        image: './images/project/feature/wealthfund.png',
        link: './projects/ux-ui-design-mutual-fund-wealth-fund.html',
      },
      {
        title: 'Increasing employee engagement with Intranet portal',
        content: '',
        tag: ['Enterprise', 'UX Consulting', 'UX & UI Design'],
        image: './images/project/feature/sparsh.png',
        link: './projects/enterprise-ux-ui-design-intranet-portal-sparsh.html',
      },
      {
        title: 'Envisioning a new disruptor car buying experience for Revv-cars.',
        content: '',
        tag: ['Automotive', 'UX & UI Design'],
        image: './images/project/feature/revv-cars.png',
        link: './projects/ux-ui-design-car-leasing-revv-cars.html',
      },
      {
        title: 'Powering businesses with a smarter way to marketing',
        content: '',
        tag: ['Saas', 'UX Consulting', 'UX & UI Design'],
        image: './images/project/feature/gamooga.png',
        link: './projects/ux-ui-design-saas-gamooga.html',
      },
      {
        title: 'Defining the web identity for a IT Services company',
        content: '',
        tag: ['IT', 'Web Design', 'Web Development'],
        image: './images/project/feature/avishkaram.png',
        link: './projects/website-design-avishkaram.html',
      },
      {
        title: 'Helping manage the complex research lab system for Zifo.',
        content: '',
        tag: ['Enterprise', 'UX Consulting', 'UX & UI Design'],
        image: './images/project/feature/zifo.png',
        link: './projects/enterprise-ux-ui-design-project-management-zifo.html',
      },
    ],
    contact: [
      {
        title: 'Contact',
        page_intro: 'Let’s work together.',
        content:
            'Nothing excites us more than great ideas. We’d love to hear from you.',
        form: [
          {
            name: 'Hire Us',
            message: [
              {
                type: true,
                title: 'Thank you!',
                message:
                    'We will contact you shortly.  Scroll down to see the next steps',
              },
              {
                type: false,
                title: 'we are sorry',
                message:
                    'We are working on it issue. Thankyou for the patient',
              },
            ],
            what_we_do: [
              {
                title:
                    'Our team works out a swift response with a 3-step process',
                content: [
                  {
                    title: 'A quick initial call to get started.',
                    content:
                        ' We are thrilled if you left us a message. Look forward to a call from our business team soon.',
                  },
                  {
                    title: 'Understanding & gathering scope.',
                    content:
                        ' We take time over call or in person in trying to understand your needs and our role in it.',
                  },
                  {
                    title: 'Delivery of proposal.',
                    content:
                        ' Based on the discussion, we prepare a proposal, best suited for your project.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    email: 'interact@rillusion.com',
    phone: '+91 9500 007 094',
    dribbble: 'https://dribbble.com/rillusion',
    behance: 'https://www.behance.net/Rillusion-ux-ui',
    instagram: 'https://www.instagram.com/rillusion_ux_ui_design/',
    facebook: 'http://www.facebook.com/Rillusion/',
    linkedin: 'https://www.linkedin.com/company/rillusion',
    medium: 'https://medium.com/@rillusionagency',
  };
  const options = {
    ignorePartials: true,
    batch: ['./app/components'],
  };

  return src(['app/**/*.hbs', '!app/components/**/*.hbs'])
      .pipe(
          $.useref({
            searchPath: ['.tmp', 'app', '.'],
          })
      )
      .pipe(handlebars(templateData, options))
      .pipe(
          rename({
            extname: '.html',
          })
      )
      .pipe(
          $.if(
              /\.js$/,
              $.uglify({
                compress: {
                  drop_console: false,
                },
              })
          )
      )
      .pipe(
          $.if(
              /\.css$/,
              $.postcss([
                cssnano({
                  safe: true,
                  autoprefixer: false,
                }),
              ])
          )
      )
      .pipe(
          $.if(
              /\.html$/,
              $.htmlmin({
                collapseWhitespace: false,
                minifyCSS: true,
                minifyJS: {
                  compress: {
                    drop_console: false,
                  },
                },
                processConditionalComments: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
              })
          )
      )
      .pipe($.if(!isProd, dest('.tmp'), dest('dist')));
}

function images() {
  return src('app/images/**/*', {
    since: lastRun(images),
  }).pipe(dest('dist/images'));
}

function imagesWebp() {
  return src(
      [
        'app/images/**/*.{jpg,png}',
        '!app/images/apple-touch-icon.png',
        '!app/images/favicon.png',
      ],
      {
        since: lastRun(images),
      }
  )
      .pipe(
          $.webp({
            lossless: true,
          })
      )
      .pipe(dest('app/images'));
}

function fonts() {
  return src('app/fonts/**/*.{eot,svg,ttf,woff,woff2}').pipe(
      $.if(!isProd, dest('.tmp/fonts'), dest('dist/fonts'))
  );
}

function criticalCss() {
  return src('dist/**/*.html')
      .pipe(
          critical({
            inline: true,
            minify: true,
            ignore: ['font-face'],
            base: 'dist/',
            dimensions: [
              {
                height: 320,
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
              console.log('Generated critical CSS');
            }
          }
      )
      .pipe(dest('dist'));
}

function serviceWorker() {
  return workboxBuild.generateSW({
    globDirectory: 'dist',
    globPatterns: ['**/*.{html,json,js,css,png,jpg,svg}'],
    swDest: 'dist/sw.js',
  });
}

function compressZip() {
  return src('dist/**/*').pipe($.zip('dist.zip')).pipe(dest('./'));
}

function extras() {
  return src(['app/*', '!app/*.hbs'], {
    dot: true,
  }).pipe(dest('dist'));
}

function clean() {
  return del(['.tmp', 'dist', 'dist.zip']);
}

function measureSize() {
  return src('dist/**/*').pipe(
      $.size({
        title: 'build',
        gzip: true,
      })
  );
}

const build = series(
    clean,
    parallel(
        lint,
        series(parallel(styles, scripts, imagesWebp), html),
        images,
        fonts,
        criticalCss,
        extras
    ),
    serviceWorker,
    measureSize,
    compressZip
);

function startAppServer() {
  server.init({
    notify: false,
    port,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/node_modules': 'node_modules',
      },
    },
    open: false,
  });

  watch(['app/*.hbs', 'app/images/**/*', '.tmp/fonts/**/*']).on(
      'change',
      server.reload
  );

  watch('app/**/*.hbs', html);
  watch('app/styles/**/*.scss', styles);
  watch('app/scripts/**/*.js', scripts);
  watch('app/fonts/**/*', fonts);
}

function startDistServer() {
  server.init({
    notify: true,
    port,
    server: {
      baseDir: 'dist',
      routes: {
        '/node_modules': 'node_modules',
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
