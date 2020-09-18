import Mock from 'mockjs'

// const {Random} = Mock

export function getList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|10': [
                {
                    'id': '@increment',
                    'name': '@last',
                    'type|1-4': 1,
                    'creator': '@cname',
                    'createTime': '@datetime',
                    'size|10-20': 10,
                    'auditState|1-3': 1
                }
            ],
            'total': 20
        }
    })
}

export function removeAudit() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

export function passAudit() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

export function auditConfigList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data|10': [
            {
                'id': '@increment',
                'level|1-5': 1,
                'list|1-5': [
                    {
                        'userId|1': [11, 12, 13, 21, 22],
                        'name': '@cname'
                    }
                ]
            }
        ],
    })
}

export function saveAuditConfig() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}
