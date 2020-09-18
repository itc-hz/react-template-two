import React from 'react'
import {Form, Table} from 'antd'
import {ISourceMediaListData} from '@apiModel/source'
import styles from '@src/pages/source/sourceList/source.module.scss'
import {IPublishHistoryData} from '@apiModel/publish'
import PropTypes from 'prop-types'

const columns = [
    {
        title: '图片',
        dataIndex: 'path',
        key: 'path',
        render: (text: any, record: ISourceMediaListData, index: number) => (
            <div className={styles.tableImageWrap}>
                <img src={text} alt="" width={70} height={70}/>
                <span className={styles.tableImageNumber}>{index + 1}</span>
            </div>
        )
    },
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text: number) => {
            switch (text) {
                case 1:
                    return '图片'
                case 2:
                    return '视频'
                case 3:
                    return '文档'
            }
        }
    },
    {
        title: '大小',
        dataIndex: 'size',
        key: 'size',
        render: (text: number) => {
            return text + 'M'
        }
    },
    {
        title: '展示时长',
        dataIndex: 'time',
        key: 'time',
        render: (text: number) => {
            return text + 'S'
        }
    },
    {
        title: '重复播放次数',
        dataIndex: 'num',
        key: 'num',
        render: (text: number, record: ISourceMediaListData) => {
            return `${record.num}次，总计${record.time * record.num}S`
        }
    }
]

interface IArticle {
    obj?: IPublishHistoryData
}

const Article: React.FC<IArticle> = ({obj}) => {
    const total = () => {
        if (obj && obj.list) {
            return obj.list.map(e => e.num * e.time).reduce((pre, next) => pre + next) || 0
        }
        return 0
    }

    return (
        <div className="play-list-wrap">
            <Form layout={'inline'}>
                <Form.Item label={'名称'}>{obj.name || ''}</Form.Item>
                <Form.Item label={'总时长'}>{total()}S</Form.Item>
                <Form.Item label={'背景音乐'}>{obj.audioPath || ''}</Form.Item>
            </Form>
            <Table
                style={{marginTop: '15px'}}
                columns={columns}
                rowKey={'id'}
                dataSource={obj.list}
                pagination={false}
            />
        </div>
    )
}

export default Article

Article.propTypes = {
    obj: PropTypes.any
}
