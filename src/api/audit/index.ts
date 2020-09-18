import {IAuditData, IAuditListQuery, IAuditConfig, ISaveAuditConfigData} from '@apiModel/audit'
import {HTTP} from '@lib/request'
import {IList} from '@src/apiModel'

export function getFileList(data: IAuditListQuery) {
    return HTTP<IList<IAuditData>>({url: '/api/audit/getFileList', method: 'get', data})
}

export function removeAudit(data: {id: number}) {
    return HTTP({url: '/api/audit/removeAudit', method: 'post', data})
}

export function passAudit(data: {id: number, isPass: number, remark?: string}) {
    return HTTP({url: '/api/audit/passAudit', method: 'post', data})
}

export function getAuditConfig() {
    return HTTP<IAuditConfig[]>({url: '/api/audit/auditConfigList', method: 'get'})
}

export function saveAuditConfig(data: ISaveAuditConfigData) {
    return HTTP({url: '/api/audit/saveAuditConfig', method: 'post', data})
}
