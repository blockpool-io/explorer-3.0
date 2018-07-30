import mixins from '@/mixins'
import store from '@/store'

describe('readable timestamp mixin', () => {
  beforeAll(() => {
    store.dispatch('network/setNetworkEpochTime', '2017-03-21T13:00:00.000Z')
  })

  it('should properly format the given data', () => {
    expect(mixins.readableTimestamp(1)).toEqual('21.03.2017 15:00:01')
  })
})
