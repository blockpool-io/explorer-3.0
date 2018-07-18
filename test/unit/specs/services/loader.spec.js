import loaderService from '@/services/loader'
import store from '@/store'

describe('Loader Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://13.56.163.57:9030/api')
  })

  it('should return network settings', async () => {
    const data = await loaderService.config()
    expect(Object.keys(data).sort()).toEqual([
      'nethash',
      'token',
      'symbol',
      'explorer',
      'version'
    ].sort())
  })
})
