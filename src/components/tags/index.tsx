import React from 'react'
import {CloseOutlined} from '@ant-design/icons'
import PropsTypes from 'prop-types'
import styles from './index.module.scss'

interface ITags {
    onRemove: () => void
    children: React.ReactNode
    clearable?: boolean
}

const Tags: React.FC<ITags> = ({children, onRemove, clearable = false}) => {
    return (
        <div className={styles.tagsWrap}>
            {clearable && <a className={styles.tagsRemoveWrap} onClick={onRemove}>
                <CloseOutlined/>
            </a>}
            <span className={styles.tagsText}>{children}</span>
        </div>
    )
}

export default Tags

Tags.propTypes = {
    children: PropsTypes.string,
    onRemove: PropsTypes.func,
    clearable: PropsTypes.bool
}
