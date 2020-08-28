import styles from '../publish.module.scss'
import {DatePicker, Form, Radio, TimePicker} from 'antd'
import React, {useState} from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import {ICyclePlayInitialValues} from '../types'

interface ICyclePlayForm {
    forwardedRef: any
}

const formItemLayout = {
    labelCol: {span: 5},
    colon: false
}

const itemLayout = {
    labelCol: {span: 24},
    wrapperCol: {span: 24}
}

const {RangePicker} = DatePicker

const CyclePlayForm: React.FC<ICyclePlayForm> = ({forwardedRef}) => {
    const [form] = Form.useForm()

    const disabledDate = (current: any) => {
        return current && current < moment().endOf('day').add(-1, 'days')
    }

    const initialValues: ICyclePlayInitialValues = {
        isOnline: 0,
        cycleData: [1, 2, 3, 4, 5, 6, 7]
    }

    !forwardedRef.current && (forwardedRef.current = form.validateFields)

    return (
        <Form
            name="cyclePlayForm"
            form={form}
            className={styles.cyclePlayForm}
            {...formItemLayout}
            labelAlign="left"
            initialValues={initialValues}
        >
            <Form.Item name="isOnline" label="播放方式" rules={[{required: true, message: '请选择播放方式!'}]}>
                <Radio.Group>
                    <Radio value={1}>在线</Radio>
                    <Radio value={0}>离线</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item name={'playDate'} label="播放日期" rules={[
                {type: 'array', required: true, message: '请选择播放日期!'}
            ]}>
                <RangePicker disabledDate={disabledDate} className={'w100'} style={{borderRadius: '0'}}/>
            </Form.Item>

            <Form.Item name={'playTime'} label="播放时间" rules={[
                {type: 'array', required: true, message: '请选择播放时间!'}
            ]}>
                <TimePicker.RangePicker format="HH:mm" className={'w100'} picker={'time'} style={{borderRadius: '0'}}/>
            </Form.Item>

            <Form.Item name={'cycleData'} {...itemLayout} label="周期" rules={[
                {type: 'array', required: true, message: '请至少选择一项!'}
            ]} getValueFromEvent={(e) => {
                // console.log(e)
                return e
            }}>
                <WeekList/>
            </ Form.Item>
        </Form>
    )
}

CyclePlayForm.propTypes = {
    forwardedRef: PropTypes.object
}

export default CyclePlayForm

interface IWeekListProps {
    value?: number[],
    onChange?: (value: number[]) => void
}

const WeekList: React.FC<IWeekListProps> = ({value = [], onChange}) => {
    const weekListString: string[] = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    const [weeks, setWeeks] = useState<number[]>(value || [1, 2, 3, 4, 5, 6, 7])

    const handleChoose = (i: number): void => {
        const isExit: number = weeks.indexOf(i)
        let _weeks: number[] = []
        if (isExit === -1) {
            _weeks = [...weeks, i]
            setWeeks(_weeks)
        } else {
            _weeks = weeks.slice(0)
            _weeks.splice(isExit, 1)
            setWeeks(_weeks)
        }
        triggerChange(_weeks)
    }

    const triggerChange = (changedValue: any) => {
        if (onChange) {
            onChange(changedValue)
        }
    }

    return (
        <ul className={styles.weekList}>
            {
                weekListString.map((item, i) => (
                    <li className={weeks.includes(i + 1) ? `${styles.weekItem} ${styles.active}` : styles.weekItem}
                        key={i}
                        onClick={() => handleChoose(i + 1)}>{item}</li>
                ))
            }
        </ul>
    )
}

WeekList.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
}
