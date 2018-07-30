<template>
  <div class="hidden xl:block border-l border-r border-grey-dark px-10 ml-10">
    <div class="text-grey mb-2 min-w-0">{{ $t("Total Forged (token)", { token: networkTokenShortName() }) }}</div>
    <div class="text-lg text-white truncate">
      <span>{{ readableCrypto(forged, false) }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  data: () => ({ forged: 0 }),

  mounted() {
    this.prepareComponent()
  },

  computed: {
    ...mapGetters('network', ['activeDelegates']),
  },

  methods: {
    prepareComponent() {
      this.getTotal()

      this.$store.watch(state => state.network.height, value => this.getTotal())
    },

    async getTotal() {
      const supply = store.getters['network/supply']
      this.forged = supply - 25000000 * Math.pow(10, 8)
    },

    async addLastReward() {
      const block = await BlockService.last()
      this.forged += Number(block.totalForged)
    }
  },
}
</script>
