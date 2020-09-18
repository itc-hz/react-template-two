import React, {useEffect, useState} from 'react'
import BraftEditor, {EditorState, ExtendControlType} from 'braft-editor'
import {ContentUtils} from 'braft-utils'
// import {Upload} from 'antd'
import {excludeControls} from './config'
import 'braft-editor/dist/index.css'
import {useSelector} from 'react-redux'
import {RootState} from '@src/store'
import PropTypes from 'prop-types'

interface IEditor {
    extendControls?: ExtendControlType[]
    forwardRef: any
}

export type insertVal = {
    type: string
    url: string
}

const Editor: React.FC<IEditor> = ({extendControls, forwardRef}) => {
    const {language} = useSelector((state: RootState) => state.app)
    const [editorState, setEditorState] = useState<any>(null)

    const handleChange = (editor: EditorState) => {
        setEditorState(editor)
    }

    const languageFn = (languages: any) => {
        switch (language) {
            case 'zh':
                return languages.zh
            case 'en':
                return languages.en
        }
    }

    const setEditor = (val: insertVal[] | string, isInsert = true) => {
        if (isInsert) {
            const newInstance = ContentUtils.insertMedias(editorState, val)
            setEditorState(newInstance)
        } else {
            const editor = BraftEditor.createEditorState(val)
            setEditorState(editor)
        }
    }

    forwardRef && (forwardRef.current = {setEditor, editorState})

    const init = () => {
        const editor = !editorState ? BraftEditor.createEditorState(null) : editorState
        setEditorState(editor)
    }
    useEffect(() => {
        init()
    }, [language])

    return (
        <BraftEditor
            value={editorState}
            language={languageFn}
            onChange={handleChange}
            excludeControls={excludeControls}
            extendControls={extendControls}
        />
    )
}

export default Editor

Editor.propTypes = {
    extendControls: PropTypes.array,
    forwardRef: PropTypes.object
}

Editor.defaultProps = {
    extendControls: []
}
