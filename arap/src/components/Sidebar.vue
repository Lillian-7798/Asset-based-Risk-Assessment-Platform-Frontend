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
        <el-sub-menu index="/home/risk-management">
          <template #title>
            <span class="text">Risk Management</span>
          </template>
          <el-menu-item class="sub-text" index="/home/risk-management">Risk Management</el-menu-item>
          <el-menu-item class="sub-text" index="/home/my-risk">My Risk</el-menu-item>
        </el-sub-menu>
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
    font-size: 20px;
}
.sub-text
{
  font-size: 17px;
  /* border: 1px; */
}
</style>