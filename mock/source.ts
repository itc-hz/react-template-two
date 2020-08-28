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
                    'groupId|1-5': 1,
                    'type|1-4': 1,
                    'link': 'http://www.baidu.com',
                    'remark': 'asdasd',
                    'createTime': Mock.mock('@datetime')
                }
            ],
            'total': 20
        }
    })
}

export function getMediaList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|9': [
                {
                    'id': '@increment',
                    'path': Random.dataImage('200x100', 'Hello Mock.js!'),
                    'name': '@last',
                    'type|1-3': 1,
                    'createTime': Mock.mock('@datetime')
                }
            ],
            'total': 20
        }
    })
}

export function getDetail() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'id': '@increment',
            'path': Random.dataImage('200x100', 'Hello Mock.js!'),
            'name': '@last',
            'groupId|1-5': 1,
            'type|1-4': 1,
            'link': 'http://www.baidu.com',
            'remark': 'asdasd',
            'createTime': Mock.mock('@datetime')
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

export function saveRtsp() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

export function savePlayList() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

export function getPlayList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'id': '@increment',
            'groupId|1-5': 1,
            'type|1-4': 1,
            'name': '@last',
            'list|5': [
                {
                    'id': '@increment',
                    'path': Random.dataImage('200x100', 'Hello Mock.js!'),
                    'name': '@last',
                    'type|1-3': 1,
                    'createTime': Mock.mock('@datetime'),
                    'time|1-50': 10,
                    'num|1-10': 1
                }
            ]
        }
    })
}
