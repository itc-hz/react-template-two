import React from 'react'
import {Modal} from 'antd'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import pass from '@assets/img/pass.png'
import error from '@assets/img/error.png'

interface IAuditProcess {
    show: boolean
    close: () => void
}

const AuditProcess: React.FC<IAuditProcess> = ({show, close}) => {
    const handleOk = () => {
        close()
    }
    return (
        <Modal
            title="详情"
            visible={show}
            destroyOnClose={true}
            width={450}
            onCancel={handleOk}
            footer={null}
        >
            <ul className={styles.processWrap}>
                <li className={styles.processItem}>
                    <div className={`${styles.auditItemLine} ${styles.pass}`}>
                        <div className={styles.processAuditNo}>1级审核</div>
                        <div className={styles.processAuditName}>谢霆锋</div>
                        <img src={pass} alt=""/>
                    </div>
                </li>
                <li className={styles.processItem}>
                    <div className={`${styles.auditItemLine} ${styles.pass}`}>
                        <div className={styles.processAuditNo}>2级审核</div>
                        <div className={styles.processAuditName}>谢霆锋</div>
                        <img src={pass} alt=""/>
                    </div>
                </li>
                <li className={styles.processItem}>
                    <div className={`${styles.auditItemLine} ${styles.pass}`}>
                        <div className={styles.processAuditNo}>3级审核</div>
                        <div className={styles.processAuditName}>谢霆锋</div>
                        <img src={pass} alt=""/>
                    </div>
                </li>
                <li className={styles.processItem}>
                    <div className={`${styles.auditItemLine} ${styles.unpass}`}>
                        <div className={styles.processAuditNo}>4级审核</div>
                        <div className={styles.processAuditName}>谢霆锋</div>
                        <img src={error} alt=""/>
                    </div>
                    <div className={styles.auditItemDesc}>
                        拒绝原因：资源主题表达不明确
                    </div>
                </li>
                <li className={styles.processItem}>
                    <div className={styles.auditItemLine}>
                        <div className={styles.processAuditNo}>5级审核</div>
                        <div className={styles.processAuditName}>谢霆锋</div>
                    </div>
                </li>
            </ul>
        </Modal>
    )
}

export default AuditProcess

AuditProcess.propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func
}
