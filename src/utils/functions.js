import fs from 'fs-extra'
import osLocale from 'os-locale'

/**
 * 当前系统语言
 */
export const osLocaleSync =  () => osLocale.sync()
/**
 * 检查文件或目录是否存在且可操作
 * @param {*} sdir
 */
export const canDo = sdir => {
    try {
        fs.accessSync(sdir, fs.constants.R_OK | fs.constants.W_OK)
        return true
    } catch (err) {
        return false
    }
}
/**
 * 是否是目录
 */
export const isDir = sdir => {
    if (canDo(sdir)) {
        return fs.lstatSync(sdir).isDirectory()
    }
    return false
}
/**
 * 是否是空目录
 * @param {*} sdir 
 * @returns true是
 */
export const isEmptyDir = sdir => {
    if (!isDir(sdir)) { return false }
    // 如果是空目录
    try {
        const fls = fs.readdirSync(sdir)
        if (!fls.length) {
            return true
        }
        return false
    } catch (e) {
        console.error(`[functions.isEmptyDir()] errors in ${sdir}:`)
        return false
    }
}
/**
 * 创建目录
 */
