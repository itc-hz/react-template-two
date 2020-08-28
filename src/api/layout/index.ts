import {HTTP} from '@src/lib/request'
import {IList} from '@src/apiModel/'
import {ILayoutGroupData, ILayoutListData, INLayoutListQuery} from '@src/apiModel/layout'

export function getLayoutList(data: INLayoutListQuery) {
    return HTTP<IList<ILayoutListData>>({url: '/api/layout/list', method: 'get', data})
}

export function getGroups() {
    return HTTP<Array<ILayoutGroupData>>({url: '/api/layout/groups', method: 'get'})
}
