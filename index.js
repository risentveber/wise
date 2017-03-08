const Metalsmith     = require('metalsmith');
const timer          = require('./plugins/timer');
const printFilesTree = require('./plugins/printFilesTree');
const jade           = require('metalsmith-jade');
const layouts        = require('metalsmith-layouts');
const permalinks     = require('metalsmith-permalinks');
const uglify         = require('metalsmith-uglify');
const cleanCss       = require('metalsmith-clean-css');

Metalsmith(__dirname)
    .source('./source')
    .metadata({
        title: 'WISE 2017',
    })
    .destination('./build')
    .clean(true)
    .use(jade({
        useMetadata: true
    }))
    .use(permalinks({
        relative: false
    }))
    .use(layouts({
        engine: 'jade',
        default: 'index.jade',
        pattern: '**/*.html'
    }))
    .use(cleanCss())
    .use(uglify())
    .build((err, files) => {
        if (err) { throw err; }

        process.stdout.write('\x1b[1m');
        printFilesTree(files);
        process.stdout.write('\x1b[0m');
        timer('Build time: ')();
    });
