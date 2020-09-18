import styles from '../layout.module.scss'
import React, {useEffect, useState} from 'react'
import {useLocation, Link, useRouteMatch} from 'react-router-dom'
import * as imgs from '../img'
import {routesConfig} from '@src/routers/routerConfig'
import {RouteConfigDeclaration} from '@model/common'
import PropTypes from 'prop-types'

interface ICustomLink {
    icon?: string
    to: string
    name: string
    children?: React.ReactNode
    pathname?: string
    oldTo?: string
}

const CustomLink: React.FC<ICustomLink> = ({icon, to, name, children, pathname, oldTo}) => {
    const [otherMatch, setOtherMatch] = useState(false)
    const match = useRouteMatch({
        path: to,
        exact: true
    })

    const judgePathName = () => {
        if (pathname && pathname.indexOf(oldTo) > -1) {
            setOtherMatch(true)
        } else {
            setOtherMatch(false)
        }
    }

    useEffect(() => {
        judgePathName()
    }, [pathname])

    const type = match || otherMatch ? '2' : '1'
    // @ts-ignore
    const iconUrl = imgs[`img${icon}${type}`]

    return (
        <Link className={match || otherMatch ? 'selected' : ''} to={to}>
            <li className={styles.menuItem}>
                {icon && <img src={iconUrl} alt=""/>}
                <span>{name}</span>
            </li>
            {children}
        </Link>
    )
}

CustomLink.propTypes = {
    icon: PropTypes.string,
    to: PropTypes.string,
    name: PropTypes.string,
    pathname: PropTypes.string,
    oldTo: PropTypes.string,
    children: PropTypes.any
}

const CustomChildLink: React.FC<ICustomLink> = ({to, name}) => {
    const match = useRouteMatch({
        path: to,
        exact: true
    })

    return (
        <Link to={to}
              className={match ? `${styles.subMenuItemLink} ${styles.activeLink}` : styles.subMenuItemLink}
              key={to}>{name}</Link>
    )
}

CustomChildLink.propTypes = {
    to: PropTypes.string,
    name: PropTypes.string
}

const Side = () => {
    const {pathname} = useLocation()
    const routes = getSideRoutes(routesConfig[0].children)

    const renderSubMenu = (data: RouteConfigDeclaration[]) => (
        data.map((item) => {
            if (item.children) {
                return (
                    <CustomLink key={item.children[0].path} pathname={pathname} name={item.name}
                                to={item.children[0].path}
                                oldTo={item.path}
                                icon={item.key}>
                        <div className={styles.subMenuItem}>
                            {
                                item.children.map((subItem) => (
                                    <CustomChildLink to={subItem.path}
                                                     key={subItem.path}
                                                     name={subItem.name}/>
                                ))
                            }
                        </div>
                    </CustomLink>
                )
            }
            return <CustomLink key={item.path} pathname={pathname} to={item.path} name={item.name} icon={item.key}/>
        })
    )

    useEffect(() => {
        // 路由变化
    }, [pathname])

    return (
        <aside>
            <ul className={styles.menuList}>
                {renderSubMenu(routes)}
            </ul>
        </aside>
    )
}

export default Side

function getSideRoutes(routes: RouteConfigDeclaration[]) {
    let result: RouteConfigDeclaration[] = []
    for (const item of routes) {
        if (item.hidden) {
            if (item.children && item.children.length > 0) {
                result = [...result, ...getSideRoutes(item.children)]
            }
        } else {
            if (item.children && item.children.length > 0) {
                const newItem = JSON.parse(JSON.stringify(item))
                newItem.children = getSideRoutes(item.children)
                result = [...result, newItem]
            } else {
                result = [...result, item]
            }
        }
    }
    return result
}
