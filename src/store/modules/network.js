import * as types from '../mutation-types'

export default {
  namespaced: true,
  state: {
    defaults: {},
    server: null,
    nethash: null,
    alias: null,
    activeDelegates: 201,
    token: null,
    tokenShortName: null,
    symbol: null,
    currencies: [],
    knownWallets: [],
    supply: 0,
    height: 0,
    interval: 15,
    epochTime: null
  },
  mutations: {
    [types.SET_NETWORK_DEFAULTS](state, payload) {
      state.defaults = payload.value
    },
    [types.SET_NETWORK_SERVER](state, payload) {
      state.server = payload.value
    },
    [types.SET_NETWORK_NETHASH](state, payload) {
      state.nethash = payload.value
    },
    [types.SET_NETWORK_ALIAS](state, payload) {
      state.alias = payload.value
    },
    [types.SET_NETWORK_ACTIVE_DELEGATES](state, payload) {
      state.activeDelegates = payload.value
    },
    [types.SET_NETWORK_TOKEN](state, payload) {
      state.token = payload.value
    },
    [types.SET_NETWORK_TOKEN_SHORT_NAME](state, payload) {
      state.tokenShortName = payload.value
    },
    [types.SET_NETWORK_SYMBOL](state, payload) {
      state.symbol = payload.value
    },
    [types.SET_NETWORK_CURRENCIES](state, payload) {
      state.currencies = payload.value
    },
    [types.SET_NETWORK_KNOWN_WALLETS](state, payload) {
      state.knownWallets = payload.value
    },
    [types.SET_NETWORK_SUPPLY](state, payload) {
      state.supply = payload.value
    },
    [types.SET_NETWORK_HEIGHT](state, payload) {
      state.height = payload.value
    },
    [types.SET_NETWORK_INTERVAL](state, payload) {
      state.interval = payload.value
    },
    [types.SET_NETWORK_EPOCHTIME](state, payload) {
      state.epochTime = payload.value
    }
  },
  actions: {
    setDefaults: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_DEFAULTS,
        value
      })
    },
    setServer: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_SERVER,
        value
      })
    },
    setNethash: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_NETHASH,
        value
      })
    },
    setAlias: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_ALIAS,
        value
      })
    },
    setActiveDelegates: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_ACTIVE_DELEGATES,
        value
      })
    },
    setToken: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_TOKEN,
        value
      })
    },
    setTokenShortName: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_TOKEN_SHORT_NAME,
        value
      })
    },
    setSymbol: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_SYMBOL,
        value
      })
    },
    setCurrencies: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_CURRENCIES,
        value
      })
    },
    setKnownWallets: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_KNOWN_WALLETS,
        value
      })
    },
    setSupply: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_SUPPLY,
        value
      })
    },
    setHeight: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_HEIGHT,
        value
      })
    },
    setNetworkInterval: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_INTERVAL,
        value
      })
    },
    setNetworkEpochTime: ({commit}, value) => {
      commit({
        type: types.SET_NETWORK_EPOCHTIME,
        value
      })
    }
  },
  getters: {
    defaults: state => state.defaults,
    server: state => state.server,
    nethash: state => state.nethash,
    alias: state => state.alias,
    activeDelegates: state => state.activeDelegates,
    token: state => state.token,
    tokenShortName: state => state.tokenShortName,
    symbol: state => state.symbol,
    currencies: state => state.currencies,
    knownWallets: state => state.knownWallets,
    supply: state => state.supply,
    height: state => state.height,
    interval: state => state.interval,
    epochTime: state => state.epochTime
  }
}
