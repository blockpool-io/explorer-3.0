<template>
  <div class="hidden xl:block border-l border-r border-grey-dark px-10 ml-10">
    <div class="text-grey mb-2 min-w-0">{{ $t("Total Forged (token)", { token: networkTokenShortName() }) }}</div>
    <div class="text-lg text-white truncate">
      <span v-tooltip="$t('Between count active delegates', { count: activeDelegates })" >{{ readableCrypto(forged, false) }}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BlockService from '@/services/block'
import DelegateService from '@/services/delegate'
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

      this.$store.watch(state => state.network.height, value => this.addLastReward())
    },

    async getTotal() {
      const delegates = await DelegateService.forged()
      delegates.forEach(delegate =>
        this.forged += delegate.forged
      )
    },

    async addLastReward() {
      const block = await BlockService.last()
      this.forged += Number(block.totalForged)
    }
  },
}
</script>
