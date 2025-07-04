<template>
  <el-dialog
      :title="`Risk Log: ${riskContent}`"
      :show-close="false"
      v-model="dialogVisible"
      width="70%"
      @close="handleClose"
      custom-class="log-dialog"


  >
    <div class="log-header">
      <p><strong>Current Status:</strong>
        <el-tag :type="statusTagType">{{ currentStatus }}</el-tag>
      </p>
    </div>

    <el-table
        :data="logs"
        style="width: 100%"
        height="400px"
        border
        stripe
        v-loading="loading"
    >
      <el-table-column
          prop="index"
          label="#"
          width="60"
          align="center"
      ></el-table-column>
      <el-table-column
          prop="time"
          label="Time"
          width="180"
      >
        <template #default="{row}">
          {{ formatDateTime(row.time) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="action"
          label="Action"
          width="120"
      >
        <template #default="{row}">
          <el-tag :type="getActionTagType(row.action)" size="small">
            {{ row.action }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="by"
          label="By"
      ></el-table-column>
      <el-table-column
          label="Details"
          width="150"
          align="center"
      >
        <template #default="{row}">
          <el-button
              v-if="row.action === 'Treated'"
              type="primary"
              size="mini"
              @click="handleViewDetails(row.rid)">Details</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'LogDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    riskContent: {
      type: String,
      default: ''
    },
    currentStatus: {
      type: String,
      default: ''
    },
    logs: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit('update:visible', value);
      }
    },
    statusTagType() {
      switch(this.currentStatus.toLowerCase()) {
        case 'completed': return 'success';
        case 'in-progress': return 'warning';
        default: return 'info';
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleViewDetails(rid) {
      this.$emit('view-details', rid);
    },
    formatDateTime(date) {
      return new Date(date).toLocaleString();
    },
    getActionTagType(action) {
      switch(action) {
        case 'Treated': return 'success';
        case 'Assigned': return 'primary';
        default: return 'info';
      }
    }
  }
}
</script>

<style scoped>
.log-header {
  margin-bottom: 20px;
  padding: 0 10px;
}

.log-header p {
  margin: 0;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 8px;
}

::v-deep .log-dialog {
  border-radius: 8px;
}

::v-deep .log-dialog .el-dialog__body {
  padding: 20px;
}
</style>