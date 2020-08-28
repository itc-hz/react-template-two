import React from 'react'
import {Form, Radio, DatePicker} from 'antd'
import styles from '../publish.module.scss'
import moment from 'moment'
import PropTypes from 'prop-types'

const formItemLayout = {
    labelCol: {span: 5},
    colon: false
}

interface IContinuePlayForm{
    forwardedRef: any
}

const ContinuePlayForm: React.FC<IContinuePlayForm> = ({forwardedRef}) => {
    const [form] = Form.useForm()

    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current < moment().startOf('minute')
    }

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

            <Form.Item name={'startTime'} label="开始时间" rules={[
                {type: 'object', required: true, message: '请选择开始时间!'}
            ]}>
                <DatePicker className={'w100'} showTime disabledDate={disabledDate} format="YYYY-MM-DD HH:mm"
                            style={{borderRadius: '0'}}/>
            </Form.Item>

            <Form.Item name={'endTime'} label="结束时间" rules={[
                {type: 'object', required: true, message: '请选择结束时间!'}
            ]}>
                <DatePicker className={'w100'} disabledDate={disabledDate} showTime format="YYYY-MM-DD HH:mm"
                            style={{borderRadius: '0'}}/>
            </Form.Item>
        </Form>
    )
}
// export default ContinuePlayForm
ContinuePlayForm.propTypes = {
    forwardedRef: PropTypes.object
}

export default ContinuePlayForm
