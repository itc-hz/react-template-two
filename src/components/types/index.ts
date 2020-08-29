import React from 'react'

export interface IDrawer {
    canClickMask?: boolean
    name?: string
    children: React.ReactNode
    footer: React.ReactNode
    close: () => void
    toggleShow: () => void
    loading: boolean
    show: boolean
}