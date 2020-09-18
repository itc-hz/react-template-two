import React, {useEffect, useRef, useState} from 'react'
import styles from '../index.module.scss'
import {CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'
import {message} from 'antd'

interface IPreviewImg {
    show: boolean
    close: () => void
    url: string
}

const Img: React.FC<IPreviewImg> = ({show, close, url}) => {
    const [, setLoading] = useState<boolean>(false)
    const ref = useRef<HTMLImageElement>(null)

    const handleOnload = () => {
        setLoading(false)
        ref.current.style.transform = 'scale(1)'
    }

    const handleOnError = () => {
        message.error('图片加载失败')
        setLoading(false)
    }

    const handleClose = () => {
        ref.current.style.transform = 'scale(0)'
        setTimeout(() => {
            close()
        }, 100)
    }

    useEffect(() => {
        setLoading(true)
        if (show) {
            ref.current.style.transition = 'all .5s'
            ref.current.style.transform = 'scale(0)'
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = ''
        }
    }, [show])

    return (
        <CSSTransition in={show} timeout={500} classNames='my-drawer' unmountOnExit>
            <div className={styles.previewWrap} onClick={handleClose}>
                {url && <img ref={ref} src={url} alt="" onLoad={handleOnload} onError={handleOnError}/>}
                <h2>图片加载失败</h2>
            </div>
        </CSSTransition>
    )
}

export default Img

Img.propTypes = {
    close: PropTypes.func,
    url: PropTypes.string,
    show: PropTypes.bool
}
