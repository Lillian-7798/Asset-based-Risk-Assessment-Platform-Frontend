<template>
  <div class="footer">
    <n-space justify="center">
      <n-text depth="3">© 2023 我的公司 版权所有</n-text>
    </n-space>
  </div>
</template>

<script>
import { NText, NSpace } from 'naive-ui'

export default {
  name:'AppFooter',
  components: { NText, NSpace }
}
</script>