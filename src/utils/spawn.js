import spawn from 'cross-spawn'
import { join } from 'path'
import { canDo } from './functions'
import ora from 'ora'
import { __msg__ } from './message'

export async function installDependencied (projectDir) {
    if (!canDo(join(projectDir, 'package.json'))) {
        throw new Error(__msg__('install not found'))
    }
    const spinner = ora(__msg__('install start')).start()
    const r = spawn.sync('npm', ['install'], { stdio: 'inherit', cwd: projectDir })
    if (!r.status) {
        spinner.text = __msg__('install success')
        spinner.succeed()
        return true
    } else {
        spinner.text = __msg__('install fail')
        spinner.fail()
        throw new Error()
    }
}