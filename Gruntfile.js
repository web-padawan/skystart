'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true,
      },
      dev: {
        options: {
          environment: 'development'
        }
      },
      dist: {
        options: {
          environment: 'production'
        }
      }
    },

    uglify: {
      init: {
        files: {
          'js/lib/modernizr.min.js': 'bower_components/modernizr/modernizr.js',
        }
      }
    },

    copy: {
      init: {
        files: [
          {
            src: 'bower_components/jquery/dist/jquery.min.js',
            dest: 'js/lib/jquery.min.js'
          },
          {
            src: 'bower_components/REM-unit-polyfill/js/rem.min.js',
            dest: 'js/lib/rem.min.js'
          }

        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          hostname: 'localhost',
          base: '.',
          keepalive: true,
          open: {
            target: 'http://localhost:9001'
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('compile', ['compass:dev', ]);
  grunt.registerTask('dist', ['compass:dist', ]);
  grunt.registerTask('default', ['uglify:init', 'copy:init', 'connect']);
};
