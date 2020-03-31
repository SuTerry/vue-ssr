<template>
  <div>
    <h1>This is page A</h1>
    <h2>{{ env }}</h2>
  </div>
</template>

<script>
import api from '@api'

export default {
  title() {
    return 'A页面'
  },
  data() {
    return {
      env: 'aaaa'
    }
  },
  async asyncData() {
    return {
      a: '1'
    }
  },
  computed: {
  },
  async created() {

    const fetcher = this.$createFetcher(api.getUser)

    const res = await fetcher()

    this.env = res.data

    // try {
    //   const fetcher = this.$createFetcher(api.getUser)

    //   const res = await fetcher()

    //   this.env = res.data
    // } catch (error) {

    // }

  }
}
</script>
