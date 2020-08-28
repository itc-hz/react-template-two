import React, {useEffect, useState} from 'react'
import BraftEditor, {EditorState, ControlType} from 'braft-editor'
// import {Upload} from 'antd'
import 'braft-editor/dist/index.css'
/* [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media', 'separator',
    'clear'
] */

const Editor = () => {
    const [editorState, setEditorState] = useState<any>(null)
    const [controls, setControls] = useState<ControlType[]>([])

    const handleChange = (editor: EditorState) => {
        setEditorState(editor)
    }

    // const controls: ControlType[] = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']

    /* const extendControls: ExtendControlType[] = [
         {
             key: 'antd-uploader',
             type: 'component',
             component: (
                 <Upload
                     accept="image/!*"
                     showUploadList={false}
                     /!* customRequest={uploadHandler} *!/
                 >
                     {/!* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 *!/}
                     <button type="button" className="control-item button upload-button" data-title="插入图片">
                         123
                     </button>
                 </Upload>
             )
         }
     ]
     extendControls={extendControls}
     */

    const init = () => {
        const editor = BraftEditor.createEditorState(null)
        console.log('1', BraftEditor)
        const newControls = BraftEditor.defaultProps!.controls.filter((e: any) => e !== 'media')
        setControls(newControls)
        setEditorState(editor)
    }
    useEffect(() => {
        init()
    }, [])

    return (
        <BraftEditor
            value={editorState}
            onChange={handleChange}
            controls={controls}
        />
    )
}

export default Editor
