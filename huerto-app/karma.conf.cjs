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

      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      },

      jsx: 'automatic',

      bundle: true
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    autoWatch: false,

    browsers: ['ChromeHeadless'],

    singleRun: true,

    concurrency: Infinity
  });
};