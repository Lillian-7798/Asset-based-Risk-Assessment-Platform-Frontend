<template>
    <el-col :span="3" class="side">
      <el-menu
        router
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#5c6268"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
        <el-menu-item  class = "text" index="/home/asset-inventory">
          <span>Asset Inventory</span>
        </el-menu-item>
        <el-menu-item class = "text" index="/home/risk-assessment">
          <span>Risk Assessment</span>
        </el-menu-item>
        <el-menu-item class = "text" index="/home/risk-management">
          <span>Risk Management</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods:{

    }
}
</script>

<style scoped>
.side{
    background-color: #5c6268;
}
.text{
    font-size: 18px;
}
</style>