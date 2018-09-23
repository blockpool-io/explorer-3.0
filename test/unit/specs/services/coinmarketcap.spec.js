import coinmarketcapService from '@/services/coin-market-cap'
import store from '@/store'

describe('Coinmarketcap Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://s01.mc.blockpool.io:9030/api')
  })

  it('should return price for BPL in given currency', async () => {
    const data = await coinmarketcapService.price('USD')
    expect(data).toBeGreaterThan(0)
  })
})
