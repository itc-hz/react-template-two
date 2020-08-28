import styles from '../layout.module.scss'
import React, {useEffect} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import * as imgs from '../img'

interface RouteModel {
    key: number | string
    name: string
    path: string,
    icon?: any,
    children?: RouteModel[]
}

const route: RouteModel[] = [
    {
        name: '我的首页',
        key: 1,
        path: '/home/index',
        icon: imgs.img11
    },
    {
        name: '资源管理',
        key: 2,
        path: '/source/index',
        icon: imgs.img21,
        children: [
            {
                name: '资源列表',
                path: '/source/index',
                key: '2-1'
            },
            {
                name: '我上传的',
                path: '/resource/upload',
                key: '2-2'
            },
            {
                name: '模板商城',
                path: '/resource/layout',
                key: '2-3'
            }
        ]
    },
    {
        name: '布局管理',
        key: 3,
        path: '/nlayout/index',
        icon: imgs.img31
    },
    {
        name: '审核管理',
        key: 4,
        path: '/audit/index',
        icon: imgs.img41
    },
    {
        name: '发布管理',
        key: 5,
        path: '/publish/index',
        icon: imgs.img51
    },
    {
        name: '个人中心',
        key: 6,
        path: '/person/index',
        icon: imgs.img61
    }
]

const Side = () => {
    const {pathname} = useLocation()

    useEffect(() => {
        // 路由变化
    }, [pathname])

    return (
        <aside>
            <ul className={styles.menuList}>
                {
                    route && route.map((item: RouteModel, i: number) => {
                        /* if (path === i) {
                             return (<li className={`${styles.menuItem} ${styles.active}`}
                                         key={i}>
                                 <Link to={item.path}>{item.name}</Link>
                             </li>)
                         } */
                        return <NavLink key={i} activeClassName="selected" to={item.path}>
                            <li className={styles.menuItem}>
                                {item.icon && <img src={item.icon} alt=""/>}
                                <span>{item.name}</span>
                            </li>
                        </NavLink>
                    })
                }
            </ul>
        </aside>
    )
}

export default Side
