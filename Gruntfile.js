module.exports = function(grunt) {
    grunt.initConfig({
        eslint: {
            target: ['*.js', 'app/*.js']
        },
        clean: {
            main: ['dist/*']
        },
        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**'],
                dest: 'dist/pastemarkdownlinks'
            }
        },
        compress: {
            dist: {
                options: {
                    archive: 'dist/pastemarkdownlinks.zip'
                },
                files:[{expand: true, cwd: 'app/', src: ['**']}]
            }
        }
    })

    grunt.loadNpmTasks('grunt-eslint')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-compress')

    grunt.registerTask('version', (key, value) => {
        const filenames = ['package.json', 'app/manifest.json']

        for (const filename of filenames) {
            const file = grunt.file.readJSON(filename)

            if (!grunt.file.exists(filename)) {
                grunt.log.error('file ' + filename + ' not found')
                return false
            }

            let version = file['version'].split('.')
            version[1] = Number(version[1]) + 1
            version = version.join('.')

            console.log(version)

            file['version'] = version
            grunt.file.write(filename, JSON.stringify(file, null, 4))
        }
    })

    grunt.registerTask('build', ['eslint', 'compress'])
    grunt.registerTask('prepare', ['eslint', 'clean', 'copy'])
    grunt.registerTask('release', ['eslint', 'version', 'compress'])
}