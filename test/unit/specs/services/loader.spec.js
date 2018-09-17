import loaderService from '@/services/loader'
import store from '@/store'

describe('Loader Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://s01.mc.blockpool.io:9030/api')
  })

  it('should return network settings', async () => {
    const data = await loaderService.config()
    expect(Object.keys(data).sort()).toEqual([
      'success',
      'network',
      'config'
    ].sort())
  })
})
