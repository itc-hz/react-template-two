import Mock from 'mockjs'
import * as audit from './audit'

Mock.setup({
    timeout: 500
})

Mock.mock(/\/api\/audit\/getFileList/, 'get', audit.getList)
Mock.mock(/\/api\/audit\/auditConfigList/, 'get', audit.auditConfigList)
Mock.mock(/\/api\/audit\/removeAudit/, 'post', audit.removeAudit)
Mock.mock(/\/api\/audit\/passAudit/, 'post', audit.passAudit)
Mock.mock(/\/api\/audit\/saveAuditConfig/, 'post', audit.saveAuditConfig)
