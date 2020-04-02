<template>
  <div>
    <router-view></router-view>
    <router-link :to="{ name: 'A' }" v-text="'to A'" />
    <router-link :to="{ name: 'B' }" v-text="'to B'" />
    <div class="store-example">
      <h1>h2</h1>
      <!-- <button @click="update">updateCount</button> -->
      <el-button icon="el-icon-search" @click="update">updateCount</el-button>
    </div>
  </div>
</template>

<script>
import '@css/common'
export default {
  name: 'App',
  metaInfo: {
    title: '默认标题'
  },
  data() {
    return {}
  },
  methods: {
    update() {
      alert(process.env.NODE_ENV)
    }
  }
}
</script>
