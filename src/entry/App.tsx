/* eslint-disable */
import React, {Fragment} from 'react'
import {Switch, HashRouter} from 'react-router-dom'
import {renderRoutes} from '../routers'
import {routesConfig} from '../routers/routerConfig'
import {Menu, Spin, Dropdown, Button} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {handleChangeLanguage, handleChangeColor} from '@store/models/app/actions'
import {RootState} from '@src/store'
import ColorTag from '@components/colorTag'
import {ColorResult} from 'react-color'

const App: () => any = () => {
    const {showConfig, loading, primaryColor} = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()

    const onClick = ({key}: any) => {
        dispatch(handleChangeLanguage(key))
    }

   /*  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        dispatch(handleChangeColor(e.target.value))
    } */

    const getColor = (color: ColorResult): void => {
        const {rgb} = color
        console.log(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
        dispatch(handleChangeColor(`rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`))
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
            <Spin size="large" spinning={loading} wrapperClassName={'app-wrap'} tip={'loading...'}>
                {/* <OtherRouterMap/> */}
                <HashRouter>
                    <Switch>
                        {renderRoutes(routesConfig)}
                    </Switch>
                </HashRouter>
               {/* 自定义语言和主题色 */}
                {
                    showConfig && (<div>
                        <div className="lang-change-wrap">
                            <Dropdown overlay={menu} placement={'topCenter'}>
                                <Button shape="circle" size={'large'}>L</Button>
                            </Dropdown>
                        </div>
                        <div className="lang-change-wrap">
                            <ColorTag customPopover={{position: 'absolute', bottom: '100%', zIndex: 2}} getColor={getColor} color={primaryColor}/>
                        </div>
                    </div>)
                } 
            </Spin>
        </Fragment>

    )
}

export default App
