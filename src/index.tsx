import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import {HashRouter, Switch} from 'react-router-dom'
import store from './store'
import Entry from './entry'

import './reset.scss'
// 逼不得已引入less
import 'antd/dist/antd.less'
import './theme.less'
import './index.scss'
import '../mock'
import './i18n'

ReactDOM.render(
    <Provider store={store}>
        <Entry/>
    </Provider>,
    document.getElementById('app')
)
