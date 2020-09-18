import React from 'react'
import {IRouterFC} from '@model/common'
import {renderRoutes} from '@src/routers'
import {Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

const RouteGo: React.FC<IRouterFC> = ({routes}) => {
    console.log('go', renderRoutes(routes))
    return (
       <div>
           <Switch>
               {renderRoutes(routes)}
           </Switch>
       </div>
    )
}

export default RouteGo

RouteGo.propTypes = {
    routes: PropTypes.array
}
