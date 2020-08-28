import React, {Fragment} from 'react'
/* import {Route, Switch} from 'react-router-dom'
import {renderRoutes} from './routers'
import Home from '@src/pages/home' */
import {OtherRouterMap} from '@src/routers'
/* interface AppProps {
    routes?: any
} */
import {Dropdown, Menu, Button, Spin} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {handleChangeLanguage, handleChangeColor} from '@store/models/app/actions'
import {RootState} from '@src/store'
// import {throttle} from '@lib/index'

const App: () => any = () => {
    const {showConfig, loading, primaryColor} = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()

    const onClick = ({key}: any) => {
        dispatch(handleChangeLanguage(key))
    }

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        dispatch(handleChangeColor(e.target.value))
    }

    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item key="zh">中文</Menu.Item>
            <Menu.Item key="en">English</Menu.Item>
        </Menu>
    )

    return (
        /* <Switch>
            {renderRoutes(routes)}
            <Route
                path={'/home/index'}
                exact
                component={Home}
            ></Route>
        </Switch> */
        <Fragment>
            <Spin size="large" spinning={loading} wrapperClassName={'app-wrap'} tip={'changing! please waiting...'}>
                <OtherRouterMap/>
                {
                    showConfig && (<div>
                        <div className="lang-change-wrap">
                            <Dropdown overlay={menu} placement={'topCenter'}>
                                <Button type={'primary'}>语言切换</Button>
                            </Dropdown>
                        </div>
                        <div className="lang-change-wrap">
                            <input type="color" defaultValue={primaryColor}
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                       changeColor(e)
                                   }}/>
                        </div>
                    </div>)
                }
            </Spin>
        </Fragment>

    )
}

export default App
