import {EnthusiasmAction} from './actions'
import * as actions from './action-types'
import {useSelector, TypedUseSelectorHook} from 'react-redux'

interface StoreState {
    language: string
    loading: boolean
    showConfig: boolean
    primaryColor: string
}

const defaultStatus: StoreState = ({
    language: 'zh',
    loading: false,
    showConfig: true,
    primaryColor: '#FFAE36'
})

export default (state: StoreState = defaultStatus, action: EnthusiasmAction): StoreState => {
    switch (action.type) {
        case actions.CHANGE_LANGUAGE:
            return {...state, language: action.language}
        case actions.CHANGE_LOADING:
            return {...state, loading: action.loading}
        case actions.CHANGE_COLOR:
            return {...state, primaryColor: action.primaryColor}
        default:
            return state
    }
}

export const useTypedSelector: TypedUseSelectorHook<StoreState> = useSelector
