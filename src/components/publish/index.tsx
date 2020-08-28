import React, {useEffect, useRef, useState} from 'react'
import {Tabs} from 'antd'
import PropTypes from 'prop-types'
// import styles from './publish.module.scss'
import CyclePlayForm from './CyclePlayForm'
import ContinuePlayForm from './ContinuePlayForm'
import FreePlayForm from './FreePlayForm'
import SpotPlayForm from './SpotPlayForm'
import {
    ICyclePlayInitialValues,
    IContinuePlayInitialValues,
    IFreePlayInitialValues,
    ISpotPlayInitialValues
} from './types'
import {IPublishData} from '../types'

interface INLayoutDraw {
    callback?: () => void,
    forwardedRef: any
}

const {TabPane} = Tabs

const Publish: React.FC<INLayoutDraw> = ({forwardedRef}) => {
    const [tabKey, setTabKey] = useState<string>('1')

    const cyclePlayFormRef = useRef<any>(null)
    const continuePlayFormRef = useRef<any>(null)
    const spotPlayFormRef = useRef<any>(null)
    const freePlayFormRef = useRef<any>(null)

    const handleValidate = (cb: any) => {
        let promise
        console.log('val', tabKey)
        switch (tabKey) {
            case '1':
                promise = cyclePlayFormRef.current
                break
            case '2':
                promise = continuePlayFormRef.current
                break
            case '3':
                promise = spotPlayFormRef.current
                break
            case '4':
                promise = freePlayFormRef.current
                break
        }
        promise()
            .then((res: any) => {
                const combineObj = combineObject(tabKey, res)
                cb && cb(combineObj)
            })
            .catch((err: string) => {
                console.log(err)
            })
    }

    useEffect(() => {
        forwardedRef.current = handleValidate
    }, [tabKey])

    return (
        <div className={'n-layout-draw-wrap'}>
            <Tabs defaultActiveKey="1" activeKey={tabKey} onChange={(k) => {
                setTabKey(k + '')
            }} centered size={'large'} tabBarGutter={35}>
                <TabPane tab="周期播放" key="1">
                    <CyclePlayForm forwardedRef={cyclePlayFormRef}/>
                </TabPane>
                <TabPane tab="连续播放" key="2">
                    <ContinuePlayForm forwardedRef={continuePlayFormRef}/>
                </TabPane>
                <TabPane tab="插播" key="3">
                    <SpotPlayForm forwardedRef={spotPlayFormRef}/>
                </TabPane>
                <TabPane tab="垫片播放" key="4">
                    <FreePlayForm forwardedRef={freePlayFormRef}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

Publish.propTypes = {
    callback: PropTypes.func,
    forwardedRef: PropTypes.object
}

/* const PublishInstance = React.forwardRef((props, ref) => {
    return <Publish forwardedRef={ref} {...props}/>
}) */

export default Publish

function combineObject(type: string, res: any): IPublishData {
    const obj: IPublishData = {
        startTime: '',
        endDate: '',
        startDate: '',
        endTime: '',
        weeks: [],
        isOnline: 0
    }
    switch (type) {
        case '1': {
            const o = res as ICyclePlayInitialValues
            const {playDate, playTime, cycleData, isOnline} = o
            obj.startDate = playDate[0].format('YYYY-MM-DD')
            obj.endDate = playDate[1].format('YYYY-MM-DD')
            obj.startTime = playTime[0].format('HH:mm')
            obj.endTime = playTime[1].format('HH:mm')
            obj.weeks = cycleData
            obj.isOnline = isOnline
        }
            break
        case '2': {
            const o = res as IContinuePlayInitialValues
            const {startTime, endTime, isOnline} = o
            const _startTime: string = startTime.format('YYYY-MM-DD HH:mm')
            const _endTime: string = endTime.format('YYYY-MM-DD HH:mm')
            obj.startDate = _startTime.split(' ')[0]
            obj.endDate = _endTime.split(' ')[0]
            obj.startTime = _startTime.split(' ')[1]
            obj.endTime = _endTime.split(' ')[1]
            obj.isOnline = isOnline
        }
            break
        case '3': {
            const o = res as ISpotPlayInitialValues
            const {startDate, times, isOnline} = o
            obj.startDate = startDate.format('YYYY-MM-DD')
            obj.endDate = startDate.format('YYYY-MM-DD')
            obj.startTime = times[0].format('HH:mm')
            obj.endTime = times[1].format('HH:mm')
            obj.isOnline = isOnline
        }
            break
        case '4': {
            const o = res as IFreePlayInitialValues
            obj.isOnline = o.isOnline
        }
            break
    }
    return obj
}
