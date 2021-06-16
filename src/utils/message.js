// 本地语言环境
export const uLocale = {
    default: 'en',
    setLocale (l) {
        this.default = ['zh-CN', 'zh_CN'].indexOf(l) > -1 ? 'zh_CN' : 'en'
    }
}
// 语言包
export const messages = {
    'en': {
        'set project dir name'          : 'set project directory name',
        'set project dir name error'    : 'The directory name starts with a letter and can only contain "letters", "_" and "-"',
        'set manifest title'            : 'set the title in manifest.json',
        'set manifest title error'      : 'The title length must be between 5 and 25 characters',
        'set manifest description'      : 'set the description in manifest.json',
        'set manifest description error': 'The description length must be between 5 and 300 characters',
        'set manifest locale'           : 'set the default_locale in manifest.json',
        'repo download start'           : 'Downloading project template...',
        'repo download success'         : 'Project template downloaded successfully.',
        'repo download fail'            : 'Project template download failed.',
        'generator fail1'               : 'Invalid source: ',
        'generator start'               : 'Setting project information...',
        'generator success'             : 'Project setup is complete.',
        'generator fail'                : 'Project setup failed.',
        'install start'                 : 'Installing project dependencies...',
        'install success'               : 'Installation project dependency is complete.',
        'install fail'                  : 'Failed to install project dependencies.',
        'install not found'             : 'The package.json file of the project does not exist.',
        'init success'                  : 'Project created successfully.'
    },
    'zh_CN': {
        'set project dir name'          : '设置项目目录名称',
        'set project dir name error'    : '项目目录名称只能以字母开头，且只能包含字母、_(短下划线)和-(短横线)',
        'set manifest title'            : '设置拓展manifest中的Tite',
        'set manifest title error'      : 'title的长度必须在5-25个字符之间',
        'set manifest description'      : '设置拓展manifest中的Description',
        'set manifest description error': 'description的长度必须在5-300个字符之间',
        'set manifest locale'           : '设置拓展manifest中默认语言环境',
        'repo download start'           : '正在下载项目模板...',
        'repo download success'         : '项目模板下载成功！',
        'repo download fail'            : '项目模板下载失败！',
        'generator fail1'               : '无效的source：',
        'generator start'               : '正在设置项目信息',
        'generator success'             : '项目设置完成',
        'generator fail'                : '项目设置失败',
        'install start'                 : '正在安装项目依赖',
        'install success'               : '依赖安装完成',
        'install fail'                  : '依赖安装失败',
        'install not found'             : '项目package.json未找到',
        'init success'                  : '项目创建成功'
    }
}

/**
 * 
 * @param {string} k 语言包key
 * @param {strng} l 强制使用的语言类型
 * @returns 
 */
export const __msg__ = (k, l) => messages[(l || uLocale.default) === 'zh_CN' ? 'zh_CN' : 'en']?.[k] || 'this msg dont defined' 