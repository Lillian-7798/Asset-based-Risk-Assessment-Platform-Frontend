<!-- todo:1.提权为审计员之后指定审计项目
        -->
<template>
  <!-- 删除确认对话框 -->
  <el-dialog v-model="deleteDialogVisible" title="Confirm Delete" width="30%">
    <div style="display: flex; justify-content: center; align-items: center">
      <el-icon style="width: 20px; color: darkorange; margin-right: 8px">
        <Warning />
      </el-icon>
      <el-text>Are you sure to delete user "{{ currentDeleteUser?.name }}"?</el-text>
    </div>
    <template #footer>
      <el-button @click="deleteDialogVisible = false">Cancel</el-button>
      <el-button type="danger" @click="executeDelete">Confirm Delete</el-button>
    </template>
  </el-dialog>

  <!-- 编辑权限对话框 -->
  <!-- <el-dialog v-model="editDialogVisible" title="Edit Permission" width="30%">
    <el-select v-model="selectedPermission" placeholder="Select permission">
      <el-option
        v-for="item in Permissions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <template #footer>
      <el-button @click="editDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="updatePermission">Confirm</el-button>
    </template>
  </el-dialog> -->

  <!-- 编辑权限对话框 -->
  <el-dialog v-model="editDialogVisible" title="Edit Permission" width="50%">
    <el-select v-model="selectedPermission" placeholder="Select permission">
      <el-option v-for="item in Permissions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <!-- 如果权限是Auditor，显示审计项目搜索框 -->
    <div v-if="selectedPermission === '1'">
      <!-- '1' corresponds to "Auditor" -->
      <br />
      <div v-if="searchAuditTerm.owner != ''" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>WARNING: The audit project already have auditor. The auditor is :{{ searchAuditTerm.owner }}</span>
                    </div>
                  </div>
      <el-autocomplete style="width: 100%" v-model="searchAuditTerm.name" :fetch-suggestions="querySearch"
        placeholder="Please enter audit project name" @select="handleSelect"
        :trigger-on-focus="false"></el-autocomplete>
      <!-- <el-autocomplete v-model="searchAuditTerm" placeholder="Search Audit Projects" clearable
        :fetch-suggestions="searchAuditProjects" :trigger-on-focus="false" :loading="loading" :debounce="300"
        @select="handleAuditProjectSelect" :max-suggestions="5">
        <template #prefix>
          <el-icon name="search" />
        </template>
      </el-autocomplete> -->
    </div>

    <template #footer>
      <el-button @click="editDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="updatePermission">Confirm</el-button>
    </template>
  </el-dialog>

  <!-- 过滤条件弹出框 -->
  <el-dialog v-model="dialogVisible" title="Filtering" width="50%" :before-close="handleClose" :center="false">
    <div style="height: 50%">
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="4" class="center-align">
          <el-text>Permission</el-text>
        </el-col>
        <el-col :span="8">
          <el-select v-model="permission" placeholder="Default" style="width: 95%; justify-content: left" clearable>
            <el-option v-for="item in Permissions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="applyFilters"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 正常页面 -->
  <div class="container">
    <el-row>
      <el-col :span="12" style="display: flex; align-items: center; justify-content: left">
        <el-text style="font-size: 20px; font-weight: bold">Admin/User Management</el-text>
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
        <el-table :data="tableData" style="width: 100%; font-size: 17px; font-weight: border"
          :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column prop="name" label="User Name" />
          <el-table-column prop="created_date" label="Created Date" />
          <el-table-column prop="permission" label="Permission" />
          <el-table-column label="Actions" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" size="large" :disabled="row.permission === 'Admin'"
                @click="showEditDialog(row)">Edit</el-button>
              <el-button link type="primary" size="large" :disabled="row.permission === 'Admin'"
                @click="confirmDelete(row)">Delete</el-button>
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
      loading: false, // 加载状态
      allAuditProjects: [], // 存储所有的审计项目
      selectedAuditProject: null, //新增：用户选择的审计项目
      filteredAuditProjects: [], //新增过滤后的审计项目列表
      searchAuditTerm: {
        name:"",
        auditprojectId:0,
        owner:""
    }, //新增，搜索词
      deleteDialogVisible: false, // 新增：删除对话框显示状态
      currentDeleteUser: null, // 新增：当前要删除的用户
      editDialogVisible: false,
      selectedPermission: "",
      currentEditingUser: null,
      isSearchActive: false,
      searchInput: "",
      Search,
      dialogVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 12,
      totalItems: 0,
      isFilterActive: false, // 新增：标记是否处于过滤状态
      originalPage: 1, // 新增：保存原始分页位置
      permission: "",
      Permissions: [
        {
          value: "0",
          label: "Admin",
        },
        {
          value: "1",
          label: "Auditor",
        },
        {
          value: "2",
          label: "General",
        },
      ],
    };
  },
  mounted() {
    this.fetchUsersCount();
    this.fetchAllUsers();
  },
  methods: {
    querySearch(queryString, cb) {
      this.searchAuditTerm.auditprojectId = 0
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
              owner:auditProject.owner,
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
      this.searchAuditTerm.name = item.value;
      this.searchAuditTerm.auditprojectId = item.id;
      this.searchAuditTerm.owner = item.owner;
    },
    // 显示编辑权限对话框
    showEditDialog(user) {
      this.currentEditingUser = user;
      this.selectedPermission = this.getPermissionValue(user.permission);
      //this.selectedAuditProject = user.auditProject || null;
      // this.fetchAuditProjects(); // 获取审计项目列表
      this.editDialogVisible = true;
    },

    // 更新权限
    async updatePermission() {
      try {
        console.log(this.currentEditingUser);
        const response = await axios.post(
          `${API_BASE_URL}/user/updatePermission`,
          new URLSearchParams({
            userId: this.currentEditingUser.id,
            permission: this.selectedPermission,
          })
        );

        if (response.data.success) {
          this.$message.success("Permission updated successfully");

          // 第二个请求：更新审计项目的 auditor 列
          if (this.selectedPermission === '1' && this.searchAuditTerm.auditprojectId!='') {
            const updateAuditResponse = await axios.post(
              `${API_BASE_URL}/api/updateauditproject/${this.searchAuditTerm.auditprojectId}/${this.currentEditingUser.id}`
            );

            if (updateAuditResponse.data.success) {
              this.$message.success("Audit project auditor updated successfully");
              this.searchAuditTerm.auditprojectId=0;
              this.searchAuditTerm.name = "",
              this.searchAuditTerm.owner = ""
            } else {
              this.$message.error(updateAuditResponse.data.message);
            }
            this.selectedAuditProject = null;
          }

          this.editDialogVisible = false;
          // 重新获取数据
          this.fetchUsersCount();
          this.fetchAllUsers();
        } else {
          this.$message.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        //this.$message.error("Failed to update permission");
      }
    },

    // 修改后的确认删除方法
    confirmDelete(user) {
      this.currentDeleteUser = user;
      this.deleteDialogVisible = true;
    },
    // 在 Vue.js 的方法中：
    async executeDelete() {
      try {
        const userId = this.currentDeleteUser.id;

        // 调用后端检查用户是否可以删除
        const canDeleteResponse = await axios.get(
          `${API_BASE_URL}/api/user/canDeleteUser`,
          {
            params: { userId: userId },
          }
        );

        if (canDeleteResponse.data.canDelete) {
          // 如果可以删除，则执行删除操作
          const response = await axios.delete(`${API_BASE_URL}/user/delete`, {
            params: { userId: this.currentDeleteUser.id },
          });

          if (response.data.success) {
            this.$message.success("User deleted successfully"); // 英文提示
            // 重新获取数据
            this.fetchUsersCount();
            this.fetchAllUsers();
          } else {
            this.$message.error(response.data.message);
          }
        } else {
          // 如果用户不能删除，显示错误消息
          this.$message.error(
            "This user is associated with an asset or an audit project and cannot be deleted."
          ); // 英文提示
        }
      } catch (error) {
        console.error(error);
        this.$message.error("Failed to delete user"); // 英文提示
      } finally {
        this.deleteDialogVisible = false;
      }
    },
    // 执行删除操作
    // async executeDelete() {
    //     try {
    //         const response = await axios.delete(`${API_BASE_URL}/user/delete`, {
    //             params: { userId: this.currentDeleteUser.id }
    //         });

    //         if (response.data.success) {
    //             this.$message.success('User deleted successfully');
    //             this.fetchAllUsers(); // 刷新列表
    //         } else {
    //             this.$message.error(response.data.message);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         this.$message.error('Failed to delete user');
    //     } finally {
    //         this.deleteDialogVisible = false;
    //     }
    // },
    // 将权限文本转换为值
    getPermissionValue(permissionText) {
      const permissionMap = {
        Admin: "0",
        Auditor: "1",
        General: "2",
      };
      return permissionMap[permissionText] || "";
    },
    search() {
      if (this.searchInput == "") {
        this.resetSearch();
      } else {
        // You can add debounce here if needed
        this.applySearch();
      }
    },
    async applySearch() {
      if (this.searchInput.trim() === "") {
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
      this.fetchAllUsers();
    },
    resetSearch() {
      if (this.isSearchActive) {
        this.isSearchActive = false;
        this.currentPage = this.originalPage;
        this.searchInput = "";
        this.fetchUsersCount();
        this.fetchAllUsers();
      }
    },
    async applyFilters() {
      this.isFilterActive = true;
      this.originalPage = this.currentPage; // 保存当前页码
      this.currentPage = 1; // 重置为第一页
      if (this.permission == "") {
        this.$message.error("Permission can not be empty!");
      } else {
        this.fetchAllUsers();
        this.fetchFilterCount();
        this.dialogVisible = false;
      }
    },
    async fetchSearchCount() {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/search_count`, {
          params: {
            searchTerm: this.searchInput,
          },
        });
        if (response.data.success) {
          this.totalItems = response.data.count;
        } else {
          console.error("获取搜索数量失败:", response.data.message);
        }
      } catch (error) {
        console.error("获取搜索数量出错:", error);
        this.$message.error("获取搜索数量失败，请稍后重试");
      }
    },

    async fetchFilterCount() {
      console.log("Fileter Count");
      try {
        const response = await axios.get(`${API_BASE_URL}/user/filter_count`, {
          params: {
            permission: this.permission,
          },
        });
        if (response.data.success) {
          console.log(response.data.count);
          this.totalItems = response.data.count;
        } else {
          console.error("获取用户数量失败:", response.data.message);
        }
      } catch (error) {
        console.error("获取用户数量出错:", error);
        this.$message.error("获取用户数量失败，请稍后重试");
      }
    },
    resetFilters() {
      this.isFilterActive = false;
      this.currentPage = this.originalPage;
      this.permission = "";
      this.fetchUsersCount();
      this.fetchAllUsers();
    },
    async fetchUsersCount() {
      console.log("Count");
      try {
        const response = await axios.get(`${API_BASE_URL}/user/users_count`);
        if (response.data.success) {
          console.log(response.data.count);
          this.totalItems = response.data.count;
        } else {
          console.error("获取用户数量失败:", response.data.message);
        }
      } catch (error) {
        console.error("获取用户数量出错:", error);
        this.$message.error("Failed to fetch users count. Please try aga");
      }
    },
    async fetchAllUsers() {
      try {
        const params = {
          page: this.currentPage - 1,
          size: this.pageSize,
        };

        let endpoint = "/getAllUsers";

        if (this.isFilterActive) {
          Object.assign(params, {
            permission: this.permission || "",
          });
          endpoint = "/filteredUsers";
        } else if (this.isSearchActive) {
          Object.assign(params, {
            searchTerm: this.searchInput,
          });
          endpoint = "/searchUsers";
        }

        const response = await axios.get(`${API_BASE_URL}/user${endpoint}`, {
          params,
        });
        if (response.data.success) {
          console.log(response.data);
          this.tableData = response.data.users.map((user) => ({
            id: user.id,
            name: user.name,
            created_date: user.created_date,
            permission: user.permission,
          }));
        }
      } catch (error) {
        console.error(error);
        this.$message.error("获取资产数据失败，请稍后重试");
      }
    },
    newAsset() {
      this.$router.push({
        path: "/NewAsset",
      });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchUsersCount();
      this.fetchAllUsers();
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

.bigger-tag {
  font-size: 15px;
  /* 调大字号 */
  padding: 8px 12px;
  /* 调整内边距（上下 左右） */
  font-weight: bold;
  /* 可选：加粗文字 */
}
</style>
