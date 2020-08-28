import * as constants from './action-types'

export interface ChangeLanguage {
    type: constants.CHANGE_LANGUAGE,
    language: string
}

export interface ChangeLoading {
    type: constants.CHANGE_LOADING,
    loading: boolean
}

export interface ChangeColor {
    type: constants.CHANGE_COLOR,
    primaryColor: string
}

export declare type EnthusiasmAction = ChangeLanguage | ChangeLoading | ChangeColor

export function handleChangeLanguage(language: string): ChangeLanguage {
    return {
        type: constants.CHANGE_LANGUAGE,
        language
    }
}

export function handleChangeLoading(loading: boolean): ChangeLoading {
    return {
        type: constants.CHANGE_LOADING,
        loading
    }
}

export function handleChangeColor(primaryColor: string): ChangeColor {
    return {
        type: constants.CHANGE_COLOR,
        primaryColor
    }
}
