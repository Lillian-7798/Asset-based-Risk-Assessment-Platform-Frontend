<template>
  <div class="header">
    <n-space justify="space-between" >
      <n-h1>我的应用</n-h1>
      <n-menu mode="horizontal" :options="menuOptions" />
    </n-space>
  </div>
</template>

<script>
import { NH1, NSpace, NMenu } from 'naive-ui'

export default {
  name:'AppHeader',
  components: { NH1, NSpace, NMenu },
  data() {
    return {
      menuOptions: [
        { label: '首页', key: 'home' },
        { label: '关于', key: 'about' }
      ]
    }
  }
}
</script>