import React from 'react'
import styles from './layout.module.scss'
import {IRouterFC} from '@model/common'
import CommonTransition from '@common/transition'
import {renderRoutes} from '@src/routers'
import Side from './side'
import {Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

const CommonLayout: React.FC<IRouterFC> = ({routes}) => {
    // const {loading} = useSelector((state: RootState) => state.app)
    console.log('common', renderRoutes(routes))
    return (
        <div className={styles.idsLayout}>
            <section className={styles.idsContent}>
                <Side/>
                <main>
                    {/* <Alert
                        message="Very long warning text warning text text text text text text text"
                        banner
                        closable
                    /> */}
                    <div className={styles.mainContent}>
                        <CommonTransition>
                            <Switch>
                                {renderRoutes(routes)}
                            </Switch>
                        </CommonTransition>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default CommonLayout

CommonLayout.propTypes = {
    routes: PropTypes.array
}
