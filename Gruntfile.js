module.exports = function (grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	, browserify: {
		dist: {
	    files: {
	      'build/app.js': ['app.js'],
	    }
	  //, options: {
	  //    transform: ['coffeeify']
	  //  }
	  }
	}
  , uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/app.js',
        dest: 'build/app.min.js'
      }
    }
  , jade: {
  		compile: {
		    options: {
		      data: {
		        debug: false
		      }
		    },
		    files: {
		      "build/index.html": ["jade/index.jade"]
		    }
		  }
  	}
  , stylus: {
  		compile: {
  			files: {
  				"build/app.css": ["node_modules/codemirror/lib/codemirror.css", "stylus/app.styl"]
  			}
  		}
  	}
	});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['browserify','uglify','jade','stylus']);
}