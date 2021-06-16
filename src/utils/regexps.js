// 英文文件夹名称
export const enDirName = /^[a-zA-Z]([-_a-zA-Z0-9]{2,20})$/
// 长度验证
export const vLength = (min, max) => {
    if (!min) { return new RegExp('.*') }
    if (max) {
        return new RegExp(`^[\\s\\S]{${min || 0},${max}}$`)
    }
    return new RegExp(`^[\\s\\S]{${min || 0},}$`)
}