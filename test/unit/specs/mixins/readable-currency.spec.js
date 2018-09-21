import mixins from '@/mixins'

const displayCurrency = function(value) {
  return value.toLocaleString('en', {
    style: 'currency',
    currency: 'eur'
  })
}

describe('readable currency mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableCurrency(100000000, false, null, 'BTC')).toEqual('1')
    expect(mixins.readableCurrency(1000000000, false, null, 'BTC')).toEqual('10')
    expect(mixins.readableCurrency(10000000000, false, null, 'BTC')).toEqual('100')
    expect(mixins.readableCurrency(100000000000, false, null, 'BTC')).toEqual(Number(1000).toLocaleString())
    expect(mixins.readableCurrency(100000000000, true, null, 'BTC')).toEqual(Number(1000).toLocaleString(undefined, {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      }))
  })

  it('should format currency with 2 decimals', () => {
    expect(mixins.readableCurrency(10, true, 1, 'eur', false)).toEqual(displayCurrency(10))
    expect(mixins.readableCurrency(10.3, true, 1, 'eur', false)).toEqual(displayCurrency(10.30))
    expect(mixins.readableCurrency(10.34, true, 1, 'eur', false)).toEqual(displayCurrency(10.34))
    expect(mixins.readableCurrency(10.349, true, 1, 'eur', false)).toEqual(displayCurrency(10.35))
  })
})
