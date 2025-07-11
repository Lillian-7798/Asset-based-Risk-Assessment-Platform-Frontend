<template>
  <el-row
    style="width: 100%; display: flex; justify-content: space-between"
    v-if="userLevel == 2"
  >
    <el-col
      :span="12"
      style="display: flex; align-items: center; justify-content: left"
    >
      <el-text style="font-size: 20px; font-weight: bold">
        Sorry, you do not have permission to view this interface.
      </el-text>
    </el-col>
  </el-row>
  <!-- 正常页面 -->

  <div class="container" v-if="userLevel !== 2">
    <el-row style="width: 100%; display: flex; justify-content: space-between">
      <el-col
        :span="12"
        style="display: flex; align-items: center; justify-content: left"
      >
        <el-text style="font-size: 20px; font-weight: bold">
          {{ auditProjectName }}
          <!-- 显示传递过来的 audit project name -->
        </el-text>
        <!-- 这个之后根据传入名字修改 -->
      </el-col>
      <el-col
        :span="6"
        style="
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-left: auto;
        "
      >
        <el-button
          type="primary"
          v-if="userLevel === 0"
          @click="toggleFilter"
          style="background-color: #409eff; color: white"
        >
          Terminate the Audit Project
        </el-button>
        <!-- 这个click后面的动作之后修改 -->
      </el-col>
    </el-row>
    <div class="table-container">
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%; font-size: 17px; font-weight: border"
        >
          <!-- <el-table-column prop="generate_date" label="Date" width="200" /> -->
          <el-table-column prop="generate_date" label="Date" width="200">
            <template #default="{ row }">
              <!-- 格式化日期并显示 -->
              {{ formatDate(row.generate_date) }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name" width="350">
            <template #default="{ row }">
              <!-- 为每一行的名称添加点击事件 -->
              <router-link
                :to="{
                  path: '../EvidenceChainDetail',
                  query: { name: row.name, id: row.id },
                }"
                style="color: #409eff; text-decoration: none"
              >
                {{ row.name }}
              </router-link>
            </template>
          </el-table-column>
          <!-- 这个是evidence name -->

          <el-table-column prop="asset_type" label="Type" width="200">
            <template #default="{ row }">
              <!-- xxxxx使用 getTypeName 方法将 asset_type 显示为对应的字符串 -->
              {{ row.asset_type }}
            </template>
          </el-table-column>

          <el-table-column prop="asset_owner" label="Owner" width="300" />
          <!-- Status 列 - 使用自定义模板 -->
          <el-table-column prop="asset_status" label="Audit Status">
            <template #default="{ row }">
              <el-tag :type="getStatusTagType(row.asset_status)" effect="dark">
                {{ row.asset_status }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 新增的 Remove 列 -->
          <el-table-column label="" width="200" v-if="userLevel === 0">
            <template #default="{ row }">
              <el-button size="small" type="danger" @click="removeRow(row)">
                Remove
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalItems"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
//import { Search } from "@element-plus/icons-vue";
import axios from "axios";
export default {
  data() {
    return {
      userLevel: 2, // 默认值，之后会从 sessionStorage 中获取
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
      pageSize: 12,
      totalItems: 0,
      originalPage: 1, // 新增：保存原始分页位置
      auditid: this.$route.query.auditid || 1, // 先默认是1，假设传递的 auditid,要上级页面给我
      auditProjectName:
        this.$route.query.auditProjectName || "Default Project Name", // 获取传递的参数
    };
  },
  mounted() {

    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

    // 输出 userData 和 userLevel 进行调试
    console.log("userData:", userData);

    // 如果 userLevel 存在，则使用 userLevel，否则使用默认值 2
    this.userLevel = userData.userLevel !== undefined ? userData.userLevel : 2;

    console.log("userLevel:", this.userLevel); // 输出 userLevel

    this.fetchTableData();
  },
  methods: {
    formatDate(dateString) {
      // 如果传入的日期字符串为空或无效，直接返回 "Invalid Date"
      if (!dateString) {
        return "Invalid Date";
      }

      // 如果传入的日期字符串包含毫秒部分，去掉它
      const cleanedDateString = dateString.split(".")[0]; // 去除毫秒部分
      const date = new Date(cleanedDateString); // 将时间字符串转换为 Date 对象

      // 检查 Date 是否有效
      if (isNaN(date)) {
        return "Invalid Date"; // 如果解析失败，返回 "Invalid Date"
      }

      // 调整时区，假设是 UTC+8，手动加 8 小时
      date.setHours(date.getHours() + 8); // 加上 8 小时

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 补充 0
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");

      // 返回格式化后的日期字符串
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    // 根据 asset_type 显示类型名称
    getTypeName(type) {
      const typeInt = parseInt(type, 10); // 将 type 转换为整数
      switch (typeInt) {
        case 0:
          return "Software";
        case 1:
          return "Physical";
        case 2:
          return "Information";
        case 3:
          return "People";
        default:
          return "Unknown"; // 默认值，如果没有匹配的类型
      }
    },
    // 删除行
    removeRow(row) {
      this.tableData = this.tableData.filter((item) => item.id !== row.id); //暂时的应该删除数据库中的
    },
    getStatusTagType(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Decommissioned":
          return "info";
      }
    },
    // 请求数据
    async fetchTableData() {
      console.log(this.auditid)
      axios
        .get(`http://localhost:8081/api/evidence_chain/${this.auditid}`)
        .then((response) => {
          console.log(response.data)
          // 根据返回的数据过滤，传递与传输的 auditid 相同的行数据
          this.tableData = response.data.filter(
            (item) => item.audit_project === this.auditid
          );
        })
        .catch((error) => {
          console.error("Error fetching table data:", error);
        });
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
