import Metalsmith from 'metalsmith'
import Handlebars from 'handlebars'
import { CWD_DIR, PARAM_FILES } from './constants'
import { basename } from 'path'
import { __msg__ } from './message'
import { removeSync } from 'fs-extra'
import ora from 'ora'

export const generator = (metadata = {}, src, dest = '.') => {
    if (!src) {
        return Promise.reject(new Error(__msg__('generator fail1') + src))
    }
    const spinner = ora(__msg__('generator start')).start()

    return new Promise((resolve, reject) => {
        Metalsmith(CWD_DIR)
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files)
                    .filter(fileName => PARAM_FILES.indexOf(basename(fileName)) > -1)
                    .forEach(fileName => {
                        const t = files[fileName].contents.toString()
                        files[fileName].contents = Buffer.from(Handlebars.compile(t)(meta))
                    })
                done()
            }).build(err => {
                removeSync(src)
                if (!err) {
                    spinner.text = __msg__('generator success')
                    spinner.succeed()
                    resolve()
                } else {
                    spinner.text = __msg__('generator fail')
                    spinner.fail()
                    reject(err)
                }
            })
    })
}