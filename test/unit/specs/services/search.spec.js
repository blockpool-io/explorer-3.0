import searchService from '@/services/search'
import store from '@/store'

describe('Search Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'http://s01.mc.blockpool.io:9030/api')
  })

  it('should return address when searching for existing wallet', async () => {
    const data = await searchService.findByAddress('BDeeUQvZ61ErcpzjdUCTmwtxJcTg13HQYs')
    expect(Object.keys(data.account).sort()).toEqual([
      'address',
      'unconfirmedBalance',
      'balance',
      'publicKey',
      'unconfirmedSignature',
      'secondSignature',
      'secondPublicKey',
      'multisignatures',
      'u_multisignatures'
    ].sort())
  })

  it('should fail when searching for non-existing wallet', async () => {
    await expect(searchService.findByAddress('ffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should return delegate address when searching for existing username', async () => {
    const data = await searchService.findByUsername('bpl_dev_del')
    expect(Object.keys(data.delegate).sort()).toEqual([
      'username',
      'address',
      'publicKey',
      'vote',
      'producedblocks',
      'missedblocks',
      'rate',
      'approval',
      'productivity'
    ].sort())
  })

  it('should fail when searching for non-matching username', async () => {
    await expect(searchService.findByAddress('asdhfajksdhfakjsdfasdf')).rejects.toThrow()
  })

  it('should return delegate address when searching for existing public key', async () => {
    const data = await searchService.findByPublicKey('03e6e411575c8edd3a053a3ba86118005c8971c9e1349d44dd91a8742bdfa6dca7')
    expect(Object.keys(data.delegate).sort()).toEqual([
      'username',
      'address',
      'publicKey',
      'vote',
      'producedblocks',
      'missedblocks',
      'rate',
      'approval',
      'productivity'
    ].sort())
  })

  it('should fail when searching for non-matching public key', async () => {
    await expect(searchService.findByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should return block when searching for existing block id', async () => {
    jest.setTimeout(60000) // This function easily takes 10-30 seconds to resolve, not sure why
    const data = await searchService.findByBlockId('11217043835834306811')
    expect(Object.keys(data.block).sort()).toEqual([
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
    ].sort())
  })

  it('should fail when searching for non-existing block id', async () => {
    jest.setTimeout(60000) // This function easily takes 10-30 seconds to resolve, not sure why
    await expect(searchService.findByBlockId('0')).rejects.toThrow()
  })

  it('should return transaction when searching for existing transaction id', async () => {
    const data = await searchService.findByTransactionId('7efc7dbadfa439a6e21a2bce3d3bbaf63236db92948d33bb241b57fbf6713ce0')
    expect(Object.keys(data.transaction).sort()).toEqual([
      'id',
      'blockid',
      'height',
      'type',
      'timestamp',
      'amount',
      'fee',
      'senderId',
      'senderPublicKey',
      'recipientId',
      'signature',
      'asset',
      'confirmations'
    ].sort())
  })

  it('should fail when searching for non-existing transaction id', async () => {
    await expect(searchService.findByTransactionId('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })
})
