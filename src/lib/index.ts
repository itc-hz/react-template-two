/**
 * 16进制转rgb
 * @param $color: 16进制
 */
export function colorRgb($color: string) {
    let sColor = $color.toLowerCase()
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = '#'
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
            }
            sColor = sColorNew
        }
        // 处理六位的颜色值
        const sColorChange = []
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return sColorChange
    }
    return sColor
}

export function throttle(fn: () => void, interval = 50) {
    let last = 0
    return function (...args: Array<any>) {
        const _this = this

        const now = new Date().getTime()
        if (now - last > interval) {
            fn.apply(_this, args)
            last = now
        }
    }
}

export function isUrl(str: string) {
    return /https?:\/\/.+/i.test(str)
}

export function formatDate(date: Date, fmt: string) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o: {[k: string]: number} = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str: string) {
    return ('00' + str).substr(str.length)
}
