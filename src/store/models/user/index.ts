import {EnthusiasmAction} from './actions'
import {INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM} from './action-types'

interface StoreState {
    languageName: string
    enthusiasmLevel: number
}

const defaultStatus: StoreState = ({
    languageName: '',
    enthusiasmLevel: 1
})

export default (state: StoreState = defaultStatus, action: EnthusiasmAction): StoreState => {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return {...state, enthusiasmLevel: state.enthusiasmLevel + 1}
        case DECREMENT_ENTHUSIASM:
            return {...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1)}
    }
    return state
}
