import inquirer from 'inquirer'
import { isEmptyDir } from '../utils/functions'
import { CWD_DIR, REPO } from '../utils/constants'
import { enDirName, vLength } from '../utils/regexps'
import chalk from 'chalk'
import { mkdirSync } from 'fs'
import { join } from 'path'
import { __msg__ } from '../utils/message'
import download from 'download-git-repo'
import ora from 'ora'
import { generator } from '../utils/generator'
import { uLocale } from '../utils/message'
import { installDependencied } from '../utils/spawn'

// 语言选项
const langOpt = {
    'en': 'en',
    '中文': 'zh_CN'
}

// 项目初始设置
async function programPrompt (emptyRoot = true, langSet = false) {
    return inquirer.prompt([
        {
            type    : 'input',
            name    : 'projectDirName',
            message : `${__msg__('set project dir name')}: `,
            when    : () => !emptyRoot,
            validate: val => {
                if (!val.match(enDirName)) {
                    console.log(chalk.red(__msg__('set project dir name error')))
                    return false
                }
                return true
            }
        },
        {
            type    : 'input',
            name    : 'appTitle',
            message : `${__msg__('set manifest title')}: `,
            validate: val => {
                if (!vLength(5, 30).test(val)) {
                    console.log(chalk.red(__msg__('set manifest title error')))
                    return false
                }
                return true
            }
        },
        {
            type    : 'input',
            name    : 'appDesc',
            message : `${__msg__('set manifest description')}: `,
            validate: val => {
                if (!vLength(5, 30).test(val)) {
                    console.log(chalk.red(__msg__('set manifest description error')))
                    return false
                }
                return true
            }
        },
        {
            type   : 'list',
            name   : 'manifestLocale',
            message: `${__msg__('set manifest locale')}: `,
            when   : () => !langSet,
            choices: Object.keys(langOpt)
        }
    ]).then(answers => {
        if (langSet) {
            answers.manifestLocale = uLocale.default
        } else {
            answers.manifestLocale = langOpt[answers.manifestLocale]
        }
        return answers
    })
}
// 下载模板
const downloadRepo = (target, repo) => new Promise((resolve, reject) => {
    const spinner = ora(__msg__('repo download start')).start()
    download(`direct:${repo}#master`, target, { clone: true }, err => {
        if (!err) {
            spinner.text = __msg__('repo download success')
            spinner.succeed()
            resolve()
        } else {
            spinner.text = __msg__('repo download fail')
            spinner.fail()
            reject(err)
        }
    })
})

export default async options => {
    // 语言option
    let langSet = false
    // option.locale设置默认语言
    if (options.locale) {
        langSet = true
        uLocale.setLocale(options.locale)
    }
    // 项目路径
    let projectDir = CWD_DIR
    // 当前目录是否为空
    const emptyDir = isEmptyDir(CWD_DIR)
    // 设置项目初始信息：manifest的title、descript、默认本地化语言
    const projectInfo = await programPrompt(emptyDir, langSet).catch()
    // 如果需新建文件夹
    if (projectInfo.projectDirName) {
        mkdirSync(projectInfo.projectDirName, { recursive: true })
        projectDir = join(projectDir, projectInfo.projectDirName)
    }
    // 远程拉取模板
    await downloadRepo(join(projectDir, 'gittmp'), REPO).catch()
    // 修改模板变量
    await generator(projectInfo, join(projectDir, 'gittmp'), projectDir).catch(err => { console.log(chalk.red(err)) })
    // 安装依赖
    await installDependencied(projectDir).catch(err => { console.log(chalk.red(err)) })
    console.log(chalk.green(__msg__('init success')))
}