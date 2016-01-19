/**
 * @author Nikola Nikolic <nikola.nikolic@outlook.com>
 */
module.exports = function (grunt) {

    grunt.initConfig({
        //parameters configuration

        appName: "App",

        //used by grunt
        pkg: grunt.file.readJSON('package.json'),
        buildFolder: "build",
        distFolder: 'dist',
        srcFolder: "src",
        lessSrcFolder: "<%= srcFolder %>/less",
        cssBuildFolder: "<%= buildFolder %>/css",
        lessFile: "<%= lessSrcFolder %>/<%= appName %>.less",
        htmlFile: "index.html",
        htmlBuildFile: "<%= buildFolder %>/<%= htmlFile %>",
        htmlDistFile: "<%= distFolder %>/<%= htmlFile %>",
        htmlSrcFile: "<%= srcFolder %>/<%= htmlFile %>",
        distZipFile: "<%= distFolder %>/<%= bundleName %>.zip",

        //used in index.html
        bundleName: "<%= pkg.name %>.<%= pkg.version %>",
        bundleJsFile: "<%= bundleName %>.js",
        bundleMinJsFile: "<%= bundleName %>.min.js",
        bundleJsMapFile: "<%= bundleJsFile %>.map",
        bundleCssFile: "<%= bundleName %>.css",
        bundleMinCssFile: "<%= bundleName %>.min.css",

        //tasks
        clean: {
            build: ["<%= buildFolder %>"],
            dist: ["<%= distFolder %>"]
        },
        copy: {
            img: {
                files: [{
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'img/**',
                    dest: '<%= buildFolder %>'
                }]
            },
            fonts: {
                files: [{
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'fonts/**',
                    dest: '<%= buildFolder %>'
                }]
            },
            templates: {
              files:[{
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'templates/**',
                    dest: '<%= buildFolder %>'
                }]
              },
            dist: {
                files: [{
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'img/**',
                    dest: '<%= distFolder %>'
                }, {
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'fonts/**',
                    dest: '<%= distFolder %>'
                }, {
                    cwd: '<%= srcFolder %>',
                    expand: true,
                    src: 'templates/**',
                    dest: '<%= distFolder %>'
                }]
            }
        },
        less: {
            build: {
                options: {
                    paths: ["<%= lessSrcFolder %>"],
                    sourceMap: true
                },
                files: {
                    "<%= buildFolder %>/<%= bundleCssFile %>": ["<%= lessFile %>"]
                }
            }
        },
        processhtml: {
            build: {
                files: {
                    "<%= htmlBuildFile %>": ["<%= htmlSrcFile %>"]
                },
                options: {
                    data: {
                        bundleJsFile: "<%= bundleJsFile %>",
                        bundleCssFile: "<%= bundleCssFile %>"
                    }
                }
            },
            dist: {
                files: {
                    "<%= htmlDistFile %>": ["<%= htmlSrcFile %>"]
                },
                options: {
                    data: {
                        environment: "dist",
                        bundleMinJsFile: "<%= bundleMinJsFile %>",
                        bundleMinCssFile: "<%= bundleMinCssFile %>"
                    }
                }
            }
        },
        browserify: {
            build: {
                files: {
                    "<%= buildFolder %>/<%=bundleJsFile%>": ["<%= srcFolder %>/**/*.ts"]
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: [
                        ['tsify']
                    ]
                }
            },
            dev: {
                files: {
                    "<%= buildFolder %>/<%=bundleJsFile%>": ["<%= srcFolder %>/**/*.ts"]
                },
                options: {
                    watch: true,
                    keepalive: true,
                    cache: {},
                    packageCache: {},
                    browserifyOptions: {
                        debug: true
                    },
                    plugin: [
                        ['tsify']
                    ]
                }
            }
        },
        exorcise: {
            build: {
                options: {},
                files: {
                    '<%= buildFolder %>/<%= bundleJsMapFile %>': ['<%= buildFolder %>/<%=bundleJsFile%>'],
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= distFolder %>/<%=bundleMinJsFile%>': ["<%= buildFolder %>/<%=bundleJsFile%>"]
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= distFolder %>/<%=bundleMinCssFile%>': ["<%= buildFolder %>/<%=bundleCssFile%>"]
                }
            }
        },
        watch: {
            less: {
                files: ['<%= srcFolder %>/**/*.less'],
                tasks: ['less:build']
            },
            img: {
                files: ['<%= srcFolder %>/img/**'],
                tasks: ['copy:img']
            },
            fonts: {
                files: ['<%= srcFolder %>/fonts/**'],
                tasks: ['copy:fonts']
            },
            templates: {
                files: ['<%= srcFolder %>/**/*.html'],
                tasks: ['processhtml:build','copy:templates']
            }
        },
        focus: {
            dev: {
                include: ['less', 'img','fonts','templates']
            }
        },
        zip: {
            dist: {
                cwd: '<%= distFolder %>',
                src: ['<%= distFolder %>/**'],
                dest: '<%= distZipFile %>'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.loadNpmTasks('grunt-processhtml');

    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-browserify');

    grunt.loadNpmTasks('grunt-exorcise');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.loadNpmTasks('grunt-focus');

    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('copy:build', ["copy:templates","copy:img","copy:fonts"]);

    grunt.registerTask('build', ['clean:build', 'processhtml:build', 'copy:build', 'less:build', 'browserify:build', "exorcise:build"]);

    grunt.registerTask('dev', ['clean:build', 'processhtml:build', 'copy:build', 'less:build', 'browserify:dev', 'focus:dev']);

    grunt.registerTask('dist', ['clean:build', 'clean:dist', 'processhtml:dist', 'copy:dist', 'less:build', 'browserify:build', 'exorcise:build', 'uglify:dist', 'cssmin:dist', 'zip:dist']);

};
