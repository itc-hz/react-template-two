import React from 'react'
import {Skeleton} from 'antd'
import {Route} from 'react-router-dom'
import {RouteConfigDeclaration} from '@src/pageModel/common'

export function renderRoutes(routesConfig: RouteConfigDeclaration[], extraProps: any = {}) {
    return routesConfig.map((item) => {
        const {
            path,
            exact,
            isDynamic,
            // isProtected,
            children = [],
            loadingFallback
            // isRedirect
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
                    /* if (isRedirect) {
                          return <Redirect key={path} to={'/login'}/>
                      } */
                    if (isDynamic) {
                        return (
                            <React.Suspense fallback={loadingFallback || <Skeleton active/>}>
                                <item.component {...props} {...extraProps} routes={children}/>
                            </React.Suspense>
                        )
                    }
                    return <item.component {...props} {...extraProps} routes={children}/>
                }}
            />
        )
    })
}
