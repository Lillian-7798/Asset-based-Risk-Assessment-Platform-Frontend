<!-- TODO:连接跳转到资产风险管理页面，并且只有当前用户是该资产拥有者的时候可以跳转 -->
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
          v-model="filterParams.assetType"
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
        <el-text>Risk Treatment Status</el-text>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="filterParams.rtstatus"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in RTStatus"
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
          v-model="filterParams.status"
          placeholder="Default"
          style="width: 95%; justify-content: left"
          clearable
        >
          <el-option
            v-for="item in AssetStatus"
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
        <el-button type="primary"  @click="applyFilters">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

    <!-- 正常页面 -->
    <div class="container">
        <el-row>
            <el-col :span="12" style="display: flex; align-items: center; justify-content: left;">
                <el-text style="font-size: 20px;font-weight: bold;">Risk Assessment Management</el-text>
            </el-col>
            <el-col :span="6" style="display: flex; align-items: center; justify-content: right;">
                <el-icon style="margin-right: 10px" @click="toggleFilter" :color="isFilterActive ? '#409EFF' : ''">
                    <Filter />
                </el-icon>
            </el-col>
            <el-col :span="6" style="display: flex; align-items: center; justify-content: right;">
                <el-input v-model="searchInput" style="width: 100%; margin-right: 10px" placeholder="Please Input"
                    :prefix-icon="Search" @change="search" clearable />
            </el-col>
        </el-row>
        <div class="table-container">
            <div class="table">
                <el-table :data="tableData" style="width: 100%; font-size: 17px; font-weight: lighter;"
                    :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
                    <el-table-column prop="date" label="Date" width="200" />
                    <el-table-column prop="name" label="Name" width="300">
                        <template #default="{ row }">
                            <router-link :to="{path:'/SubRiskManagement/SubRiskManage',
                             query:{ assetId: row.id,name: row.name,assetOwner: row.owner,  fromPage: currentPage}}"
                                style="color: #409EFF; text-decoration: none">
                                {{ row.name }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="Type" width="200" />
                    <el-table-column prop="owner" label="Owner" width="280" />
                    <!-- AssetStatus 列 - 使用自定义模板 -->
                    <el-table-column prop="AssetStatus" label="Asset Status">
                        <template #default="{ row }">
                            <el-tag :type="getStatusTagType(row.AssetStatus)" effect="dark" size="large"
                                class="bigger-tag">
                                {{ row.AssetStatus }}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <!-- Importance 列 - 使用自定义模板 -->
                    <el-table-column prop="RTStatus" label="Risk Treatment Status">
                        <template #default="{ row }">
                            <el-tag :type="getRTSTagType(row.RTStatus)" effect="dark" size="large"
                                class="bigger-tag">
                                {{ row.RTStatus }}
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
</template>

<script>
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";
export default {
    data() {
        return {
            userId:"",
            userLevel:"",
            isSearchActive: false,
            searchInput: "",
            Search,
            dialogVisible: false,
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
            RTStatus: [
                {
                    value: 'Finished',
                    label: 'Finished',
                },
                {
                    value: 'In-progress',
                    label: 'In-progress',
                },
            ],
            AssetStatus: [
                {
                    value: 'Active',
                    label: 'Active',
                },
                {
                    value: 'Decommissioned',
                    label: 'Decommissioned',
                },
            ],
            tableData: [],
            currentPage: 1,
            fromPage: '',
            pageSize: 12,
            totalItems: 0,
            isFilterActive: false, // 新增：标记是否处于过滤状态
            originalPage: 1, // 新增：保存原始分页位置
            filterParams: { // 新增：存储过滤参数
                assetType: null,
                status: null,
                rtstatus: null
            }
        }
    },
    mounted() {
      if (this.$route.query.page) {
        this.currentPage = parseInt(this.$route.query.page) || 1;
      }

        const userdata = JSON.parse(sessionStorage.getItem('userData'))
        this.userId = userdata.userId;
        this.userLevel = userdata.userLevel;
        this.fetchAssetsCount();
        this.fetchAllAssets();
    },
    methods: {
        search() {
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
            if (!this.isFilterActive) {
                this.originalPage = this.currentPage;
            } else {
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
                let response
                if(this.userLevel==0){
                    response = await axios.get(`${API_BASE_URL}/asset/search_assets_count`, {
                    params: {
                        searchTerm: this.searchInput,
                    }
                });
                }else{
                    response = await axios.get(`${API_BASE_URL}/asset/search_assets_count_2`, {
                    params: {
                        searchTerm: this.searchInput,
                        userId:this.userId
                    }
                });
                }
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
                const response = await axios.get(`${API_BASE_URL}/asset/filter_assets_count_3`, {
                    params: {
                        assetType: this.filterParams.assetType,
                        status: this.filterParams.status,
                        rtstatus: this.filterParams.rtstatus,
                        userId:this.userLevel ==0? 0:this.userId
                    }
                });
                if (response.data.success) {
                    // console.log(response.data.count);
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
                status: null,
                rtstatus: null
            };
            this.fetchAssetsCount();
            this.fetchAllAssets();
        },
        async fetchAssetsCount() {
            console.log("Count")
            try {
                const response = await axios.get(`${API_BASE_URL}/asset/assets_count_by_owner`,{
                    params:{
                        userId:this.userLevel ==0? 0:this.userId
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
        async fetchAllAssets() {
            try {
                const params = {
                    page: this.currentPage - 1,
                    size: this.pageSize,
                    userId:this.userLevel ==0? 0:this.userId
                };

                let endpoint = "/getAssetsByOwner";

                if (this.isFilterActive) {
                    Object.assign(params, {
                        assetType: this.filterParams.assetType || "",
                        status: this.filterParams.status || "",
                        rtstatus: this.filterParams.rtstatus || ""
                    });
                    endpoint = "/filteredAssets_3";
                } else if (this.isSearchActive) {
                    Object.assign(params, {
                        searchTerm: this.searchInput
                    });
                    if(this.userLevel==0) endpoint="/searchAssets"
                    else endpoint = "/searchAssetsByOwner";
                }

                const response = await axios.get(`${API_BASE_URL}/asset${endpoint}`, { params });
                if (response.data.success) {
                    console.log(response.data.data)
                    this.tableData = response.data.data.map(asset => ({
                        id: asset.id,
                        date: asset.dateAdded,
                        name: asset.name,
                        type: asset.assetType,
                        owner: asset.assetOwner,
                        AssetStatus: asset.status,
                        RTStatus: asset.rtstatus
                    }));
                }
            } catch (error) {
                console.error(error);
                this.$message.error('获取资产数据失败，请稍后重试');
            }
        },
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.$router.replace({
              query: { ...this.$route.query, page: newPage }
            });
            this.fetchAssetsCount();
            this.fetchAllAssets();
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
        },
        getStatusTagType(status) {
            switch (status) {
                case 'Active':
                    return 'success'
                case 'Decommissioned':
                    return 'info'
            }
        },
        getRTSTagType(importance) {
            switch (importance) {
                case 'Finished':
                    return 'success'
                case 'In-progress':
                    return 'warning'
            }
        }
    }
}
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
.bigger-tag {
    font-size: 15px;
    /* 调大字号 */
    padding: 8px 12px;
    /* 调整内边距（上下 左右） */
    font-weight: bold;
    /* 可选：加粗文字 */
}
</style>