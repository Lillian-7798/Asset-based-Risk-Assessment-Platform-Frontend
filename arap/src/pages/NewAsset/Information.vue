<template>
Information
</template>

<script>
export default {
}
</script>

<style scoped>
.center-align {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* 改为flex-end更规范 */
    padding-right: 15px;
}

.q-text {
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
    /* 防止标签换行 */
}
.required-asterisk {
  color: red;
  margin-left: 2px;
}
.divider {
  width: 95%;
  margin: 0px auto;
  border-color: #e6903f;
  border-width: 2px
}
</style>