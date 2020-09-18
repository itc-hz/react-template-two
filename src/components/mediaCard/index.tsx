import React, {useEffect, useState} from 'react'
import styles from './index.module.scss'
import {Card, Col, Input, Pagination, Row} from 'antd'
import ListImage from '@components/listImage'
import Empty from '@common/Empty'
import {ISourceMediaListData, ISourceMediaListQuery} from '@apiModel/source'
import MyTabs from '@components/myTabs'
import {getMedias} from '@api/source'
import {ERROR_CODE} from '@api/config'
import PropTypes from 'prop-types'

interface IMediaCard {
    show: boolean
    forwardRef: any
    searchType: string[]
}

const tabList = [
    {
        id: 0,
        name: '全部',
        type: 'all'
    },
    {
        id: 1,
        name: '图片',
        type: 'img'
    },
    {
        id: 2,
        name: '视频',
        type: 'video'
    },
    {
        id: 3,
        name: '文档',
        type: 'doc'
    },
    {
        id: 4,
        name: '音频',
        type: 'audio'
    }
]

const initQuery: ISourceMediaListQuery = {
    page: 1,
    pageSize: 9,
    search: '',
    typeIndex: 0,
    type: 0
}

const MediaCard: React.FC<IMediaCard> = ({show, forwardRef, searchType}) => {
    console.log('test load')
    const [list, setList] = useState<Array<ISourceMediaListData>>([])
    const [query, setQuery] = useState<ISourceMediaListQuery>(initQuery)
    const [total, setTotal] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [newTabs, setNewTabs] = useState([])

    const Tabs = () => {
        return (
            <MyTabs list={newTabs}
                    selectItem={(i) => {
                        const item = newTabs[i]
                        setQuery({
                            ...query,
                            type: item.id,
                            typeIndex: i
                        })
                    }}
                    selected={query.typeIndex}/>)
    }

    const handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void = (e, id) => {
        const newList = list.map(e => {
            if (e.id === id) {
                e.selected = !(typeof e.selected === 'boolean' && e.selected)
            }
            return e
        })
        setList(newList)
    }

    forwardRef.current = () => {
        return list.map(e => e.selected && e).filter(e => !!e)
    }

    useEffect(() => {
        if (show) {
            getList()

            if (newTabs.length === 0) {
                const _newTabs = tabList.map(e => searchType.includes(e.type) && e).filter(e => !!e)
                setNewTabs(_newTabs)
            }
        }
    }, [show, query])

    function getList() {
        setLoading(true)
        getMedias(query)
            .then(res => {
                setLoading(false)
                if (res.code === ERROR_CODE) {
                    const data = res.data.list.map(e => {
                        if (!e.selected) {
                            e.selected = false
                        }
                        e.num = 1
                        e.time = 1
                        return e
                    })
                    setList(data)
                    setTotal(res.data.total)
                }
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <Card title={<Tabs/>}
              bodyStyle={{padding: 0, minHeight: '500px'}}
              style={{width: '100%'}}
              loading={loading}
              className={styles.mediaCard}
              extra={<Input.Search placeholder={'搜索'}/>}
        >
            <Row gutter={[20, 20]} style={{padding: '24px 24px 0'}}>
                {
                    list.length > 0 && list.map((e, i) => (
                        <Col span={8} key={i}>
                            <div className={styles.mediaItem}>
                                <ListImage handleClick={(event) => handleClick(event, e.id)} {...e}
                                           style={{height: '140px'}}/>
                                <div className={styles.mediaItemDetail}>
                                    <span className={styles.mediaItemDetailTitle}>{e.name}</span>
                                </div>
                            </div>
                        </Col>
                    ))
                }
                {
                    list.length === 0 && (
                        <Empty/>
                    )
                }
            </Row>
            {
                list.length > 0 && (<div style={{textAlign: 'center', paddingBottom: '20px'}}>
                    <Pagination
                        defaultCurrent={1}
                        current={query.page}
                        total={total}
                        showQuickJumper
                        onChange={(page) => setQuery({
                            ...query,
                            page
                        })}
                        showTotal={(total: number | null) => `共 ${total} 条`}
                    />
                </div>)
            }
        </Card>
    )
}

export default MediaCard

MediaCard.propTypes = {
    show: PropTypes.bool,
    forwardRef: PropTypes.object,
    searchType: PropTypes.array
}

MediaCard.defaultProps = {
    searchType: ['all', 'video', 'audio', 'doc']
}
