import React from 'react'
import CommonLayout from '@common/layout'
import RouteGo from '@common/routeGo'
import {RouteConfigDeclaration} from '@src/pageModel/common'

export const routesConfig: RouteConfigDeclaration[] = [
    {
        path: '/',
        component: CommonLayout,
        hidden: true,
        children: [
            {
                path: '/home/index',
                key: '1',
                exact: true,
                name: '我的首页',
                isDynamic: true,
                component: React.lazy(() => import('@src/pages/home'))
            },
            {
                path: '/audit',
                isRedirect: true,
                component: RouteGo,
                name: '审核管理',
                key: '4',
                children: [
                    {
                        path: '/audit/file',
                        exact: true,
                        name: '文件审核',
                        isDynamic: true,
                        component: React.lazy(() => import('@src/pages/audit/file'))
                    },
                    {
                        path: '/audit/media',
                        exact: true,
                        isDynamic: true,
                        name: '资源审核',
                        component: React.lazy(() => import('@src/pages/audit/source'))
                    }
                ]
            }
        ]
    }
]
