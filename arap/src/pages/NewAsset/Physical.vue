<template>
    <el-row>
        <el-col :span="1" />
        <el-col :span="2" class="center-align">
            <el-text class="q-text">Fixed Physical Asset?<span class="required-asterisk">*</span>:</el-text>
        </el-col>
        <el-col :span="7">
            <el-select v-model="Fixed" placeholder="Default" style="width: 95%;justify-content: left; " clearable>
                <el-option v-for="item in Fixed_op" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-col>
    </el-row>

    <!-- Fixed Pysical -->

     <!-- Yes -->
     <div v-if="Fixed === 'Yes'" class="conditional-content">
        <el-row>
            <el-col :span="1" />
            <el-col :span="2" class="center-align">
                <el-text class="q-text">Asset Category:</el-text>
            </el-col>
            <el-col :span="7">
                <el-select v-model="LicenseType" placeholder="Default" style="width: 95%;justify-content: left; "
                    clearable>
                    <el-option v-for="item in LicenseTypes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="2" class="center-align">
                <el-text class="q-text">License Number:</el-text>
            </el-col>
            <el-col :span="7">
                <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
            </el-col>
        </el-row>
     </div>

     <!-- No -->
     <div v-if="Fixed === 'Yes'" class="conditional-content">

     </div>

     <el-divider class="divider" />
</template>

<script>
export default {
    data(){
        return{
            Fixed:"",
            Fixed_op:[
                {
                    value:"Yes"
                },
                {
                    value:"No"
                }
            ]
        }
    }
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
.conditional-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>