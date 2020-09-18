import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {Tree, Input, Empty, Button, Modal} from 'antd'
import {CloseOutlined} from '@ant-design/icons'
import bg from '@assets/img/bg.png'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import PropTypes from 'prop-types'

export interface ITreeData {
    title: string
    key: number
    children?: ITreeData[],
    isFather?: boolean
}

const treeData: ITreeData[] = [
    {
        title: '杭州文三路支行',
        key: 1,
        isFather: true,
        children: [
            {
                title: '张三丰',
                key: 11
            },
            {
                title: '张二峰',
                key: 12
            },
            {
                title: '张国伟',
                key: 13
            }
        ]
    },
    {
        title: '杭州文一路支行',
        key: 2,
        isFather: true,
        children: [
            {title: '赵一', key: 21},
            {title: '赵二', key: 22},
            {title: '赵三', key: 23}
        ]
    },
    {
        title: '杭州文二路支行',
        key: 3,
        isFather: true
    }
]

const getParentKey: (title: string, tree: any) => any = (title: string, tree: any) => {
    let parentKey: string[] = []
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.title.indexOf(title) > -1) {
            parentKey = [...parentKey, node.key]
        }
        if (node.children) {
            if (node.children.some((item: ITreeData) => item.title.indexOf(title) > -1)) {
                parentKey = [...parentKey, node.key]
            } else if (getParentKey(title, node.children).length > 0) {
                parentKey = [...parentKey, node.key]
            }
        }
    }
    return parentKey
}

interface ISelectPerson {
    visible: boolean
    onClose: () => void
    onConfirm: (items: ITreeData[], setLoading: (show: boolean) => void) => void
    hasCheckedItems?: ITreeData[]
}

const SelectPerson: React.FC<ISelectPerson> = ({visible, onClose, onConfirm, hasCheckedItems}) => {
    const [checkedKeys, setCheckedKeys] = useState<number[]>([])
    const [checkedItems, setCheckedItems] = useState<ITreeData[]>([])
    const [expandedKeys, setExpandedKeys] = useState<number[]>([])
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const onExpand = (expandedKeys: number[]) => {
        console.log('onExpand', expandedKeys)
        setExpandedKeys(expandedKeys)
        setAutoExpandParent(false)
    }

    const onCheck = (checkedKeys: number[], e: any) => {
        console.log('onCheck', checkedKeys, e)
        setCheckedKeys(checkedKeys)

        const items: ITreeData[] = []
        const checkedNodes = e.checkedNodes as ITreeData[]
        for (const item of checkedNodes) {
            if (!item.children && !item.isFather) {
                items.push(item)
            }
        }
        setCheckedItems(items)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        let expandedKeys = []
        if (value) {
            expandedKeys = getParentKey(value, treeData)
        }
        console.log(expandedKeys)
        setExpandedKeys(expandedKeys)
        setAutoExpandParent(true)
    }

    const removeItem = (index?: number) => {
        console.log(index)
        if (isNaN(index)) {
            setCheckedKeys([])
            setCheckedItems([])
        } else {
            const newCheckedItems = checkedItems.filter((e, i) => i !== index)
            const keys = newCheckedItems.map(e => e.key)
            setCheckedKeys(keys)
            setCheckedItems(newCheckedItems)
        }
    }

    const handleCancel = () => {
        onClose()
    }

    const handleOk = () => {
        onConfirm(checkedItems, setLoading)
    }

    useEffect(() => {
        if (visible && hasCheckedItems.length > 0) {
            setCheckedItems(hasCheckedItems)
            const keys = hasCheckedItems.map(e => e.key)
            setCheckedKeys(keys)
            setExpandedKeys(keys)
            setAutoExpandParent(true)
        }
    }, [visible])

    return (
        <Modal
            title=""
            visible={visible}
            width={590}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            bodyStyle={{padding: 0}}
            closable={false}
            destroyOnClose
            keyboard={false}
        >
            <div className={styles.selectPersonWrap}>
                <div className={styles.selectPersonSearch}>
                    <div className={styles.search}>
                        <Input.Search placeholder={'搜索'} onChange={(e) => onChange(e)}/>
                    </div>
                    <div className={styles.tree}>
                        <Tree
                            className={styles.customTree}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            checkable
                            blockNode
                            onCheck={onCheck}
                            onExpand={onExpand}
                            checkedKeys={checkedKeys}
                            treeData={treeData}
                        />
                    </div>
                </div>
                <div className={styles.selectPersonSelected}>
                    <div className={styles.hasSelectedDetail}>
                        <span>已选 {checkedItems.length}</span>
                        <a onClick={() => removeItem()}>清空</a>
                    </div>
                    <div className={styles.hasSelectedContent}>
                        <TransitionGroup component={'ul'} className={styles.hasSelectedList}
                                         style={{minHeight: checkedItems.length === 0 ? 'auto' : '220px'}}>
                            {
                                checkedItems.map((item, i) => (
                                    <CSSTransition timeout={500} classNames="fade" key={item.key} unmountOnExit>
                                        <li className={styles.hasSelectedItem} key={item.key}>
                                            <div className={styles.itemHead}>
                                                <img src={bg} alt=""/>
                                                <span>{item.title}</span>
                                            </div>
                                            <a onClick={() => removeItem(i)}>
                                                <CloseOutlined/>
                                            </a>
                                        </li>
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                        {checkedItems.length === 0 && <div style={{
                            height: '200px',
                            lineHeight: '200px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        </div>}
                        <div className={styles.footer}>
                            <Button type={'primary'} loading={loading} onClick={handleOk}>确定</Button>
                            <Button type={'primary'} loading={loading} className={'ant-btn-grey'}
                                    style={{marginLeft: 10}} onClick={handleCancel}>取消</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SelectPerson

SelectPerson.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    hasCheckedItems: PropTypes.array
}
