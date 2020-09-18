/* eslint-disable */
import React from 'react'
// import {Scrollbars} from 'react-custom-scrollbars'
// import Scrollbar from 'react-scrollbars-custom'
import {IMyTabs} from '../types'
import PropTypes from 'prop-types'
import styles from './mytab.module.scss'

const MyTabs: React.FC<IMyTabs> = ({list, selected, selectItem}) => {
    return (
        <div className={styles.myTabs}>
            <ul>
                {
                    list.map((e, i) => (
                        <li key={i} className={selected === i ? styles.active : ''}
                            onClick={() => selectItem(i)}>
                            <span>{e.name}</span>
                            <div className={styles.hozBorder}/>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

MyTabs.defaultProps = {
    list: [],
    selected: 0
}

MyTabs.propTypes = {
    list: PropTypes.array,
    selectItem: PropTypes.func,
    selected: PropTypes.number
}

export default MyTabs
