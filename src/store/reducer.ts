import {combineReducers} from 'redux'
import {app} from './models'

export const rootReducer = combineReducers({
    app
})

export declare type RootState = ReturnType<typeof rootReducer>
