import React from 'react'
import {Col, Divider, Progress, Row} from 'antd'
import styles from './home.module.scss'
import {f1, f2, f3, s1, s2, s3, s4, s5, t1, t2, t3, t4, t5, t6} from './img'
import {useTranslation} from 'react-i18next'

const Home = () => {
    const {t} = useTranslation('home')
    /* const [height, setHeight] = useState(0) */
    const leftCardRefs = React.createRef<HTMLDivElement>()

   /*  const calcHeight: () => void = () => {
        const node: HTMLDivElement = leftCardRefs.current
        if (node) {
            const {offsetHeight = 0} = node
            const remainHeight: number = offsetHeight - 240 - 15
            setHeight(Math.floor(remainHeight))
        }
    } */

  /*   useEffect(() => {
        calcHeight()
    }, []) */

    return (
        <div className={'home-wrap'}>
            <Row gutter={[15, 0]}>
                <Col span={3}/>
                <Col span={18}>
                    <div className={styles.cards} ref={leftCardRefs}>
                        <div className={'left-statics'}>
                            <h5 className={'card-header'}>{t('statics')}</h5>
                            <div className={styles.cardContent}>
                                <ul className={styles.statisWrap}>
                                    <li>
                                        <div className={styles.top}>
                                            <span className={styles.topTitle}>{t('first')}</span>
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
                                            <span className={styles.topTitle}>{t('second')}</span>
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
                                            <span className={styles.topTitle}>{t('third')}</span>
                                            <img src={f3} alt=""/>
                                        </div>
                                        <div className={`${styles.bottom} ${styles.last}`}>
                                            <ul className={styles.deviceList}>
                                                <li className={styles.deviceItem}>
                                                    <div className={styles.deviceItemTop}>1</div>
                                                    <div className={styles.deviceItemBottom}>{t('online')}</div>
                                                </li>
                                                <li className={styles.deviceItem}>
                                                    <div className={styles.deviceItemTop}>1</div>
                                                    <div className={styles.deviceItemBottom}>{t('offline')}</div>
                                                </li>
                                                <li className={styles.deviceItem}>
                                                    <div className={styles.deviceItemTop}>1</div>
                                                    <div className={styles.deviceItemBottom}>{t('bindDevice')}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <Divider/>
                        <div className={'left-steps'}>
                            <h5 className="card-header">{t('steps')}</h5>
                            <div className={styles.cardContent}>
                                <div className={styles.stepWrap}>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s1} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                        {t('code')}
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s2} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                        {t('download')}
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s3} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                        {t('edit')}
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s4} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                        {t('upload')}
                                        </div>
                                    </div>
                                    <div className={styles.stepItem}>
                                        <div className={styles.stepIcon}>
                                            <img src={s5} alt=""/>
                                        </div>
                                        <div className={styles.stepDescription}>
                                        {t('publish')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider/>
                        <div className={'left-quick'}>
                            <h5 className="card-header">{t('quick')}</h5>
                            <div className={styles.cardContent}>
                                <ul className={styles.quickWrap}>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t1} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                        {t('upload')}
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t2} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                        {t('createList')}
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t3} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                        {t('createH5')}
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t4} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                        {t('spot')}
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t5} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                        {t('addDevice')}
                                        </div>
                                    </li>
                                    <li className={styles.quickItem}>
                                        <div className={styles.quickIcon}>
                                            <img src={t6} alt=""/>
                                        </div>
                                        <div className={styles.quickDescription}>
                                        {t('danmu')}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={3}/>
            </Row>
        </div>
    )
}

export default Home
