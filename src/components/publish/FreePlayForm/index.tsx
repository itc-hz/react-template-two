import React from 'react'
import styles from '../publish.module.scss'
import {Form, Radio} from 'antd'
import PropTypes from 'prop-types'

const formItemLayout = {
    labelCol: {span: 5},
    colon: false
}

interface IFreePlayForm {
    forwardedRef: any
}

const FreePlayForm: React.FC<IFreePlayForm> = ({forwardedRef}) => {
    const [form] = Form.useForm()

    !forwardedRef.current && (forwardedRef.current = form.validateFields)

    return (
        <Form
            name="cyclePlayForm"
            form={form}
            className={styles.cyclePlayForm}
            {...formItemLayout}
            labelAlign="left"
            initialValues={{
                isOnline: 0
            }}
        >
            <Form.Item name="isOnline" label="播放方式" rules={[{required: true, message: '请选择播放方式!'}]}>
                <Radio.Group>
                    <Radio value={1}>在线</Radio>
                    <Radio value={0}>离线</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    )
}
// export default FreePlayForm
FreePlayForm.propTypes = {
    forwardedRef: PropTypes.object
}

export default FreePlayForm
