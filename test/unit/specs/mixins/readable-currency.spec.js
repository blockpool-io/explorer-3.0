import mixins from '@/mixins'
import store from '@/store'

const displayCurrency = function(value) {
  return value.toLocaleString('en', {
    style: 'currency',
    currency: 'eur'
  })
}

describe('readable currency mixin', () => {
  store.dispatch('network/setTokenShortName', 'BPL')

  it('should properly format the given data', () => {
    expect(mixins.readableCurrency(100000000, false, null, 'BPL')).toEqual('1 β')
    expect(mixins.readableCurrency(1000000000, false, null, 'BTC')).toEqual('10 Ƀ')
    expect(mixins.readableCurrency(10000000000, false, null, 'ETH')).toEqual('100 Ξ')
    expect(mixins.readableCurrency(100000000000, false, null, 'LTC')).toEqual(`${Number(1000).toLocaleString()} Ł`)
  })

  it('should format currency with 2 decimals', () => {
    expect(mixins.readableCurrency(10, true, 1, 'eur', false)).toEqual(displayCurrency(10))
    expect(mixins.readableCurrency(10.3, true, 1, 'eur', false)).toEqual(displayCurrency(10.30))
    expect(mixins.readableCurrency(10.34, true, 1, 'eur', false)).toEqual(displayCurrency(10.34))
    expect(mixins.readableCurrency(10.349, true, 1, 'eur', false)).toEqual(displayCurrency(10.35))
  })
})
