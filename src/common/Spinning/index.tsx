import React from 'react'
import {Spin} from 'antd'
import {LoadingOutlined} from '@ant-design/icons'

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>

const Spinning = (props: any) => {
    return (
        <Spin indicator={antIcon} spinning={props.spinning}>
            {props.children}
        </Spin>
    )
}

export default Spinning
