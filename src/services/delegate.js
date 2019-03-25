import NodeService from '@/services/node'
import block from '@/services/block'
import forging from '@/services/forging'
import store from '@/store'
import _ from 'lodash'

class DelegateService {
  async all() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates', {
      params: {
        limit: activeDelegates
      }
    })

    const requests = []
    requests.push(response)

    for (
      let index = 1;
      index < Math.ceil(response.data.totalCount / activeDelegates);
      index++
    ) {
      requests.push(
        NodeService.get('delegates', {
          params: {
            limit: activeDelegates,
            offset: index * activeDelegates
          }
        })
      )
    }

    const results = await Promise.all(requests)

    return results
      .map(result => {
        return result.data.delegates
      })
      .reduce((a, b) => [...a, ...b])
  }

  async voters(publicKey, excludeLowBalances = true) {
    const response = await NodeService.get('delegates/voters', {
      params: {publicKey}
    })

    let voters = _.orderBy(
      response.data.accounts.map(account => {
        account.balance = Number(account.balance)

        return account
      }),
      'balance',
      'desc'
    )

    if (excludeLowBalances) {
      voters = _.filter(voters, account => {
        return account.balance > 0.1 * Math.pow(10, 8)
      })
    }

    return voters
  }

  async findByUsername(username) {
    const response = await NodeService.get('delegates/get', {
      params: {username}
    })
    return response.data.delegate
  }

  async find(publicKey) {
    const response = await NodeService.get('delegates/get', {
      params: {publicKey}
    })

    const delegate = response.data.delegate

    if (!delegate) {
      return false
    }

    const forgeResponse = await NodeService.get(
      `delegates/forging/getForgedByAccount?generatorPublicKey=${
        delegate.publicKey
      }`
    )

    delegate.forged = Number(forgeResponse.data.forged)

    return delegate
  }

  async standby() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates', {params: {offset: activeDelegates}})
    return response.data.delegates
  }

  async nextForgers() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates/getNextForgers', {
      params: {limit: activeDelegates}
    })
    return response.data.delegates
  }

  /**
   * @TODO - Remove this when Core 2.0 is released.
   */
  async activeDelegates() {
    const roundResponse = await NodeService.get('rounds')
    const lastForgedResponse = await NodeService.get('rounds/lastForgedBlocks')

    const activeDelegates = roundResponse.data.activeDelegates
    const blocks = roundResponse.data.blocks
    const delegateCount = activeDelegates.length

    const delegates = activeDelegates.map(delegate => {
      const lastBlock = lastForgedResponse.data.lastBlocks.find(
        b => b.generatorPublicKey === delegate.publicKey
      )

      if (lastBlock !== undefined && lastBlock.hasOwnProperty('timestamp')) {
        delegate.blocks = [lastBlock]
        delegate.blocksAt = lastBlock.timestamp
      }

      return delegate
    })

    sessionStorage.setItem('lastBlocksFetched', JSON.stringify(blocks))
    sessionStorage.setItem('lastDelegatesLastBlock', JSON.stringify(delegates))

    // Rounds
    const lastBlock = blocks[blocks.length - 1]
    const forgerInfo = delegates.reduce((forgers, delegate) => {
      const isForger = lastBlock.generatorPublicKey === delegate.publicKey
      if (forgers.hasFoundForger) {
        forgers.previous.push(delegate.publicKey)
      } else {
        forgers.upcoming.push(delegate.pub)
      }
      forgers.hasFoundForger = forgers.hasFoundForger || isForger
      return forgers
    }, {
      hasFoundForger: false,
      previous: [],
      upcoming: [],
    })

    const nextForgers = forgerInfo.upcoming.concat(forgerInfo.previous)
    const supply = store.getters['network/supply']
    const delegatesRounds = delegates.map(delegate => {
      const delegateIndex = nextForgers.findIndex(
        d => d === delegate.publicKey
      )

      delegate.forgingTime = delegateIndex * 8
      delegate.isRoundDelegate = delegateIndex !== -1

      delegate.approval = (delegate.vote / supply) * 100

      return delegate
    })

    // Forging Status
    const height = lastBlock.height
    return {
      delegateCount: delegateCount,
      delegates: delegatesRounds.map(delegate => {
        delegate.forgingStatus = forging.status(
          delegate,
          height
        )
        return delegate
      })
    }
  }

  async forged() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: activeDelegates
      }
    })

    const delegates = response.data.delegates
    const requests = []

    delegates.forEach(delegate => {
      requests.push(
        NodeService.get('delegates/forging/getForgedByAccount', {
          params: {
            generatorPublicKey: delegate.publicKey
          }
        })
      )
    })

    const results = await Promise.all(requests)
    return results.map((result, index) => {
      return {
        delegate: delegates[index].publicKey,
        forged: Number(result.data.forged)
      }
    })
  }

  async activeDelegatesCount() {
    const response = await NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: 1
      }
    })
    return response.data.totalCount
  }
}

export default new DelegateService()
