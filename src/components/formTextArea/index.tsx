import React from 'react'
import {Form, Input} from 'antd'
import PropsTypes from 'prop-types'

interface IFormTextArea {
    labelText: string
    placeholder: string
    forwardRef: any
}

const FormTextArea: React.FC<IFormTextArea> = ({labelText, placeholder, forwardRef}) => {
    const [form] = Form.useForm()

    !forwardRef.current && (forwardRef.current = form)

    return (
        <Form style={{marginTop: 15}} form={form}>
            <Form.Item label={labelText} name="remark" rules={[{required: true, message: placeholder}]}>
                <Input.TextArea placeholder={placeholder}/>
            </Form.Item>
        </Form>
    )
}

export default FormTextArea

FormTextArea.propTypes = {
    labelText: PropsTypes.string,
    placeholder: PropsTypes.string,
    forwardRef: PropsTypes.object
}
