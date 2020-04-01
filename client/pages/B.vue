<template>
  <div>
    <h1>This is page B</h1>
  </div>
</template>

<script>
import a from '@js/common'

export default {
  computed: {
  },
  mounted() {
    a('b')
  },
}
</script>

