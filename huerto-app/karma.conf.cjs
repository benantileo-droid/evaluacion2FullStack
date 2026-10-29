module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'src/test/**/*.spec.js'
    ],

    preprocessors: {
      'src/test/**/*.spec.js': ['esbuild']
    },

    esbuild: {
      target: 'es2020',
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      jsx: 'automatic',
      bundle: true,
      sourcemap: 'inline',
      plugins: [
        {
          name: 'istanbul-instrument',
          setup(build) {
            const fs = require('fs');
            const path = require('path');
            const { createInstrumenter } = require('istanbul-lib-instrument');
            const instrumenter = createInstrumenter({
              esModules: true,
              produceSourceMap: false,
              parserPlugins: ['jsx']
            });
            build.onLoad({ filter: /\.jsx?$/ }, (args) => {
              const rel = path.relative(process.cwd(), args.path).split(path.sep).join('/');
              if (!rel.startsWith('src/') || rel.startsWith('src/test/')) return undefined;
              const code = fs.readFileSync(args.path, 'utf8');
              return {
                contents: instrumenter.instrumentSync(code, rel),
                loader: 'jsx'
              };
            });
          }
        }
      ]
    },

    reporters: ['spec', 'coverage', 'html'],

    specReporter: {
      suppressSkipped: true,
      showSpecTiming: true
    },

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
        { type: 'text' },
        { type: 'lcovonly', subdir: '.' }
      ]
    },

    htmlReporter: {
      outputDir: 'reporte-tests',
      focusOnFailures: false
    },

    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};