import React from 'react'
import styles from './layout.module.scss'

import {RouterMap} from '@src/routers'

const CommonLayout: () => any = () => {
    // const {loading} = useSelector((state: RootState) => state.app)
    return (
        <div className={styles.idsLayout}>
            <section className={styles.idsContent}>
                <main>
                    <div className={styles.mainContent}>
                        <RouterMap/>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default CommonLayout
