import Mock from 'mockjs'

const {Random} = Mock

export function getList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|12': [
                {
                    'id': '@increment',
                    'path': Random.dataImage('200x100', 'Hello Mock.js!'),
                    'name': '@last',
                    'groupId|1-5': 1
                }
            ],
            'total': 20
        }
    })
}

export function getGroup() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data|10': [
            {
                'id': '@increment',
                'name': '@first'
            }
        ]
    })
}
