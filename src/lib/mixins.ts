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
