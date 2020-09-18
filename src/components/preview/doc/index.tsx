import React, {useEffect, useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import {Document, Page} from 'react-pdf'
import {PDFDocumentProxy} from 'pdfjs-dist'
import PropTypes from 'prop-types'
import styles from '@components/preview/index.module.scss'
import {Button} from 'antd'
import {CloseOutlined} from '@ant-design/icons'

interface IPreviewDoc {
    show: boolean
    close: () => void
    url: string
}

const Doc: React.FC<IPreviewDoc> = ({show, close, url}) => {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)

    function onDocumentLoadSuccess({numPages}: PDFDocumentProxy) {
        setLoading(false)
        setNumPages(numPages)
    }

    function goPage(isNext: boolean) {
        if (pageNumber === 1 && !isNext) {
            return false
        } else if (pageNumber === numPages && isNext) {
            return false
        } else {
            const page = isNext ? pageNumber + 1 : pageNumber - 1
            setPageNumber(page)
        }
    }

    useEffect(() => {
        if (show) {
            setLoading(true)
            document.querySelector('body').style.overflow = 'hidden'
        } else {
            document.querySelector('body').style.overflow = ''
        }
        return () => {
            setPageNumber(1)
        }
    }, [show])

    return (
        <CSSTransition in={show} timeout={500} classNames='my-drawer' unmountOnExit>
            <div className={styles.previewWrap}>
                <Button shape="circle" icon={<CloseOutlined/>} size={'large'} onClick={close}
                        style={{float: 'right', marginTop: '20px', marginRight: '20px'}}/>
                <Document
                    file={url}
                    className={styles.docWrap}
                    onLoadSuccess={(doc) => onDocumentLoadSuccess(doc)}
                >
                    <Page pageNumber={pageNumber}/>
                </Document>
                {!loading && <div className={styles.docFooter}>
                    <a className={pageNumber === 1 ? `${styles.docPage} ${styles.disabled}` : styles.docPage}
                       onClick={() => goPage(false)}>前一页</a>
                    <a className={pageNumber === numPages ? `${styles.docPage} ${styles.disabled}` : styles.docPage}
                       onClick={() => goPage(true)}>后一页</a>
                </div>}
            </div>
        </CSSTransition>
    )
}

export default Doc

Doc.propTypes = {
    close: PropTypes.func,
    url: PropTypes.string,
    show: PropTypes.bool
}
