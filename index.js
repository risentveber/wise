const Metalsmith     = require('metalsmith');
const timer          = require('./plugins/timer');
const jade           = require('metalsmith-jade');
const layouts        = require('metalsmith-layouts');
const permalinks     = require('metalsmith-permalinks');
const uglify         = require('metalsmith-uglify');
const cleanCss       = require('metalsmith-clean-css');
const inspectFiles   = require('metalsmith-inspect-files');

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
    .use(cleanCss({}))
    .use(uglify({
        removeOriginal: true
    }))
    .use(inspectFiles())
    .build((err) => {
        if (err) { throw err; }

        timer('Build time: ')();
    });
