import mixins from '@/mixins'

describe('readable currency mixin', () => {
  it('should properly format the given data', () => {
    expect(mixins.readableCurrency(100000000)).toEqual('1.00')
    expect(mixins.readableCurrency(1000000000)).toEqual('10.00')
    expect(mixins.readableCurrency(10000000000)).toEqual('100.00')
    expect(mixins.readableCurrency(100000000000)).toEqual(Number(1000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }))
  })
})
