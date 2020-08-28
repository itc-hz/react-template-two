import {Moment} from 'moment'

export interface ICyclePlayInitialValues {
    isOnline: number
    cycleData?: number[]
    playDate?: [Moment, Moment]
    playTime?: [Moment, Moment]
}

export interface IContinuePlayInitialValues {
    isOnline: number
    startTime?: Moment
    endTime?: Moment
}

export interface ISpotPlayInitialValues {
    isOnline: number
    startDate?: Moment
    times?: [Moment, Moment]
}

export interface IFreePlayInitialValues {
    isOnline: number
}
