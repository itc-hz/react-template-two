import React from 'react'
import {Route, Redirect, Switch, HashRouter} from 'react-router-dom'
import {RouteConfigDeclaration} from './routerConfig'
import Home from '@src/pages/home'
import Layout from '@common/layout'

export function renderRoutes(routesConfig: RouteConfigDeclaration[], extraProps: any = {}) {
    return routesConfig.map((item) => {
        const {
            path,
            exact,
            isDynamic,
            // isProtected,
            component: Component,
            routes = [],
            loadingFallback,
            isLayout = false
        } = item

        return (
            <Route
                key={path}
                path={path}
                exact={exact}
                component={(props: any) => {
                    /* if (isProtected && !localStorage.getItem('token')) {
                         return <Redirect key={'login-redirect'} to={'/login'} />;
                     } */
                    if (isLayout) {
                        return <Redirect key={path} to={routes[0].path} />
                    }
                    if (isDynamic) {
                        return (
                            <React.Suspense fallback={loadingFallback || '正在加载中...'}>
                                <Component {...props} {...extraProps} routes={routes}/>
                            </React.Suspense>
                        )
                    }
                    return <Component {...props} {...extraProps} routes={routes}/>
                }}
            />
        )
    })
}

export function OtherRouterMap() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path={'/'} render={() => {
                    return <Redirect to={'/home/index'} push/>
                }}/>
                <Route path='/' component={Layout} />
            </Switch>
        </HashRouter>
    )
}

export function RouterMap() {
    return (
        <Switch>
            <Route exact path='/home/index' component={Home} />
        </Switch>
    )
}
