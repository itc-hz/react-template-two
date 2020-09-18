import React, {useEffect, useState} from 'react'
import {Col, Divider, Progress, Row, Timeline} from 'antd'
import styles from './home.module.scss'
import {f1, f2, f3, s1, s2, s3, s4, s5, t1, t2, t3, t4, t5, t6, problem} from './img'

const Home = () => {
    const [height, setHeight] = useState(0)
    const leftCardRefs = React.createRef<HTMLDivElement>()

    const calcHeight: () => void = () => {
        const node: HTMLDivElement = leftCardRefs.current
        if (node) {
            const {offsetHeight = 0} = node
            const remainHeight: number = offsetHeight - 240 - 15
            setHeight(Math.floor(remainHeight))
        }
    }

    useEffect(() => {
        calcHeight()
    }, [])

    return (
        <div className={'home-wrap'}>
            <Row gutter={[15, 0]}>
                <Col span={15}>
                    <div className={styles.cards} ref={leftCardRefs}>
                        <div className={'left-statics'}>
                            <h5 className={'card-header'}>数据统计</h5>
                            <div className={styles.cardContent}>
                                <ul className={styles.statisWrap}>
                                    <li>
                                        <div className={styles.top}>
                                            <span className={styles.topTitle}>流量统计</span>
                                            <img src={f1} alt=""/>
                                        </div>
                                        <div className={styles.bottom}>
                                            <div className={styles.number}>
                                                <span className="used-number">15G</span>
                                                <span className="total-number">30G</span>
                                            </div>
                                            <Progress
                                                showInfo={false}
                                                trailColor={'rgba(255,255,255,.24)'}
                                                strokeColor={'#fff'}
                                                percent={29.9}
                                                strokeWidth={12}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.top}>
                                            <span className={styles.topTitle}>存储空间统计</span>
                                            <img src={f2} alt=""/>
                                        </div>
                                        <div className={styles.bottom}>
                                            <div className={styles.number}>
                                                <span className="used-number">15G</span>
                                                <span className="total-number">30G</span>
                                            </div>
                                            <Progress
                                                showInfo={false}
                                                trailColor={'rgba(255,255,255,.24)'}
                                                strokeColor={'#fff'}
                                                percent={39.9}
                                                strokeWidth={12}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className={styles.top}>
                                            <span className={styles.topTitle}>设备在线情况</span>
                                            <img src={f3} alt=""/>
                                        </div>
                                        <div className={`${styles.bottom} ${styles.last}`}>
                                            <ul className={styles.deviceList}>
                                                <li className={styles.deviceItem}>
                                                    <div className={styles.deviceItemTop}>1</div>
                                                    <div className={styles.deviceItemBottom}>在线</div>
                                                </li>
                                                <li className={styles.deviceItem}>
                                                    <div className={styles.deviceItemTop}>1</div>
                                                    <div className={styles.deviceItemBottom}>离线</div>
                                                </li>
                                                <li className={styles.deviceItem}>
                                                    <div className={styles.deviceItemTop}>1</div>
                                                    <div className={styles.deviceItemBottom}>已绑定设备</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Divider/>
                        <div className={'left-steps'}>
                            <h5 className="card-header">系统使用流程</h5>
                            <div className={styles.cardContent}>
                                <div className={styles.stepWrap}>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s1} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                            生成授权码
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s2} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                            下载APK
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s3} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                            输入授权码
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s4} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                            上传资源
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s5} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                            发布资源
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                        <div className={'left-quick'}>
                            <h5 className="card-header">快捷功能入口</h5>
                            <div className={styles.cardContent}>
                                <ul className={styles.quickWrap}>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t1} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                            上传资源
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t2} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                            创建播放列表
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t3} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                            创建H5
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t4} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                            插播
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t5} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                            添加设备
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t6} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                            字幕插播
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={9}>
                    <Row gutter={[0, 15]}>
                        <Col span={24}>
                            <div className={styles.cards} style={{height: '240px', overflow: 'hidden'}}>
                                <h5 className="card-header">版本更新 <a className="card-header-more">更多</a></h5>
                                <div className={styles.versionList}>
                                    <Timeline mode={'left'}>
                                        <Timeline.Item
                                            label="2015-09-01 09:12:11">新增设备亮度调节功能，可远程对设备的亮度进行调节</Timeline.Item>
                                        <Timeline.Item
                                            label="2015-09-01 09:12:11">新增设备亮度调节功能，可远程对设备的亮度进行调节</Timeline.Item>
                                        <Timeline.Item
                                            label="2015-09-01 09:12:11">新增设备亮度调节功能，可远程对设备的亮度进行调节</Timeline.Item>
                                    </Timeline>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div className={styles.cards} style={{height: `${height}px`}}>
                                <h5 className="card-header">常见问题 <a className="card-header-more">更多</a></h5>
                                <div className={styles.problemList}>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                    <div className={styles.problemItem}>
                                        <div className={styles.problemItemIcon}>
                                            <img src={problem} alt=""/>
                                        </div>
                                        <div className={styles.problemLine}>
                                            信息发布系统能否控制创维电视进行远程内容播放？
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Home
