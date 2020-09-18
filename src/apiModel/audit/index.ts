export interface IAuditListQuery {
    page: number
    pageSize?: number
    type?: number
}

export interface IAuditData {
    id: number
    name?: string
    type?: number
    creator: string
    size: number
    createTime: string
}

export interface IAuditPerson {
    userId: number
    name: string
}

export interface IAuditConfig  {
    id: number
    level: number
    list: IAuditPerson[]
}

export interface ISaveAuditConfigData {
    id?: number
    list: IAuditPerson[]
}
