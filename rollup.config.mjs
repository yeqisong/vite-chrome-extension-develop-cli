
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
export default {
    input   : 'src/index.js',
    external: ['commander', 'inquirer', 'fs-extra', 'fs', 'chalk', 'os-locale', 'download-git-repo', 'ora', 'metalsmith', 'handlebars', 'path', 'cross-spawn'],
    output  : [{
        file  : 'libs/index.js',
        format: 'cjs'
    }],
    plugins: [
        resolve({ preferBuiltins: false }),
        json(),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude     : 'node_modules/'
        })
    ],
    watch: {
        buildDelay: 500,
        include   : 'src/**'
    }
}