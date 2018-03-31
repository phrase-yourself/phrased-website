module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      libs: {
        expand: true,
        flatten: true,
        cwd: 'node_modules',
        dest: 'dist/lib',
        src: [
          '@webcomponents/webcomponentsjs/webcomponents-lite.js'
        ]
      },
      components: {
        expand: true,
        dest: 'dist',
        src: [
          'components/**'
        ]
      },
      index: {
        dest: 'dist/',
        src: 'index.html'
      }
    },

    build: {
      components: {
        src: [
          'components/*/*.html'
        ],
        dest: 'dist'
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

  function inlineJS (file) {
    return grunt.file.read('./' + file)
  }

  function inlineCSS (file) {
    return grunt.file.read('./' + file)
  }

  function inlineHtml (tree) {
    return new Promise(function (resolve) {
      tree.walk(function (node) {
        if (node.tag &&
            node.tag === 'link' &&
            node.attrs.rel === 'stylesheet') {
          node.tag = 'style'
          node.content = inlineCSS(node.attrs.href)
          delete node.attrs
        }
        if (node.tag &&
            node.tag === 'script' &&
            node.attrs.src) {
          node.content = inlineJS(node.attrs.src)
          delete node.attrs.src
        }
        return node
      })

      resolve(tree)
    })
  }
  grunt.registerMultiTask('build', 'lol', function () {
    const done = this.async()
    const promises = []

    const posthtml = require('posthtml')

    this.files.forEach(function (f) {
      const dest = f.dest + '/' + f.src
      const html = grunt.file.read(f.src)
      promises.push(posthtml()
        .use(inlineHtml)
        .process(html)
        .then(function (result) {
          grunt.file.write(dest, result.html)
        }))
    })

    Promise.all(promises).then(function () {
      done()
    })
  })

  grunt.registerTask('dist', ['copy:libs', 'build', 'copy:index'])
  grunt.registerTask('dev', ['dist', 'connect', 'watch'])
}
