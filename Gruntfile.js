module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    clean: {
      build : {
        force : true,
        src : ['dist/*']
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress : {
          drop_console: true
        }
      },
      build: {
        src : 'js/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }//,
      //vendor: {
      //  src : 'vendor/**/*.js',
      //  dest: 'dist/js/vendor.min.js'
      //}
    },
    
    preprocess : {
      html : {
        files: [{
          expand: true,  
          cwd: '',      
          src: ['**/*.html', '!node_modules/**/*'], 
          dest: 'dist/'
        }],
        options : {
          context : {
            'ENV' : 'production'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'uglify', 'preprocess']);

};