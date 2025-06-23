<!-- 数据传输显示以及页面跳转等仅用于update3问卷界面的演示，需要更改 -->
<template>
  <!-- 过滤条件弹出框 -->
  <el-dialog
    v-model="dialogVisible"
    title="Filtering"
    width="50%"
    :before-close="handleClose"
    :center="false"
  >
    <el-row>
      <el-col :span="3" class="center-align">
        <el-text>Asset Type</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="AssetType"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in AssetTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4" class="center-align">
        <el-text>Questionaire Status</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="QStatus"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in QStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="3" class="center-align">
        <el-text>Asset Status</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="Status"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in Status"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 正常页面 -->
  <div class="container">
    <el-row>
      <el-col
        :span="12"
        style="display: flex; align-items: center; justify-content: left"
      >
        <!-- <el-button type="primary" round @click="newAsset">
          <el-icon>
            <Plus />
          </el-icon>
          New</el-button
        > -->
      </el-col>
      <el-col
        :span="6"
        style="display: flex; align-items: center; justify-content: right"
      >
        <el-icon style="margin-right: 10px" @click="dialogVisible = true">
          <Filter />
        </el-icon>
      </el-col>
      <el-col
        :span="6"
        style="display: flex; align-items: center; justify-content: right"
      >
        <el-input
          v-model="input2"
          style="width: 100%; margin-right: 10px"
          placeholder="Please Input"
          :prefix-icon="Search"
        />
      </el-col>
    </el-row>
    <div class="table-container">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="Date" width="120" />
          <el-table-column prop="name" label="Name" width="200">
            <template #default="{ row }">
              <!-- 添加点击事件跳转到software questionaire -->
              <el-link @click="goToSoftwarePage(row.name)">
                {{ row.name }}
              </el-link>
            </template>
          </el-table-column>

          <el-table-column prop="type" label="Type" width="120" />
          <el-table-column prop="owner" label="Owner" width="200" />
          <!-- Status 列 - 使用自定义模板 -->
          <el-table-column prop="status" label="Asset Status">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)" effect="dark">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- Qstatus 列 - 使用自定义模板 -->
          <el-table-column prop="QStatus" label="Questionaire Status">
            <template #default="{ row }">
              <el-tag
                type="info"
                style="border: none"
                :color="getQStatusTagType(row.Qstatus)"
                effect="dark"
              >
                {{ row.Qstatus }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      searchInput: "",
      Search,
      dialogVisible: false,
      AssetType: "",
      EmptyField: "",
      Importance: "",
      Statu: "",
      AssetTypes: [
        {
          value: "Software",
          label: "Software",
        },
        {
          value: "Physical",
          label: "Physical",
        },
        {
          value: "Information",
          label: "Information",
        },
        {
          value: "People",
          label: "People",
        },
      ],
      QStatus: [
        {
          value: "In-progress",
          label: "In-progress",
        },
        {
          value: "Finished",
          label: "Finished",
        },
      ],
      Status: [
        {
          value: "Active",
          label: "Active",
        },
        {
          value: "Decommissioned",
          label: "Decommissioned",
        },
      ],
      tableData: [],
    };
  },
  mounted() {
    // 从 localStorage 获取所有的 assets 数据
    let storedData = JSON.parse(localStorage.getItem("assets")) || [];

    // 从 localStorage 获取 Qsoftware 中的数据
    let qinformationdata =
      JSON.parse(localStorage.getItem("Qinformationdata")) || [];

    // 获取 Qsoftware 中最后一行的 Done 值
    let lastDoneStatus =
      qinformationdata.length > 0
        ? qinformationdata[qinformationdata.length - 1].Done
        : "In-progress";

    // 将 localStorage 数据格式化并赋值给 tableData
    this.tableData = storedData.map((asset) => ({
      date: asset.timestamp, // 从 assets 中获取 dateAdded 字段
      name: asset.name,
      type: asset.AssetType, // 确保属性名称正确
      owner: asset.assetOwner,
      status: asset.status,
      Qstatus: lastDoneStatus,
    }));
  },
  methods: {
    goToSoftwarePage(name) {
      const assets = JSON.parse(localStorage.getItem("assets"));

      // 获取第一行的 AssetType 和 informationAssetCategory
      const AssetType = assets[0].AssetType;
      const informationAssetCategory = assets[0].InformationAssetCategory;
      const encodedName = encodeURIComponent(name);

      // 通过 name 跳转到information_databasee界面（demo之后根据name和type跳转并显示数据）
      this.$router.push({
        path: `/RiskQuestionare/information_database`,
        query: {
          name: encodedName, // 将 name 作为查询参数传递
          AssetType: AssetType, // 传递 AssetType 参数
          informationAssetCategory: informationAssetCategory, // 传递 informationAssetCategory 参数
        },
      });
    },
    newAsset() {
      this.$router.push({
        path: "/risk-assessment",
      });
    },
    getStatusTagType(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Decommissioned":
          return "info";
      }
    },
    getQStatusTagType(importance) {
      switch (importance) {
        case "In-progress":
          return "orange";
        case "Finished":
          return "green";
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 或者使用 min-height: 100vh; 根据你的需求 */
}

.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}

.table {
  flex: 1;
  overflow: auto;
}

.pagination {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  /* background: white;
    border-top: 1px solid #eee;
    可选：添加顶部边框分隔 */
}

.center-align {
  display: flex;
  align-items: center;
  justify-content: left;
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
