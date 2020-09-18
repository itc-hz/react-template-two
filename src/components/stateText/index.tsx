import React from 'react'
import {IStateText} from '../types'
import PropTypes from 'prop-types'
import style from './index.module.scss'

const StateText: React.FC<IStateText> = ({color, text, underline, click}) => {
    return (
        <div className={style.stateTextWrap}
             style={{color: color, textDecoration: underline ? 'underline' : 'none'}}
            onClick={click}>
            <span className={style.spot} style={{backgroundColor: color}}/>
            <span className={style.text} style={{cursor: underline ? 'pointer' : 'none'}}>{text}</span>
        </div>
    )
}

export default StateText

StateText.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    underline: PropTypes.bool,
    click: PropTypes.func
}

StateText.defaultProps = {
    color: '#fff',
    text: '文字',
    underline: false
}
