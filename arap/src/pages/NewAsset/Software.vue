<template>
    <el-row>
        <el-col :span="1" />
        <el-col :span="2" class="center-align">
            <el-text class="q-text">Version<span class="required-asterisk">*</span>:</el-text>
        </el-col>
        <el-col :span="7">
            <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input" clearable />
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="1" />
        <el-col :span="2" class="center-align">
            <el-text class="q-text">Install Date<span class="required-asterisk">*</span>:</el-text>
        </el-col>
        <el-col :span="7">
            <el-date-picker style="width: 95%;justify-content: left;" v-model="value2" type="date"
                placeholder="Pick a day" :disabled-date="disabledDate" :shortcuts="shortcuts" :size="size" />
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="2" class="center-align">
            <el-text class="q-text"> Authorized Operating Systems<span class="required-asterisk">*</span>:</el-text>
        </el-col>
        <el-col :span="7">
            <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input" clearable />
        </el-col>
    </el-row>

    <el-divider class="divider" />

    <el-row>
        <el-col :span="1" />
        <el-col :span="2" class="center-align">
            <el-text class="q-text">External Supplied?<span class="required-asterisk">*</span>:</el-text>
        </el-col>
        <el-col :span="7">
            <el-select v-model="ESS" placeholder="Default" style="width: 95%;justify-content: left; " clearable>
                <el-option v-for="item in ESSs" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-col>
    </el-row>

    <!-- 当External Supplied为Yes时可见 -->
    <div v-if="ESS === 'Yes'" class="conditional-content">
        <el-row>
            <el-col :span="1" />
            <el-col :span="2" class="center-align">
                <el-text class="q-text">Manufacture:</el-text>
            </el-col>
            <el-col :span="7">
                <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="2" class="center-align">
                <el-text class="q-text">Service Type:</el-text>
            </el-col>
            <el-col :span="7">
                <el-select v-model="ServiceType" placeholder="Default" style="width: 95%;justify-content: left; "
                    clearable>
                    <el-option v-for="item in ServiceTypes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="1" />
            <el-col :span="2" class="center-align">
                <el-text class="q-text">License Type:</el-text>
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

        <el-row>
            <el-col :span="1" />
            <el-col :span="2" class="center-align">
                <el-text class="q-text">License Start Date:</el-text>
            </el-col>
            <el-col :span="7">
                <el-date-picker style="width: 95%;justify-content: left;" v-model="value2" type="date"
                    placeholder="Pick a day" :disabled-date="disabledDate" :shortcuts="shortcuts" :size="size" />
            </el-col>
            <el-col :span="2"></el-col>
            <el-col :span="2" class="center-align">
                <el-text class="q-text">License Expire Date:</el-text>
            </el-col>
            <el-col :span="7">
                <el-date-picker style="width: 95%;justify-content: left;" v-model="value2" type="date"
                    placeholder="Pick a day" :disabled-date="disabledDate" :shortcuts="shortcuts" :size="size" />
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="2" class="center-align">
                <el-text class="q-text"> Related Contract Number:</el-text>
            </el-col>
            <el-col :span="7">
                <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
            </el-col>
        </el-row>

    </div>

    <el-divider class="divider" />


</template>

<script>
export default {
    data() {
        return {
            shortcuts: [
                {
                    text: 'Today',
                    value: new Date(),
                },
                {
                    text: 'Yesterday',
                    value: () => {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        return date
                    },
                },
                {
                    text: 'A week ago',
                    value: () => {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        return date
                    },
                },
            ],
            ESS: "",
            ESSs: [
                {
                    value: 'Yes',
                    label: 'Yes',
                },
                {
                    value: 'No',
                    label: 'No',
                },
            ],
            ServiceType: "",
            ServiceTypes: [
                {
                    value: "SaaS",
                    label: "SaaS"
                }
            ],
            LicenseType: "",
            LicenseTypes: [
                {
                    value: "Permanent",
                    label: "Permanent"
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