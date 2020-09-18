import React, {useEffect, useRef, useState} from 'react'
import {Card, Pagination, Spin, Table, Button, Space, Modal, Popconfirm, message} from 'antd'
import {ExclamationCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons'
import {getFileList, removeAudit, passAudit} from '@api/audit'
import {IAuditListQuery, IAuditData} from '@apiModel/audit'
import {ITabData} from '@apiModel/source'

import {ERROR_CODE} from '@api/config'
import MyTabs from '@components/myTabs'
import {getType} from '@lib/mixins'
import StateText from '@components/stateText'
import AuditProcess from '@components/auditProcess'
import FormTextArea from '@components/formTextArea'

const {confirm} = Modal

const InitQuery: IAuditListQuery = {
    page: 1,
    pageSize: 12,
    type: 0
}

const tabList: ITabData[] = [
    {
        id: 0,
        name: '待审核'
    },
    {
        id: 1,
        name: '已审核'
    }
]

const FileAudit = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<IAuditData[]>([])
    const [query, setQuery] = useState<IAuditListQuery>(InitQuery)
    const [total, setTotal] = useState<number>(0)
    const [detailId, setDetailId] = useState<number>(0)
    const [processShow, setProcessShow] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)
    const ref = useRef(null)

    const columns: any = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: '资源类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text: number) => {
                return getType(text)
            }
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            align: 'center'
        },
        {
            title: '大小',
            dataIndex: 'size',
            key: 'size',
            align: 'center',
            render: (text: number) => {
                return text + 'M'
            }
        },
        {
            title: '上传时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text: string, record: IAuditData) => (
                <Space>
                    <Button type={'primary'}>预览</Button>
                    <Button type={'primary'} className={'ant-btn-orange'}
                            onClick={() => handlePass(record.name, record.id)}>通过</Button>
                    <Button type={'primary'} className={'ant-btn-grey'}
                            onClick={() => handleUnPass(record.id)}>不通过</Button>
                </Space>
            )
        }
    ]

    const newColumns: any = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (text: string) => <span>{text}</span>
        },
        {
            title: '资源名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: '资源类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text: number) => {
                return getType(text)
            }
        },
        {
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
            align: 'center'
        },
        {
            title: '大小',
            dataIndex: 'size',
            key: 'size',
            align: 'center',
            render: (text: number) => {
                return text + 'M'
            }
        },
        {
            title: '上传时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center'
        },
        {
            title: '审核状态',
            dataIndex: 'auditState',
            key: 'endTime',
            align: 'center',
            width: 100,
            render(text: number) {
                const t = text === 1 ? '审核中' : text === 2 ? '已通过' : '未通过'
                const color = text === 1 ? 'rgba(21, 192, 169, 1)' : text === 2 ? 'rgba(6, 180, 255, 1)' : 'rgba(248, 76, 95, 1)'
                return <StateText text={t} color={color} underline click={() => handleShowProcess()}/>
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text: string, record: IAuditData) => (
                <Space>
                    <Button type={'primary'}>预览</Button>
                    <Popconfirm title="确定要撤销吗？" icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                                onConfirm={() => handleCancel(record.id)}>
                        <Button type={'primary'} className={'ant-btn-grey'}>删除</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]

    const [col, setCol] = useState<any>(columns)

    const handleShowProcess = () => {
        setProcessShow(true)
    }

    const handleCloseAuditProcess = () => {
        setProcessShow(false)
    }

    const handlePass = (name: string, id: number) => {
        confirm({
            title: `审核通过“${name}”?`,
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                handlePassById(true, id)
            }
        })
    }

    const handleUnPass = (id: number) => {
        setVisible(true)
        setDetailId(id)
    }

    const hideCancelReject = () => {
        setVisible(false)
        setDetailId(0)
        ref.current.resetFields()
    }

    const handleConfirmReject = () => {
        ref.current && ref.current.validateFields()
            .then((res: any) => {
                if (!res.remark) return
                handlePassById(false, detailId, res.remark)
            })
            .catch((err: any) => console.log(err))
    }

    const handleCancel = (id: number) => {
        setLoading(true)
        removeAudit({id})
            .then(res => {
                setLoading(false)
                if (res.code === ERROR_CODE) {
                    message.success('操作成功')
                    getList()
                }
            })
            .catch(() => setLoading(false))
    }

    useEffect(() => {
        getList()
    }, [query])

    function getList() {
        setLoading(true)
        if (query.type === 0) {
            setCol(columns)
        } else {
            setCol(newColumns)
        }
        getFileList(query)
            .then(res => {
                setLoading(false)
                if (res.code === ERROR_CODE) {
                    const {total, list} = res.data
                    setData(list)
                    setTotal(total)
                }
            })
            .catch(() => setLoading(false))
    }

    function handlePassById(isPass: boolean, id: number, remark?: string) {
        setLoading(true)
        passAudit({id, isPass: isPass ? 1 : 0, remark})
            .then(res => {
                if (res.code === ERROR_CODE) {
                    message.success('提交成功')
                    if (!isPass) {
                        setDetailId(0)
                        ref.current.resetFields()
                        setVisible(false)
                    }
                    getList()
                }
            })
            .catch(() => setLoading(false))
    }

    return (
        <Spin spinning={loading}>
            <Card title={'文件审核'}
                  className={'idvs-main-card'}
                  bodyStyle={{padding: 0}}
                  style={{width: '100%'}}>
                <MyTabs list={tabList}
                        selectItem={(i) => {
                            const item = tabList[i]
                            setQuery({
                                ...query,
                                type: item.id
                            })
                        }}
                        selected={query.type}/>
                <Table
                    rowKey={'id'}
                    columns={col}
                    pagination={false}
                    dataSource={data}
                />
                {
                    data.length > 0 && (<div style={{textAlign: 'center', padding: '20px 0'}}>
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
            <AuditProcess show={processShow} close={handleCloseAuditProcess}/>
            <Modal
                visible={visible}
                onOk={handleConfirmReject}
                onCancel={hideCancelReject}
                okText="确认"
                confirmLoading={loading}
                cancelText="取消"
            >
                <FormTextArea labelText={'拒绝理由'} placeholder={'请填写拒绝理由'} forwardRef={ref}/>
            </Modal>
        </Spin>
    )
}

export default FileAudit
