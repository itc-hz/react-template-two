import React, {useState} from 'react'
import {Tree} from 'antd'
import PropTypes from 'prop-types'

const treeData = [
    {
        title: '杭州文三路支行',
        key: '1',
        children: [
            {
                title: '设备1',
                key: '0-0-0'
            },
            {
                title: '设备2',
                key: '0-0-1'
            },
            {
                title: '设备3',
                key: '0-0-2'
            }
        ]
    },
    {
        title: '金华仁和路支行',
        key: '2',
        children: [
            {
                title: '设备1',
                key: '2-0-0'
            },
            {
                title: '设备2',
                key: '2-0-1'
            }
        ]
    }
]

interface IDeviceTree {
    forwardedRef: any
}

const DeviceTree: React.FC<IDeviceTree> = ({forwardedRef}) => {
    const [checkedKeys, setCheckedKeys] = useState<string[]>([])
    const [leafKeys, setLeafKeys] = useState<string[]>([])

    const onCheck = (checkedKeys: string[], e: any) => {
        // console.log('onCheck', checkedKeys)
        const key: string[] = []
        setCheckedKeys(checkedKeys)
        console.log('onCheck E', e)
        for (const item of e.checkedNodes) {
            if (!item.children) {
                key.push(item.key)
            }
        }
        setLeafKeys(key)
    }

    forwardedRef.current = () => leafKeys

    return (
        <Tree
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
        />
    )
}

DeviceTree.propTypes = {
    forwardedRef: PropTypes.object
}

export default DeviceTree
