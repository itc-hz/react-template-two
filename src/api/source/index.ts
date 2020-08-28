import {HTTP} from '@src/lib/request'
import {IList} from '@src/apiModel/'
import {ITabData, ISourceGroupData, ISourceListData, ISourceListQuery, ISourceRTSPData, ISourceMediaListQuery, ISourceMediaListData, ISourceAddPlayList} from '@src/apiModel/source'

export function getSourceList(data: ISourceListQuery) {
    return HTTP<IList<ISourceListData>>({url: '/api/source/list', method: 'get', data})
}

export function getSourceGroups() {
    return HTTP<Array<ISourceGroupData>>({url: '/api/source/groups', method: 'get'})
}

export function getSourceTabs() {
    return HTTP<Array<ITabData>>({url: '/api/source/tabs', method: 'get'})
}

export function saveRtsp(data: ISourceRTSPData) {
    return HTTP({url: '/api/source/saveRtsp', method: 'post', data})
}

export function getRtsp(data: { id: number }) {
    return HTTP<ISourceListData>({url: '/api/source/getRtsp', method: 'get', data})
}

export function getMedias(data: ISourceMediaListQuery) {
    return HTTP<IList<ISourceMediaListData>>({url: '/api/source/getMediaList', method: 'get', data})
}

export function savePlayList(data: ISourceAddPlayList) {
    return HTTP({url: '/api/source/savePlayList', method: 'post', data})
}

export function getPlayList(data: {id: number}) {
    return HTTP<ISourceAddPlayList>({url: '/api/source/getPlayList', method: 'get', data})
}
