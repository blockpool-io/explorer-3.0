import blockService from '@/services/block'
import store from '@/store'

const blockPropertyArray = [
  'id',
  'version',
  'timestamp',
  'height',
  'previousBlock',
  'numberOfTransactions',
  'totalAmount',
  'totalFee',
  'reward',
  'payloadLength',
  'payloadHash',
  'generatorPublicKey',
  'generatorId',
  'blockSignature',
  'confirmations',
  'totalForged'
].sort()

describe('Block Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://13.56.163.57:9030/api')
  })

  it('should return the latest blocks', async () => {
    const data = await blockService.latest()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return the latest blocks with given limit', async () => {
    const data = await blockService.latest(250)
    expect(data).toHaveLength(250)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return the last block', async () => {
    const data = await blockService.last()
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return the block height', async () => {
    const data = await blockService.height()
    expect(data).toBeDefined()
  })

  it('should return the supply', async () => {
    let data = await blockService.supply()
    expect(Number(data)).toBeGreaterThan(2500000000000000)
  })

  it('should return the block for the given id', async () => {
    const data = await blockService.find('11217043835834306811')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should fail when given block id is incorrect', async () => {
    await expect(blockService.find('0')).rejects.toThrow()
  })

  it('should return the blocks by an offset', async () => {
    jest.setTimeout(30000)
    const data = await blockService.paginate()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return the blocks for given generator public key', async () => {
    jest.setTimeout(30000)
    const data = await blockService.getByPublicKey('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return an empty list when given generator public key is incorrect', async () => {
    jest.setTimeout(30000)
    const data = await blockService.getByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toHaveLength(0)
  })

  it('should return the number of blocks forged by given generator public key', async () => {
    jest.setTimeout(30000)
    const data = await blockService.forgedByPublicKeyCount('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(data).toBeDefined()
  })

  it('should return zero when given generator public key is incorrect', async () => {
    jest.setTimeout(30000)
    const data = await blockService.forgedByPublicKeyCount('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toEqual(0)
  })

  it('should return the last block for given generator public key', async () => {
    jest.setTimeout(60000) // This function easily takes 10-30 seconds to resolve, not sure why
    const data = await blockService.lastBlockByPublicKey('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return undefined when given generator public key is incorrect', async () => {
    jest.setTimeout(60000)
    const data = await blockService.lastBlockByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toBeUndefined()
  })

  it('should return the previous block for the given height', async () => {
    jest.setTimeout(60000)
    const data = await blockService.findPrevious(1000000)
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return undefined when finding previous block for an incorrect height', async () => {
    jest.setTimeout(30000)
    const data = await blockService.findPrevious(1234567891234567890)
    expect(data).toBeUndefined()
  })

  it('should fail when an no parameter is given (findPrevious)', async() => {
    await expect(blockService.findPrevious()).rejects.toThrow()
  })

  it('should return the latest block when an empty string is given (findPrevious)', async() => {
    jest.setTimeout(30000)
    const data = await blockService.findPrevious('')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return the next block for the given height', async () => {
    jest.setTimeout(60000)
    const data = await blockService.findNext(1000000)
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return undefined when finding next block for an incorrect height', async () => {
    const data = await blockService.findNext(1234567891234567890)
    expect(data).toBeUndefined()
  })

  it('should fail when no parameter is given (findNext)', async() => {
    await expect(blockService.findNext()).rejects.toThrow()
  })

  it('should return the block at height 1 when an empty string is given (findNext)', async() => {
    jest.setTimeout(30000)
    const data = await blockService.findNext('')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
    expect(data.height).toBe(1)
  })
})
