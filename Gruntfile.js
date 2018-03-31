module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      libs: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        dest: 'dist/lib/',
        src: [
          '@webcomponents/webcomponentsjs/webcomponents-*.js'
        ]
      },
      components: {
        expand: true,
        dest: 'dist/',
        src: [
          'components/**'
        ]
      },
      index: {
        dest: 'dist/',
        src: 'index.html'
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          livereload: true
        }
      }
    },

    watch: {
      files: ['*', 'components/**'],
      tasks: ['dist'],
      options: {
        livereload: true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-connect')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('dist', ['copy:libs', 'copy:components', 'copy:index'])
  grunt.registerTask('dev', ['dist', 'connect', 'watch'])
}
