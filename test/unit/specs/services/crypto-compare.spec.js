import cryptoCompareService from '@/services/crypto-compare'
import store from '@/store'

describe('CryptoCompare Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://s01.mc.blockpool.io:9030/api')
    store.dispatch('network/setTokenShortName', 'BPL')
    store.dispatch('network/setAlias', 'Main')
    store.dispatch('currency/setName', 'USD')
  })

  it('should return day values', async () => {
    const data = await cryptoCompareService.day()
    expect(data.labels.length).toBe(25)
    expect(data.datasets.length).toBe(25)
  })

  it('should return week values', async () => {
    const data = await cryptoCompareService.week()
    expect(data.labels.length).toBe(8)
    expect(data.datasets.length).toBe(8)
  })

  it('should return month values', async () => {
    const data = await cryptoCompareService.month()
    expect(data.labels.length).toBeGreaterThanOrEqual(29)
    expect(data.datasets.length).toBeGreaterThanOrEqual(29)
  })

  it('should return quarter values', async () => {
    const data = await cryptoCompareService.quarter()
    expect(data.labels.length).toBe(121)
    expect(data.datasets.length).toBe(121)
  })

  it('should return year values', async () => {
    const data = await cryptoCompareService.year()
    expect(data.labels.length).toBeGreaterThanOrEqual(366)
    expect(data.datasets.length).toBeGreaterThanOrEqual(366)
  })

  it('should return year values, even if token matches currency', async () => {
    store.dispatch('currency/setName', 'BPL')
    const data = await cryptoCompareService.year()
    expect(data.labels.length).toBeGreaterThanOrEqual(366)
    expect(data.datasets.length).toBeGreaterThanOrEqual(366)
  })

  it('should return the daily average for a given timestamp and valid currency', async () => {
    store.dispatch('currency/setName', 'USD')
    const data = await cryptoCompareService.dailyAverage(45488712)
    console.log(data)
    expect(data).toBe(0.04846)
  })

  it('should return null for a given timestamp and invalid currency', async () => {
    store.dispatch('currency/setName', '???')
    const data = await cryptoCompareService.dailyAverage(45488712)
    expect(data).toBe(null)
  })

  it('should return null if not on Main network', async () => {
    store.dispatch('network/setAlias', 'Development')
    store.dispatch('currency/setName', 'tBPL')
    const data = await cryptoCompareService.dailyAverage(45488712)
    expect(data).toBe(null)
  })
})
