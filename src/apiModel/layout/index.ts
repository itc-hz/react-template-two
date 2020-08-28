export interface INLayoutListQuery {
    page: number
    pageSize?: 12
    search?: string,
    groupId?: number
}

export interface ILayoutListData {
    id: number
    path: string
    name: string
    groupId: number,
    selected?: boolean
}

export interface ILayoutGroupData {
    id: number
    name: string
}
