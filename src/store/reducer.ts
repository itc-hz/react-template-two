import {combineReducers} from 'redux'
import {user, app} from './models'

export const rootReducer = combineReducers({
    app,
    user
})
/* eslint-disable */
export declare type RootState = ReturnType<typeof rootReducer>
