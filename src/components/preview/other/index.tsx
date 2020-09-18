import React, {useEffect, useState} from 'react'
import {Button, Modal, Skeleton, message, Form} from 'antd'
import {getPublishHistoryById} from '@api/publish'
import {IPublishHistoryData} from '@apiModel/publish'
import {ERROR_CODE} from '@api/config'
import PropTypes from 'prop-types'
import Article from './aritcle'

interface IOthersText {
    show: boolean
    toggleShow: (show: boolean) => void
    id: number
}

const OthersText: React.FC<IOthersText> = ({show, toggleShow, id}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<IPublishHistoryData>(null)

    const handleOk = () => {
        toggleShow(false)
    }

    useEffect(() => {
        if (show) {
            getDetail()
        }
        return () => {
            setData(null)
        }
    }, [show, id])

    // 方式很多 可以配合saga、thunk 就不用放在这种组件里了
    // 但就是懒了 就这样吧
    function getDetail() {
        setLoading(true)
        getPublishHistoryById({id})
            .then(res => {
                setLoading(false)
                if (res.code === ERROR_CODE) {
                    if (res.data.type < 5) {
                        message.error('该组件只适用于rtsp/素材轮播/文章')
                    }
                    setData(res.data)
                }
            })
            .catch(() => setLoading(false))
    }

    return (
        <Modal
            title="详情"
            visible={show}
            destroyOnClose={true}
            width={888}
            onCancel={handleOk}
            footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    确定
                </Button>
            ]}
        >
            <Skeleton loading={loading}>
                {
                    data && data.type < 5 && (
                        <h3 style={{textAlign: 'center'}}>ERROR, page not found...</h3>
                    )
                }
                {
                    data && data.type === 5 && (
                        <Form layout={'vertical'}>
                            <Form.Item label={'地址'}>{data.rtspPath}</Form.Item>
                        </Form>
                    )
                }
                {
                    data && data.type === 6 && (
                        <Article obj={data}/>
                    )
                }
                {
                    data && data.type === 7 && (
                        <div dangerouslySetInnerHTML={{__html: data.content}} />
                    )
                }
            </Skeleton>
        </Modal>
    )
}

export default OthersText

OthersText.propTypes = {
    show: PropTypes.bool,
    toggleShow: PropTypes.func,
    id: PropTypes.number
}
