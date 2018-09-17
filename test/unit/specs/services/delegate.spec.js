/* Disable eslint for the block and forging imports */
/* eslint-disable no-unused-vars */
import delegateService from '@/services/delegate'
import block from '@/services/block'
import forging from '@/services/forging'
import store from '@/store'

const delegatePropertyArray = [
  'username',
  'address',
  'publicKey',
  'vote',
  'producedblocks',
  'missedblocks',
  'rate',
  'approval',
  'productivity'
].sort()

const voterPropertyArray = [
  'username',
  'address',
  'publicKey',
  'balance'
].sort()

describe('Delegate Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://s01.mc.blockpool.io:9030/api')
    store.dispatch('network/setActiveDelegates', 201)
  })

  it('should return all available delegates', async () => {
    const data = await delegateService.all()
    expect(Object.keys(data[0]).sort()).toEqual(delegatePropertyArray)
    expect(data.length).toBeGreaterThan(201)
  })

  it('should retrieve the voters based on given delegate public key, excluding low balances', async() => {
    const data = await delegateService.voters('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(Object.keys(data[0]).sort()).toEqual(voterPropertyArray)
    expect(data[0].balance).toBeGreaterThan(0.1 * Math.pow(10, 8))
  })

  it('should retrieve the voters based on given delegate public key, including low balances', async() => {
    const data = await delegateService.voters('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7', false)
    expect(Object.keys(data[0]).sort()).toEqual(voterPropertyArray)
    const excluding = await delegateService.voters('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(data.length).toBeGreaterThanOrEqual(excluding.length)
  })

  it('should return an empty list when retrieving voters of delegate with non-existing public key', async() => {
    const data = await delegateService.voters('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toHaveLength(0)
  })

  it('should return the delegate when searching by username', async() => {
    const data = await delegateService.findByUsername('bpl_dev_del')
    expect(Object.keys(data).sort()).toEqual(delegatePropertyArray)
    expect(data.username).toBe('bpl_dev_del')
  })

  it('should fail when searching for delegate by non-existing username', async() => {
    await expect(delegateService.findByUsername('asdfasdfasdfasdfasdfasdf')).rejects.toThrow()
  })

  it('should return the delegate when searching by public key', async() => {
    const data = await delegateService.find('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(Object.keys(data).sort()).toEqual(delegatePropertyArray.concat('forged').sort())
    expect(data.username).toBe('bpl_dev_del')
  })

  it('should fail if the public key exists but does not correspond to a delegate', async() => {
    await expect(delegateService.find('033ee61ef86b55722b23385d49e417f8d345f9e2655b95a188ce54ba072454b73c')).rejects.toThrow()
  })

  it('should fail when searching for non-existing public key', async() => {
    await expect(delegateService.find('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should retrieve the standby delegates', async() => {
    const data = await delegateService.standby()
    expect(Object.keys(data[0]).sort()).toEqual(delegatePropertyArray)
    expect(data.length).toBe(201)
  })

  it('should retrieve the list of next forgers', async() => {
    const data = await delegateService.nextForgers()
    expect(data.length).toBeLessThanOrEqual(201)
  })

  it('should return a list of active delegates and their stats', async() => {
    jest.setTimeout(60000) // Allow this function to take longer than the specified 5 seconds
    const data = await delegateService.activeDelegates()
    expect(data.delegateCount).toBeDefined()
    expect(data.delegates).toBeDefined()
    expect(Object.keys(data.delegates[0]).sort()).toEqual([
      'username',
      'address',
      'publicKey',
      'vote',
      'producedblocks',
      'missedblocks',
      'rate',
      'approval',
      'productivity',
      'blocks',
      'blocksAt',
      'forgingTime',
      'isRoundDelegate',
      'status',
      'forgingStatus'
    ].sort())
  })

  it('should return a list of delegates and their forged amounts', async() => {
    const data = await delegateService.forged()
    expect(Object.keys(data[0]).sort()).toEqual([
      'delegate',
      'forged'
    ])
  })

  it('should return the count of active delegates', async() => {
    const data = await delegateService.activeDelegatesCount()
    expect(data).toBeGreaterThan(102)
  })
})
