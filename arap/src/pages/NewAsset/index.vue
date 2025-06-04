<template>
  <div>
    <Header />
    <div class="content">
      <div class="page-header">
        <div class="header-content">
          <el-text style="font-size: 20px;font-weight: bold;">
            Add a New Inventory
          </el-text>
          <el-button type="primary" circle size="small">
            <el-icon size="20px">
              <Close />
            </el-icon>
          </el-button>
        </div>
      </div>
      <div class="sub-content">
        <el-scrollbar height="80vh">
          <div class="form-rows">
            <!-- Part 1 -->
            <div class="basicInfo-first">
              <el-row>
                <el-col :span="1" />
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Name<span class="required-asterisk">*</span>:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">AssetID:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="1" />
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Asset Type<span class="required-asterisk">*</span>:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="AssetType" placeholder="Default" style="width: 95%;justify-content: left;"
                    clearable>
                    <el-option v-for="item in AssetTypes" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="1" />
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Asset Owner<span class="required-asterisk">*</span>:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Contact:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-input style="width: 95%;justify-content: left;" v-model="input" placeholder="Please input"
                    clearable />
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="1" />
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Description:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-input style="width: 95%;justify-content: left;" v-model="textarea2"
                    :autosize="{ minRows: 3, maxRows: 8 }" type="textarea" placeholder="Please input" />
                </el-col>
              </el-row>

              <el-divider class="divider" />
            </div>

            <!-- 根据aasset type不同加载不同组件的问卷 -->
             <router-view></router-view>

            <!-- Part 2 -->
            <div class="basicInfo-second">
              <el-row>
                <el-col :span="1" />
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Status<span class="required-asterisk">*</span>:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="Statu" placeholder="Default" style="width: 95%;justify-content: left; " clearable>
                    <el-option v-for="item in Status" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Importance<span class="required-asterisk">*</span></el-text>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="Importance" placeholder="Default" style="width: 95%;justify-content: left;" clearable>
                    <el-option v-for="item in Importances" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="1" />
                <el-col :span="2" class="center-align">
                  <el-text class="q-text">Associated Assets:</el-text>
                </el-col>
                <el-col :span="7">
                  <el-input style="width: 95%;justify-content: left;" v-model="textarea2"
                    :autosize="{ minRows: 2, maxRows: 2 }" type="textarea" placeholder="Please input" />
                </el-col>
              </el-row>
            </div>
          </div>
          <el-button type="primary" round>Save</el-button>
        </el-scrollbar>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import { Close } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router'

export default {
  components: {
    Header,
    Footer,
  },
  setup() {
    const router = useRouter()
    
    return {
      watchAssetType(newVal) {
        if (newVal && newVal !== 'Default') {
          router.push(`/NewAsset/${newVal.toLowerCase()}`)
        } else {
          router.push('/NewAsset')
        }
      }
    }
  },
  watch: {
    AssetType(newVal) {
      this.watchAssetType(newVal)
    }
  },
  data() {
    return {
      Close,
      AssetType: "",
      Statu: "",
      Importance:"",
      AssetTypes: [
        {
          value: 'Software',
          label: 'Software',
        },
        {
          value: 'Physical',
          label: 'Physical',
        },
        {
          value: 'Information',
          label: 'Information',
        },
        {
          value: 'People',
          label: 'People',
        },
      ],
      Status: [
        {
          value: 'Active',
          label: 'Active',
        },
        {
          value: 'Decommissioned',
          label: 'Decommissioned',
        },
      ],
      Importances: [
        {
          value: 'Extremely High',
          label: 'Extremely High',
        },
        {
          value: 'High',
          label: 'High',
        },
        {
          value: 'Medium',
          label: 'Medium',
        },
        {
          value: 'Low',
          label: 'Low',
        },
      ],
    }
  }
}
</script>

<style scoped>
.page-header {
  height: 4vh;
  background-color: rgb(226, 225, 225);
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}

.sub-content {
  margin-top: 10px;
}

.form-rows {
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* 控制行间距 */
}

.divider {
  width: 95%;
  margin: 0px auto;
  border-color: #e6903f;
  border-width: 2px
}

.center-align {
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 改为flex-end更规范 */
  padding-right: 15px;
}

.q-text {
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap; /* 防止标签换行 */
}

.form-rows .el-row {
  margin-bottom: 20px; /* 统一行间距 */
  align-items: center; /* 垂直居中 */
}

.required-asterisk {
  color: red;
  margin-left: 2px;
}

.footer {
  background-color: #92A4BD;
  position: fixed;
  bottom: 0px;
  height: 5vh;
  width: 100%;
  margin: 0;
}

.content {
  margin-top: 8.5vh;
}
</style>