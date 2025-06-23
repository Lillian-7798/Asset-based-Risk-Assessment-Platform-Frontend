<template>
  <!-- 过滤条件弹出框 -->
  <el-dialog v-model="dialogVisible" title="Filtering" width="50%" :before-close="handleClose" :center="false">
    <el-row>
      <el-col :span="3" class="center-align">
        <el-text>Asset Type</el-text>
      </el-col>
      <el-col :span="8">
        <el-select v-model="filterParams.assetType" placeholder="Default" style="width: 95%; justify-content: left"
          clearable>
          <el-option v-for="item in AssetTypes" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4" class="center-align">
        <el-text>Any Empty Fields?</el-text>
      </el-col>
      <el-col :span="8">
        <el-select v-model="filterParams.emptyField" placeholder="Default" style="width: 95%; justify-content: left"
          clearable>
          <el-option v-for="item in EmptyFields" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
    <br />
    <el-row>
      <el-col :span="3" class="center-align">
        <el-text>Importance</el-text>
      </el-col>
      <el-col :span="8">
        <el-select v-model="filterParams.importance" placeholder="Default" style="width: 95%; justify-content: left"
          clearable>
          <el-option v-for="item in Importances" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4" class="center-align">
        <el-text>Status</el-text>
      </el-col>
      <el-col :span="8">
        <el-select v-model="filterParams.status" placeholder="Default" style="width: 95%; justify-content: left"
          clearable>
          <el-option v-for="item in Status" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="applyFilters">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 正常页面 -->
  <div class="container">
    <el-row>
      <el-col :span="12" style="display: flex; align-items: center; justify-content: left">
        <el-button type="primary" round @click="newAsset">
          <el-icon>
            <Plus />
          </el-icon>
          New</el-button>
      </el-col>
      <el-col :span="6" style="display: flex; align-items: center; justify-content: right">
        <el-icon style="margin-right: 10px" @click="toggleFilter" :color="isFilterActive ? '#409EFF' : ''">
          <Filter />
        </el-icon>
      </el-col>
      <el-col :span="6" style="display: flex; align-items: center; justify-content: right">
        <el-input v-model="searchInput" style="width: 100%; margin-right: 10px" placeholder="Please Input"
          :prefix-icon="Search" @change="search" clearable />
      </el-col>
    </el-row>
    <div class="table-container">
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="Date" width="200" />
          <el-table-column prop="name" label="Name" width="150">
            <template #default="{ row }">
              <router-link :to="{ path: '/NewAsset', query: { id: row.id, assetType: row.type} }"
                style="color: #409EFF; text-decoration: none">
                {{ row.name }}
              </router-link>
            </template>
          </el-table-column>
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
              <el-tag type="info" style="border: none" :color="getImportanceTagType(row.importance)" effect="dark">
                {{ row.importance }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="totalItems" :page-size="pageSize"
          :current-page="currentPage" @current-change="handlePageChange" />
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
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";
export default {
  data() {
    return {
      isSearchActive: false,
      searchInput: "",
      Search,
      dialogVisible: false,
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
      currentPage: 1,
      pageSize: 14,
      totalItems: 0,
      isFilterActive: false, // 新增：标记是否处于过滤状态
      originalPage: 1, // 新增：保存原始分页位置
      filterParams: { // 新增：存储过滤参数
        assetType: null,
        emptyField: null,
        importance: null,
        status: null
      }
    };
  },
  mounted() {
    this.fetchAssetsCount();
    this.fetchAllAssets();
  },
  methods: {
    search(){
      if (this.searchInput == '') {
        this.resetSearch();
      } else {
        // You can add debounce here if needed
        this.applySearch();
      }
    },
    async applySearch() {
      if (this.searchInput.trim() === '') {
        this.resetSearch();
        return;
      }

      this.isSearchActive = true;
      if(!this.isFilterActive){
        this.originalPage = this.currentPage;
      }else{
        this.isFilterActive = false;
      }
      this.currentPage = 1;
      this.fetchSearchCount();
      this.fetchAllAssets();
    },
    resetSearch() {
      if (this.isSearchActive) {
        this.isSearchActive = false;
        this.currentPage = this.originalPage;
        this.searchInput = '';
        this.fetchAssetsCount();
        this.fetchAllAssets();
      }
    },
    async applyFilters() {
      this.isFilterActive = true;
      this.originalPage = this.currentPage; // 保存当前页码
      this.currentPage = 1; // 重置为第一页
      this.fetchAllAssets();
      this.fetchFilterCount();
      this.dialogVisible = false;
    },
    async fetchSearchCount() {
      try {
        const response = await axios.get(`${API_BASE_URL}/asset/search_assets_count`, {
          params: {
            searchTerm: this.searchInput
          }
        });
        if (response.data.success) {
          this.totalItems = response.data.count;
        } else {
          console.error('获取搜索数量失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取搜索数量出错:', error);
        this.$message.error('获取搜索数量失败，请稍后重试');
      }
    },

    async fetchFilterCount() {
      console.log("Fileter Count")
      try {
        const response = await axios.get(`${API_BASE_URL}/asset/filter_assets_count`, {
          params: {
            assetType: this.filterParams.assetType,
            emptyField: this.filterParams.emptyField,
            importance: this.filterParams.importance,
            status: this.filterParams.status
          }
        });
        if (response.data.success) {
          console.log(response.data.count);
          this.totalItems = response.data.count;
        } else {
          console.error('获取资产数量失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取资产数量出错:', error);
        this.$message.error('获取资产数量失败，请稍后重试');
      }
    },
    resetFilters() {
      this.isFilterActive = false;
      this.currentPage = this.originalPage;
      this.filterParams = {
        assetType: null,
        emptyField: null,
        importance: null,
        status: null
      };
      this.fetchAssetsCount();
      this.fetchAllAssets();
    },
    async fetchAssetsCount() {
      console.log("Count")
      try {
        const response = await axios.get(`${API_BASE_URL}/asset/assets_count`);
        if (response.data.success) {
          console.log(response.data.count);
          this.totalItems = response.data.count;
        } else {
          console.error('获取资产数量失败:', response.data.message);
        }
      } catch (error) {
        console.error('获取资产数量出错:', error);
        this.$message.error('获取资产数量失败，请稍后重试');
      }
    },
    async fetchAllAssets() {
      try {
        const params = {
          page: this.currentPage - 1,
          size: this.pageSize
        };

        let endpoint = "/Allassets";

        if (this.isFilterActive) {
          Object.assign(params, {
            assetType: this.filterParams.assetType || "",
            emptyField: this.filterParams.emptyField || "",
            importance: this.filterParams.importance || "",
            status: this.filterParams.status || ""
          });
          endpoint = "/filteredAssets";
        } else if (this.isSearchActive) {
          Object.assign(params, {
            searchTerm: this.searchInput
          });
          endpoint = "/searchAssets";
        }

        const response = await axios.get(`${API_BASE_URL}/asset${endpoint}`, { params });
        if (response.data.success) {
          this.tableData = response.data.data.map(asset => ({
            id: asset.id,
            date: asset.dateAdded,
            name: asset.name,
            type: asset.assetType,
            owner: asset.assetOwner,
            emptyFields: asset.emptyFields,
            status: asset.status,
            importance: asset.importance
          }));
        }
      } catch (error) {
        console.error(error);
        this.$message.error('获取资产数据失败，请稍后重试');
      }
    },
    newAsset() {
      this.$router.push({
        path: "/NewAsset",
      });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchAssetsCount();
      this.fetchAllAssets();
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
    toggleFilter() {
      if (this.isFilterActive) {
        this.resetFilters();
      } else {
        this.dialogVisible = true;
      }
    },

    handleClose(done) {
      this.dialogVisible = false;
      done();
    }
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