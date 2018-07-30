import store from '@/store'
import LoaderService from '@/services/loader'
import BitService from '@/services/bit'

const mixin = {
  async beforeCreate() {
    const ticker = this.$route.params.ticker.toLowerCase() || 'bpl'
    const coins = BitService.supportedcoins()

    console.log(coins)

    if (!coins.include(ticker)) {
      console.log('included')
    }

    if (store.getters['network/tokenShortName'].toLowerCase() != ticker) {
      const network = require(`../../networks/${ticker}/mainnet`)

      this.$store.dispatch('network/setDefaults', network)
      this.$store.dispatch('network/setServer', network.server)
      this.$store.dispatch('network/setAlias', network.alias)
      this.$store.dispatch('network/setCurrencies', network.currencies)
      this.$store.dispatch('network/setKnownWallets', network.knownWallets)

      const response = await LoaderService.config()
      this.$store.dispatch('network/setToken', response.network.token)
      this.$store.dispatch('network/setTokenShortName', response.network.tokenShortName)
      this.$store.dispatch('network/setSymbol', response.network.symbol)
      this.$store.dispatch('network/setNethash', response.network.nethash)
      this.$store.dispatch('network/setNetworkInterval', response.network.config.interval)
      this.$store.dispatch('network/setActiveDelegates', response.network.config.delegates)
    }
  }
}

export default mixin
