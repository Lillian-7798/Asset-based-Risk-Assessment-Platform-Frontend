<template>
    <!-- 过滤条件弹出框 -->
    <el-dialog v-model="dialogVisible" title="Filtering" width="50%" :before-close="handleClose" :center="false">
        <el-row>
            <el-col :span="3" class="center-align">
                <el-text>Asset Type</el-text>
            </el-col>
            <el-col :span="8">
                <el-select v-model="filterParams.assetType" placeholder="Default"
                    style="width: 95%; justify-content: left" clearable>
                    <el-option v-for="item in AssetTypes" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="4" class="center-align">
                <el-text>Questionaire Status</el-text>
            </el-col>
            <el-col :span="8">
                <el-select v-model="filterParams.qstatus" placeholder="Default"
                    style="width: 95%; justify-content: left" clearable>
                    <el-option v-for="item in QuestionareStatus" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </el-col>
        </el-row>
        <br />
        <el-row>
            <el-col :span="3" class="center-align">
                <el-text>Asset Status</el-text>
            </el-col>
            <el-col :span="8">
                <el-select v-model="filterParams.status" placeholder="Default" style="width: 95%; justify-content: left"
                    clearable>
                    <el-option v-for="item in AssetStatus" :key="item.value" :label="item.label" :value="item.value" />
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

    <!-- Add to Audit Project Dialog -->
    <el-dialog v-model="auditProjectDialogVisible" title="Add to Audit Project" width="50%">
        <div style="width: 95%;">
            <el-row>
                <el-col :span="8" class="center-align">
                    <el-text>Select an Audit Project:</el-text>
                </el-col>
                <el-col :span="16">
                    <el-autocomplete style="width: 100%" v-model="auditProjectForm.name"
                        :fetch-suggestions="querySearch" placeholder="Please enter audit project name"
                        @select="handleSelect" :trigger-on-focus="false">
                    </el-autocomplete>
                </el-col>
            </el-row>
        </div>
        <el-form :model="auditProjectForm">
            <!-- <el-form-item label="Audit Project Name">
                <el-input v-model="auditProjectForm.name" placeholder="Please enter audit project name" />
            </el-form-item> -->
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="auditProjectDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="addToAuditProject">
                    Confirm
                </el-button>
            </div>
        </template>
    </el-dialog>


    <!-- 正常页面 -->
    <div class="container">
        <el-row>
            <el-col :span="12" style="display: flex; align-items: center; justify-content: left;">
                <el-text style="font-size: 20px;font-weight: bold;">Evidence Chain</el-text>
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
                <el-table :data="tableData" style="width: 100%; font-size: 17px; font-weight: border;"
                    :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
                    row-key="id" @expand-change="handleExpand" ref="tableRef">
                    <el-table-column prop="date" label="Date" width="200" />
                    <el-table-column prop="name" label="Name" width="300">
                        <template #default="{ row }">
                            <router-link :to="{ path: '/NewAsset', query: { id: row.id, assetType: row.type } }"
                                style="color: #409EFF; text-decoration: none">
                                {{ row.name }}
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="type" label="Type" width="150" />
                    <el-table-column prop="owner" label="Owner" width="200" />
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
                    <el-table-column prop="QuestionareStatus" label="Questionare Status">
                        <template #default="{ row }">
                            <el-tag :type="getQSTagType(row.QuestionareStatus)" effect="dark" size="large"
                                class="bigger-tag">
                                {{ row.QuestionareStatus }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template #default="{ row }">
                            <el-button type="primary" link @click="generateReport(row.id)">
                                Generate
                            </el-button>
                        </template>
                    </el-table-column>
                    <!-- 折叠面板展开 -->
                    <el-table-column type="expand">
                        <template #default="props">
                            <div class="expanded-panel">
                                <el-table :data="props.row.evidenceChains || []" :border="childBorder"
                                    class="inner-table" header-cell-class-name="custom-header"
                                    :header-cell-style="{ 'text-align': 'center' }"
                                    :cell-style="{ 'text-align': 'center' }" v-loading="loading[props.row.id]">

                                    <el-table-column label="Version" prop="name" width="500" />
                                    <el-table-column label="Generate Date" prop="generateDate" width="300" />
                                    <el-table-column label="Generate By" prop="generateby" width="300" />
                                    <el-table-column width="100">
                                        <template #default="{ row }">
                                            <el-button type="primary" link @click="viewReport(row.id)">
                                                View
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column>
                                        <template #default="{ row }">
                                            <el-button type="primary" link @click="openAddToAuditProjectDialog(row)"
                                                :disabled="row.isAdded">
                                                Add to Audit Project
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
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
            auditProjectDialogVisible: false,
            auditProjectForm: {
                name: '',
                evidenceChainId: null,
                auditprojectId: 0,
            },
            loading: {},
            evidenceChains: {},
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
            QuestionareStatus: [
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
            pageSize: 12,
            totalItems: 0,
            isFilterActive: false, // 新增：标记是否处于过滤状态
            originalPage: 1, // 新增：保存原始分页位置
            filterParams: { // 新增：存储过滤参数
                assetType: null,
                status: null,
                qstatus: null
            },
            userId: "",
            userName: ""
        }
    },
    mounted() {
        const userdata = JSON.parse(sessionStorage.getItem('userData'))
        this.userId = userdata.userId;
        this.userName = userdata.username
        this.fetchAssetsCount();
        this.fetchAllAssets();
    },
    methods: {
        querySearch(queryString, cb) {
            this.auditProjectForm.auditprojectId = 0
            if (queryString.length < 2) {
                cb([])
                return
            }

            // 防抖处理
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout)
            }

            this.searchTimeout = setTimeout(async () => {
                try {
                    const response = await axios.get(API_BASE_URL + '/audit/recommand', {
                        params: { query: queryString }
                    })
                    if (response.data.success) {
                        console.log(response.data)
                        const results = response.data.auditProjects.map(auditProject => ({
                            value: auditProject.name,
                            id: auditProject.id
                        }))

                        cb(results)
                    }
                } catch (error) {
                    console.error('搜索用户失败:', error)
                    cb([])
                }
            }, 1000)
        },

        handleSelect(item) {
            this.auditProjectForm.name = item.value;
            this.auditProjectForm.auditprojectId = item.id;
        },
        openAddToAuditProjectDialog(evidenceChain) {
            this.auditProjectForm = {
                name: '',
                evidenceChainId: evidenceChain.id,
                auditprojectId: 0
            };
            this.auditProjectDialogVisible = true;
        },
        async addToAuditProject() {
            console.log(this.auditProjectForm.auditprojectId)
            if (this.auditProjectForm.auditprojectId == "" || this.auditProjectForm.auditprojectId == 0) {
                this.$message.error('No such Audit Project!');
                return;
            }

            try {
                const response = await axios.post(`${API_BASE_URL}/evidence_chain/add_evidence_to_auditproject`, new URLSearchParams({
                    projectId: this.auditProjectForm.auditprojectId,
                    evidenceChainId: this.auditProjectForm.evidenceChainId
                }));

                console.log(response)
                if (response.data.success) {
                    this.$message.success('Evidence chain added to audit project successfully');
                    this.auditProjectDialogVisible = false;

                    // Find and update the specific evidence chain
                    for (const asset of this.tableData) {
                        if (asset.evidenceChains) {
                            const evidenceChain = asset.evidenceChains.find(
                                chain => chain.id === this.auditProjectForm.evidenceChainId
                            );

                            if (evidenceChain) {
                                // In Vue 3, directly assigning to a reactive property works
                                evidenceChain.isAdded = true;
                                break;
                            }
                        }
                    }
                } else {
                    this.$message.error(response.data.message);
                }
            } catch (error) {
                console.error('Error adding to audit project:', error);
                this.$message.error('Failed to add to audit project');
            }
        },
        async handleExpand(row, expandedRows) {
            const isExpanding = expandedRows.some(r => r.id === row.id);
            console.log('当前行:', row.id, '是否展开:', isExpanding);

            if (isExpanding) {
                await this.loadEvidenceChains(row);
            } else {
                row.evidenceChains = []; // 收起时清空数据
            }
        },

        async loadEvidenceChains(row) {
            try {
                this.loading = { ...this.loading, [row.id]: true };
                const { data } = await axios.get(`${API_BASE_URL}/evidence_chain/getall`, {
                    params: { assetId: row.id }
                });
                row.evidenceChains = data.data || [];
            } catch (error) {
                row.evidenceChains = [];
                console.error('加载证据链失败:', error);
            } finally {
                this.loading = { ...this.loading, [row.id]: false };
            }
        },
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
                const response = await axios.get(`${API_BASE_URL}/asset/filter_assets_count_2`, {
                    params: {
                        assetType: this.filterParams.assetType,
                        status: this.filterParams.status,
                        qstatus: this.filterParams.qstatus
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
                qstatus: null
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
                        status: this.filterParams.status || "",
                        qstatus: this.filterParams.qstatus || ""
                    });
                    endpoint = "/filteredAssets_2";
                } else if (this.isSearchActive) {
                    Object.assign(params, {
                        searchTerm: this.searchInput
                    });
                    endpoint = "/searchAssets";
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
                        QuestionareStatus: asset.qstatus
                    }));
                }
            } catch (error) {
                console.error(error);
                this.$message.error('获取资产数据失败，请稍后重试');
            }
        },
        handlePageChange(newPage) {
            this.currentPage = newPage;
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
        async generateReport(assetId) {
            try {
                // 1. 生成报告
                const response = await axios.post(
                    `${API_BASE_URL}/pdf/generate/${assetId}`,
                    null,
                    { headers: { 'X-Generated-By': this.userName } }
                );

                if (response.data.success) {
                    this.$message.success(response.data.message);

                    // 2. 处理目标行的展开状态
                    const table = this.$refs.tableRef;
                    console.log(table)
                    if (!table) return;

                    const expandedRows = table.store.states.expandRows.value;
                    const targetRow = this.tableData.find(row => row.id === assetId);

                    if (!targetRow) return;

                    // 检查目标行是否已展开
                    const isExpanded = expandedRows.some(row => row.id === assetId);

                    if (isExpanded) {
                        // 已展开：直接刷新数据
                        await this.loadEvidenceChains(targetRow);
                    } else {
                        // 未展开：先展开行再加载数据
                        table.toggleRowExpansion(targetRow, true);
                        // 注意：toggleRowExpansion会触发expand-change事件
                        // 所以数据加载会在handleExpand中处理
                    }
                } else {
                    this.$message.error(response.data.message);
                }
            } catch (error) {
                console.error('生成报告失败:', error);
                this.$message.error('生成证据链失败');
            }
        },
        // async fetchEvidenceChains(assetId) {
        //     try {
        //         const response = await axios.get(`${API_BASE_URL}/evidence_chain`, {
        //             params: { assetId }
        //         });
        //         this.$set(this.evidenceChains, assetId, response.data);
        //     } catch (error) {
        //         console.error('Error fetching evidence chains:', error);
        //     }
        // },
        viewReport(id) {
            // Get the latest evidence chain ID
            // const latestEvidenceChain = this.evidenceChains[assetId][0];
            this.$router.push({
                path: '/EvidenceChainDetail',
                query: { id: id }
            });
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
        getQSTagType(importance) {
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

/* 展开面板背景色 */
.expanded-panel {
    background-color: #fffbe6;
    /* 浅黄色背景 */
    padding: 10px;
    /* 添加一些内边距 */
}

/* 内部表格样式 */
.inner-table {
    width: 100%;
    font-size: 15px;
    background-color: #fffbe6;
    /* 与展开面板相同的背景色 */
    font-weight: border;
}

/* 自定义表头样式 */
:deep(.custom-header) {
    background-color: #fdf0ac !important;
    /* 表头使用稍深的黄色 */
    font-weight: bold;
}

/* 确保表格单元格也有背景色 */
:deep(.inner-table .el-table__body tr td.el-table__cell) {
    background-color: #fffbe6;
}
</style>