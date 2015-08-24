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
      }
    },

    uglify: {
      init: {
        files: {
          'js/lib/modernizr.min.js': 'bower_components/modernizr/modernizr.js',
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      css: {
        files: '**/*.scss',
        tasks: ['compile']
      },
      html: {
        files: ['**/*.html']
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
          livereload: true,
          open: {
            target: 'http://localhost:9001'
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compile', ['compass:dev', 'cssmin']);
  grunt.registerTask('default', ['uglify:init', 'copy:init', 'connect', 'watch']);
};
