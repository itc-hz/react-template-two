export interface ITabData {
    id: number
    name: string
}

export interface ISourceListQuery {
    page: number
    pageSize?: number
    search?: string
    groupId?: number
    type?: number
}

export interface ISourceListData {
    id: number
    path: string
    name: string
    groupId: number
    selected?: boolean
    type?: number
    link?: string
    remark?: string
    createTime: string
}

export interface ISourceGroupData {
    id: number
    name: string
}

export interface ISourceRTSPData {
    id?: number
    name: string
    link: string
    remark?: string
    groupId?: number
}

export interface ISourceMediaListQuery {
    page: number
    pageSize?: number
    search?: string
    type?: number
}

export interface ISourceMediaListData {
    id: number
    path: string
    name: string
    selected?: boolean
    type?: number
    createTime: string
    time?: number
    num?: number
}

export interface ISourceAddPlayList {
    id?: number
    name?: string,
    groupId?: number
    list?: ISourceMediaListData[]
}
