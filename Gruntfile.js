/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            files: 'hars/*.har',
            tasks: ['buildmocks'],
            options: {
                nospawn: true,
            }
        },
        buildmocks: {
            src: 'hars/*.har'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.event.on('watch', function(action, filepath) {
        grunt.config('buildmocks.src', [filepath]);
    });

    grunt.registerTask('buildmocks', function () {

        var files = grunt.file.expand(grunt.config.get("buildmocks.src")),
            i;

        for (i=0;i<files.length;i++) {
            grunt.log.writeln("Processing " + files[i]);
            grunt.util.spawn(
                {
                    cmd: "node",
                    args: ["index.js", files[i]]
                },
                function () {}
            );
        }
        
    });

    grunt.registerTask('default', ['watch']);

};
