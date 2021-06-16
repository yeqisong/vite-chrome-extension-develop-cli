import commander from 'commander'
import { version } from '../package.json'
import init from './init'
import { osLocaleSync } from './utils/functions'
import { uLocale } from './utils/message'

const program = new commander.Command()

program.version(version, '-V, --version', 'output the current version')
    .option('-h, --help', 'chrome-extension-devlop-cli help')

// 选项
// const options = program.opts()

// 本地语言设置
const osLc = osLocaleSync()
uLocale.setLocale(osLc)

// init子命令
program.command('init')
    .description('the name for chrome-extension; if the directory is not empty, it will create a directory with init name.')
    .option('-l, --locale <type>', 'chrome-extension-project default locale')
    .action(options => { init(options) })

program.parse(process.agrv)