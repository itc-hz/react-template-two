import React from 'react'
import styles from './listImage.module.scss'
import {Dropdown} from 'antd'
import PropTypes from 'prop-types'

import hover from '@assets/img/hover.png'
import checked from '@assets/img/checked.png'
import bg from '@assets/img/bg.png'

export interface IListImage {
    menu?: React.ReactElement
    path?: string
    selected?: boolean,
    handleClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    style?: object
}

const ListImage: React.FC<IListImage> = ({menu, selected, path, handleClick, style}) => {
    return (
        <div className={styles.nLayoutItemImg} style={style} onClick={(e) => handleClick(e)}>
            {path && path.length > 0 ? <img src={path} alt=""/> : <img src={bg} alt=""/>}
            {
                !selected && (<div className={styles.nLayoutItemModal}>
                    {menu && <Dropdown overlay={menu} placement="bottomRight" trigger={['click', 'hover']}>
                        <img src={hover} alt=""/>
                    </Dropdown>}
                </div>)
            }
            {
                selected && (<div className={`${styles.nLayoutItemModal} ${styles.hover}`}>
                    <img src={checked} alt=""/>
                </div>)
            }
        </div>
    )
}

export default ListImage

ListImage.propTypes = {
    menu: PropTypes.element,
    selected: PropTypes.bool,
    path: PropTypes.string,
    handleClick: PropTypes.func,
    style: PropTypes.object
}
