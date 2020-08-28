import React from 'react'
import {ILayoutGroupData} from '@apiModel/layout'
import PropTypes from 'prop-types'

import editPng from '@assets/img/edit.png'
import deletePng from '@assets/img/delete.png'

interface IGroup {
    groups: Array<ILayoutGroupData>
    groupId?: number
    setActive: (id: number) => void
    removeGroup: (id: number) => void
    updateGroup: (id: number) => void
}

const Groups: React.FC<IGroup> = ({groups, groupId, setActive, removeGroup, updateGroup}) => {
    return (
        <ul className="group-list">
            {
                groups.map((g, i) => (
                    <li className={groupId === g.id ? 'group-item active' : 'group-item'} key={i}
                        onClick={() => setActive(g.id)}>
                        <div className="group-item-name">{g.name}</div>
                        {
                            g.id > 0 && (<div className="group-item-operation">
                                <img src={editPng} alt="" width={30} height={30}
                                     onClick={(e) => {
                                         e.stopPropagation()
                                         updateGroup(g.id)
                                     }}/>
                                <img src={deletePng} alt="" width={30} height={30}
                                     onClick={(e) => {
                                         e.stopPropagation()
                                         removeGroup(g.id)
                                     }}/>
                            </div>)
                        }
                    </li>
                ))
            }
        </ul>
    )
}

export default Groups

Groups.propTypes = {
    groupId: PropTypes.number,
    setActive: PropTypes.func,
    groups: PropTypes.array,
    removeGroup: PropTypes.func,
    updateGroup: PropTypes.func
}
