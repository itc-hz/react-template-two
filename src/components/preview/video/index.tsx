import React, {useEffect, useRef} from 'react'
import styles from '../index.module.scss'
import {CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

interface IPreviewVideo {
    show: boolean
    close: () => void
    url: string
}

const Video: React.FC<IPreviewVideo> = ({show, close, url}) => {
    const ref = useRef<HTMLVideoElement>(null)

    const handleOnload = () => {
        ref.current.style.transform = 'scale(1)'
        setTimeout(() => {
            ref.current.style.transform = ''
        }, 500)
    }

    const handleClose = () => {
        ref.current.style.transform = 'scale(0)'
        ref.current.style.opacity = '0'
        setTimeout(() => {
            close()
        }, 100)
    }

    const handleOnError = () => {
        ref.current.style.transform = 'scale(1)'
        setTimeout(() => {
            ref.current.style.transform = ''
        }, 500)
    }

    useEffect(() => {
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
            <div className={styles.previewWrap} onClick={() => handleClose()}>
                {url && <video ref={ref} src={url} controls onCanPlay={handleOnload} onError={handleOnError}/>}
            </div>
        </CSSTransition>
    )
}

export default Video

Video.propTypes = {
    close: PropTypes.func,
    url: PropTypes.string,
    show: PropTypes.bool
}
