<template>
  <!-- 创建新审计项目的弹窗 -->
  <el-dialog v-model="createModalVisible" title="Creating New Audit Project" width="40%" :center="true">
    <el-form>
      <el-form-item label="Project Name" required>
        <el-input v-model="newProjectName" placeholder="Enter project name"></el-input>
      </el-form-item>
      <el-form-item label="Auditor" required>
        <el-autocomplete
            v-model="auditorSearch"
            :fetch-suggestions="querySearch"
            placeholder="Search auditor (min 2 chars)"
            value-key="name"
          @select="handleAuditorSelect"
          clearable
          style="width: 100%"
          >
        <template #default="{ item }">
          <div>{{ item.name }}</div>
        </template>
        </el-autocomplete>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelCreate">Cancel</el-button>
        <el-button type="primary" @click="createProject">Done</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 主页面 -->
  <div class="container">
    <el-row>
      <el-col :span="12" style="display: flex; align-items: center; justify-content: left">
        <h1 class="page-title">AuditProject</h1>
        <el-button
            v-if="showNewButton"
            type="primary"
            round
            @click="showCreateModal"
            style="margin-left: 20px"
        >
          <el-icon>
            <Plus />
          </el-icon>
          New
        </el-button>
      </el-col>
      <el-col :span="6" style="display: flex; align-items: center; justify-content: right">
        <el-icon style="margin-right: 10px" @click="toggleFilter" :color="isFilterActive ? '#409EFF' : ''">
          <Filter />
        </el-icon>
      </el-col>
      <el-col :span="6" style="display: flex; align-items: center; justify-content: right">
        <el-input v-model="searchInput" style="width: 100%; margin-right: 10px" placeholder="Search by Name or Created By"
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
              <router-link :to="{ path: '/auditdetail', query: { auditid: row.id, auditProjectName: row.name, fromPage: currentPage} }"
                           style="color: #409EFF; text-decoration: none">
                {{ row.name }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="createdBy" label="Created By" width="300" />
          <el-table-column prop="status" label="Status">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.status)" effect="dark" size="large" class="bigger-tag">
                {{ row.status }}
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

  <!-- 状态过滤弹窗 -->
  <el-dialog v-model="filterDialogVisible" title="Filter by Status" width="30%">
    <el-select v-model="filterParams.status" placeholder="Select status" style="width: 100%">
      <el-option label="All" value=""></el-option>
      <el-option label="In Progress" value="in-progress"></el-option>
      <el-option label="Finished" value="finished"></el-option>
    </el-select>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetFilters">Reset</el-button>
        <el-button type="primary" @click="applyFilters">Apply</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { Search, Plus, Filter } from "@element-plus/icons-vue";
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      Search,
      Plus,
      Filter,
      createModalVisible: false,
      filterDialogVisible: false,
      newProjectName: '',
      tableData: [],
      currentPage: 1,
      pageSize: 12,
      totalItems: 0,
      searchInput: "",
      isSearchActive: false,
      isFilterActive: false,
      originalPage: 1,
      userId: null,
      userLevel: null,
      showNewButton: false,
      currentUsername: null,
      filterParams: {
        status: ""
      },
      auditorSearch: '', // 搜索输入框绑定值
      selectedAuditor: null, // 存储选中的审计员
      searchTimeout: null // 防抖计时器
    };
  },
  mounted() {

    if (this.$route.query.page) {
      this.currentPage = parseInt(this.$route.query.page) || 1;
    }

    this.fetchProjectsCount();
    this.fetchAllProjects();
    this.checkUserLevel();
  },
  methods: {
    async querySearch(queryString, cb) {
      if (queryString.length < 2) {
        cb([])
        return
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/user/search-auditor`, {
          params: { query: queryString }
        })

        cb(res.data.users.map(u => ({
          id: u.id,
          name: u.name,
          value: u.name, // 必须包含value字段
          level: u.level


        })))
      } catch (err) {
        console.error('搜索失败:', err)
        cb([])
      }
    },

    handleAuditorSelect(item) {
      if (item.level !== 1) {
        ElMessage.warning('Only Level 1 users can be selected as auditors');
        this.auditorSearch = '';
        this.selectedAuditor = null;
        return;
      }

      this.selectedAuditor = item // 存储完整对象

      this.auditorSearch = item.name // 更新输入框显示
    },

    checkUserLevel() {
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      if (userData) {
        this.userId = userData.userId;
        this.userLevel = userData.userLevel;
        this.showNewButton = this.userLevel === 0; // 只有userLevel为0时显示+New按钮
        this.currentUsername = userData.username; // 保存当前用户名
      } else {
        console.error('User data not found in sessionStorage');
        this.$router.push('/login');
      }
    },
    showCreateModal() {
      this.createModalVisible = true;
      this.newProjectName = '';
    },
    cancelCreate() {
      this.createModalVisible = false;
    },
    async createProject() {
      if (!this.newProjectName.trim()) {
        ElMessage.error('Please enter a project name');
        return;
      }
      if (!this.selectedAuditor || this.selectedAuditor.level !== 1) {
        ElMessage.error('Please select a valid auditor (Level 1)');
        return;
      }

      const user = sessionStorage.getItem('userData');
      if (!user) {
        console.error('Please login first');
        this.$router.push('/login');
        return;
      }

      const userData = JSON.parse(user);
      //const username = userData.username;
      //const userId = userData.userId;

      try {
        const requestData = {
          projectName: this.newProjectName,
          createdBy: userData.username,
          auditor: this.auditorSearch
        };

        console.log(requestData);


        const response = await axios.post(`${API_BASE_URL}/audit/create`, requestData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });


        if (response.data.success) {
          ElMessage.success('Project created successfully');
          this.createModalVisible = false;
          this.resetCreateForm();
          this.resetFilters();
          this.resetSearch();
          this.fetchProjectsCount();
          this.fetchAllProjects();
        } else {
          ElMessage.error(response.data.message || 'Failed to create project');
        }
      } catch (error) {
        console.error('Error creating project:', error);
        ElMessage.error('Failed to create project');
      }
    },

    // 重置表单
    resetCreateForm() {
      this.newProjectName = '';
      this.auditorSearch = '';
      this.selectedAuditor = null;
    },
    search() {
      if (this.searchInput === '') {
        this.resetSearch();
      } else {
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
      this.fetchAllProjects();
    },
    resetSearch() {
      if (this.isSearchActive) {
        this.isSearchActive = false;
        this.currentPage = this.originalPage;
        this.searchInput = '';
        this.fetchProjectsCount();
        this.fetchAllProjects();
      }
    },
    toggleFilter() {
      this.filterDialogVisible = true;
    },
    applyFilters() {
      this.isFilterActive = true;
      this.originalPage = this.currentPage;
      this.currentPage = 1;
     //
      this.fetchAllProjects();
      this.fetchFilterCount();
      this.filterDialogVisible = false;
    },
    resetFilters() {
      this.isFilterActive = false;
      this.filterParams.status = "";
      this.currentPage = this.originalPage;
      this.fetchProjectsCount();
      this.fetchAllProjects();
      this.filterDialogVisible = false;
    },
    async fetchProjectsCount() {
      try {
        const user = JSON.parse(sessionStorage.getItem('userData'));

        const response = await axios.get(`${API_BASE_URL}/audit/count`,{
          params:{
            userLevel: user.userLevel,
            userId: user.userId
          }
        });

        console.log(response);

        if (response.data.success) {
          this.totalItems = response.data.count;
          console.log(response);
        } else {
          console.error('Failed to get projects count:', response.data.message);
        }
      } catch (error) {
        console.error('Error getting projects count:', error);
        ElMessage.error('Failed to get projects count');
      }
    },
    async fetchSearchCount() {
      try {
        const user = JSON.parse(sessionStorage.getItem('userData'));

        const response = await axios.get(`${API_BASE_URL}/audit/search-count`, {
          params: {
            searchTerm: this.searchInput,
            userLevel: user.userLevel,
            userId: user.userId

          }
        });
        if (response.data.success) {
          this.totalItems = response.data.count;

        } else {
          console.error('Failed to get search count:', response.data.message);
        }
      } catch (error) {
        console.error('Error getting search count:', error);
        ElMessage.error('Failed to get search count');
      }
    },
    async fetchFilterCount() {
      try {
        const user = JSON.parse(sessionStorage.getItem('userData'));

        const response = await axios.get(`${API_BASE_URL}/audit/filter-count`, {
          params: {
            status: this.filterParams.status,
            userLevel: user.userLevel,
            userId: user.userId
          }
        });
        console.log(this.filterParams.status);
        if(this.filterParams.status === "") {
          this.resetCreateForm();
          this.resetFilters();
          this.resetSearch();
        }

        if (response.data.success) {
          this.totalItems = response.data.count;

          console.log(response);

        } else {
          console.error('Failed to get filter count:', response.data.message);
        }
      } catch (error) {
        console.error('Error getting filter count:', error);
        ElMessage.error('Failed to get filter count');
      }
    },

    async fetchAllProjects() {
      try {
        const user = JSON.parse(sessionStorage.getItem('userData'));


        const params = {
          page: this.currentPage - 1,  // 后端通常从0开始计数
          size: this.pageSize,// 每页12条记录
          userId: user.userId,
          userLevel: user.userLevel,
        };

        let endpoint = "/list";

        if (this.isFilterActive) {
          Object.assign(params, {
            status: this.filterParams.status || ""
          });
          endpoint = "/filter";
        } else if (this.isSearchActive) {
          Object.assign(params, {
            searchTerm: this.searchInput
          });
          endpoint = "/search";
        }

        const response = await axios.get(`${API_BASE_URL}/audit${endpoint}`, { params });

        if (response.data.success) {
          const user = JSON.parse(sessionStorage.getItem('userData'));
          const userId = user.userId;

          // 先过滤数据再分页
          const filteredData = response.data.data
              .map(project => ({
                id: project.id,
                date: project.date,
                name: project.name,
                createdBy: project.createdBy,
                status: project.status === "in-progress" ? "In Progress" : "Finished",
                auditorId: project.auditorId,
              }))
              .filter(project => {
                return this.userLevel === 0 ||
                   (this.userLevel === 1 && project.auditorId === userId);
            });

          // 确保分页正确
          this.tableData = filteredData;

          console.log(response.data.data);
          console.log(filteredData);

          // 更新总记录数
          if (this.isFilterActive) {
            await this.fetchFilterCount();
          } else if (this.isSearchActive) {
            await this.fetchSearchCount();
          } else {
            await this.fetchProjectsCount();
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        ElMessage.error('Failed to fetch projects');
      }
    },


    handlePageChange(newPage) {
      this.currentPage = newPage;
      // Update URL without creating new history entry
      this.$router.replace({
        query: { ...this.$route.query, page: newPage }
      });
      this.fetchAllProjects();
    },
    getStatusTagType(status) {
      switch (status) {
        case "In Progress":
          return "warning";
        case "Finished":
          return "success";
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
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
}

.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bigger-tag {
  font-size: 15px;
  padding: 8px 12px;
  font-weight: bold;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
.auditor-input {
  width: 100%;
}

/* 使输入框与项目名称输入框对齐 */
.el-form-item__content {
  width: 100%;
}

</style>