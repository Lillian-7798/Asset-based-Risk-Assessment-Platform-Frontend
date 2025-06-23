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
        <el-text>Any Empty Fields?</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="EmptyField"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in EmptyFields"
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
        <el-text>Importance</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="Importance"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in Importances"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4" class="center-align">
        <el-text>Status</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="Statu"
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
        <el-button type="primary" round @click="newAsset">
          <el-icon>
            <Plus />
          </el-icon>
          New</el-button
        >
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
          <el-table-column prop="date" label="Date" width="100" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="type" label="Type" width="100" />
          <el-table-column prop="owner" label="Owner" width="200" />
          <el-table-column prop="emptyFields" label="EmptyFields" />
          <!-- Status 列 - 使用自定义模板 -->
          <el-table-column prop="status" label="Status">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)" effect="dark">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>

          <!-- Importance 列 - 使用自定义模板 -->
          <el-table-column prop="importance" label="Importance">
            <template #default="{ row }">
              <el-tag
                type="info"
                style="border: none"
                :color="getImportanceTagType(row.importance)"
                effect="dark"
              >
                {{ row.importance }}
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

  <!-- 1111111测试用 -->
  <!-- <el-button type="primary" round @click="handleShowAssets"
    >Show All Assets</el-button
  > -->
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
      EmptyFields: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
      Importances: [
        {
          value: "Extremely High",
          label: "Extremely High",
        },
        {
          value: "High",
          label: "High",
        },
        {
          value: "Medium",
          label: "Medium",
        },
        {
          value: "Low",
          label: "Low",
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

    // 将 localStorage 数据格式化并赋值给 tableData
    this.tableData = storedData.map((asset) => ({
      date: asset.timestamp, // 从 assets 中获取 dateAdded 字段
      name: asset.name,
      type: asset.AssetType, // 确保属性名称正确
      owner: asset.assetOwner,
      emptyFields: "No", // 目前没有 EmptyFields 字段默认为 "Yes"（之后补充改）
      status: asset.status,
      importance: asset.importance,
    }));
  },
  methods: {
    newAsset() {
      this.$router.push({
        path: "/NewAsset",
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
    getImportanceTagType(importance) {
      switch (importance) {
        case "Extremely High":
          return "#ED2826";
        case "High":
          return "#f56e6d";
        case "Medium":
          return "#e5a43e";
        case "Low":
          return "#4e9bff";
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
