/**
 * 设置等高方法
 * */
export const setContour: (mainClass: string, targetClass: string, defaultHeight: number) => void = (mainClass, targetClass, defaultHeight) => {
    const domMain = document.querySelector(mainClass)
    const domGroup = document.querySelector(targetClass)
    const {children} = domMain
    let mainCard: Element
    let mainHeight: number = defaultHeight
    if (children.length > 1) {
        mainCard = children[1]
        mainHeight = mainCard.className.indexOf('ant-card-body') > -1 ? mainCard.clientHeight : defaultHeight
        console.log(mainHeight)
    }
    if (domGroup.children[1].className.indexOf('ant-card-body') > -1) {
        const group = domGroup.children[1] as HTMLDivElement & Element
        group.style.height = mainHeight + 'px'
        group.style.overflowY = 'scroll'
    }
}

export const getType: (type: number) => string = (type) => {
    let result
    switch (type) {
        case 1:
            result = '图片'
            break
        case 2:
            result = '视频'
            break
        case 3:
            result = '文档'
            break
        case 4:
            result = '音频'
            break
        case 5:
            result = 'rtsp'
            break
        case 6:
            result = '播放列表'
            break
        case 7:
            result = '文章'
            break
        case 8:
            result = 'H5资源'
            break
    }
    return result
}

export const getPlayType: (playType: number, timeType: number) => string = (playType, timeType) => {
    let result
    switch (playType) {
        case 1:
            if (timeType === 0) {
                result = '周期播放'
            } else {
                result = '连续播放'
            }
            break
        case 2:
            result = '空闲播放'
            break
        case 3:
            result = '插播'
            break
    }
    return result
}

export const getWeek: (week: string) => string[] | null = (week) => {
    if (!week) {
        return
    }
    const weekString = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weeks = week.split(',').map(e => +e)
    return weeks.map(e => weekString[e])
}
