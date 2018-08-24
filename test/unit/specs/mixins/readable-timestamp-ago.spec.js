import mixins from '@/mixins'
import store from '@/store'

describe('readable timestamp ago mixin', () => {
  beforeAll(() => {
    store.dispatch('network/setNetworkEpochTime', '2017-03-21T13:00:00.000Z')
  })

  it('should properly format the given data', () => {
    expect(mixins.readableTimestampAgo(22231900, 26231900)).toEqual('2 months ago')
  })
})
