import Mock from 'mockjs'
import * as layout from './layout'
import * as source from './source'

Mock.setup({
    timeout: 500
})

Mock.mock(/\/api\/layout\/list/, 'get', layout.getList)
Mock.mock(/\/api\/layout\/groups/, 'get', layout.getGroup)

Mock.mock(/\/api\/source\/list/, 'get', source.getList)
Mock.mock(/\/api\/source\/groups/, 'get', source.getGroup)
Mock.mock(/\/api\/source\/tabs/, 'get', source.getGroup)
Mock.mock(/\/api\/source\/saveRtsp/, 'post', source.saveRtsp)
Mock.mock(/\/api\/source\/getRtsp/, 'get', source.getDetail)
Mock.mock(/\/api\/source\/savePlayList/, 'post', source.savePlayList)
Mock.mock(/\/api\/source\/getMediaList/, 'get', source.getMediaList)
Mock.mock(/\/api\/source\/getPlayList/, 'get', source.getPlayList)
