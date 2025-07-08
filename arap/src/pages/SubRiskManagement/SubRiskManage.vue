<template>
  <div class="risk-management-container">
    <Header />

    <div class="content">

      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <button class="back-button" @click="checkUnsavedChanges">
            ← Back
          </button>
          <h1 class="page-title">Risk Management for {{ assetName }}</h1>
          <div class="header-actions">
            <button
                class="save-all-button"
                @click="saveAllRisks"
                :disabled="!hasUnsavedChanges"
            >
              Save All Changes
            </button>
          </div>
        </div>
      </div>

      <div v-if="isNotOwner" class="owner-warning">
        <el-alert
            title="You are not this asset's owner, so you can't save the information."
            type="error"
            :closable="false"
            show-icon
        />
      </div>

      <!-- Risk Items List -->
      <div class="risk-container">
        <div
            v-for="(risk, index) in riskTypes"
            :key="index"
            class="risk-item"
            :class="{ 'has-error': showError(risk) }"
        >
          <div class="risk-content">
            <div class="risk-header">
              <h3 class="risk-title">Risk {{ index + 1 }}: {{ risk.content }}</h3>

            </div>
            <div class="risk-header">
              <h3 class="risk-warning">warning: {{ risk.warning }}</h3>
            </div>


            <div class="risk-controls">
              <div class="radio-group">
                <label>
                  <input
                      type="radio"
                      v-model="risk.applicable"
                      :value="1"
                      @change="markAsChanged(risk)"
                  > Applicable
                </label>
                <label>
                  <input
                      type="radio"
                      v-model="risk.applicable"
                      :value="0"
                      @change="markAsChanged(risk)"
                  > Not Applicable
                </label>
              </div>

              <textarea
                  v-model="risk.comments"
                  placeholder="Comments"
                  class="comments-input"
                  @input="markAsChanged(risk)"
                  rows="3"
                  style="width: 90%; max-width: 100%;"

              ></textarea>

              <div class="action-section">
                <div v-if="risk.applicable === 1" class="applicable-fields">
                  <div class="form-field">
                    <span class="required-field">Risk Owner:</span>
                    <!-- <input
                        v-model="risk.riskOwner"
                        placeholder="Risk Owner"
                        class="risk-owner-input"
                        :class="{ 'input-error': showError(risk, 'riskOwner') }"
                        @input="markAsChanged(risk)"
                    > -->
                    <el-autocomplete class="risk-owner-input"
                        :class="{ 'input-error': showError(risk, 'riskOwner') }" v-model="risk.riskOwner" :fetch-suggestions="querySearch"
                    placeholder="Risk Owner" @select="(item) => handleSelect(item, risk)" :trigger-on-focus="false"></el-autocomplete>
                  </div>

                  <div class="form-field due-date">
                    <span class="required-field">Due Date:</span>
                    <div style="flex: 1; margin-left: 10px;">
                      <el-date-picker
                          v-model="risk.dueDate"
                          type="date"
                          placeholder="Select due date"
                          style="width: 100%"
                          :class="{ 'input-error': showError(risk, 'dueDate') }"
                          @change="markAsChanged(risk)"
                          clearable
                      />
                    </div>
                  </div>

                </div>

                <button
                    class="log-button"
                    @click="showLogDialog(risk)"
                >
                  Log
                </button>
              </div>

              <div class="save-section">
                <button
                    class="save-button"
                    @click="saveRiskData(risk, false,index)"
                    :disabled="!canSave(risk) || risk.loading"
                >
                  Save Draft
                </button>

                <button
                    v-if="risk.applicable === 1"
                    class="complete-button"
                    @click="saveRiskData(risk, true,index)"
                    :disabled="!canSave(risk) || risk.loading"
                >
                  Mark as Complete
                </button>
              </div>

              <div v-if="showError(risk)" class="error-message">
                Please fill in all required fields
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Log Dialog -->
      <LogDialog
          v-model:visible="logDialogVisible"
          :risk-content="currentRiskContent"
          :current-status="currentRiskStatus"
          :logs="currentLogs"
          :loading="logLoading"
          @view-details="handleViewTreatmentDetails"
          @close="logDialogVisible = false"
      />

    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import LogDialog from "./LogDialog.vue";
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";

export default {
  name: 'SubRiskManagement',
  components: {
    Header,
    LogDialog
  },
  data() {
    return {
      assetId: '',
      assetName: '',
      assetOwner: '',
      riskTypes: [],
      hasUnsavedChanges: false,
      username: '',
      currentUserId: '',
      // Log Dialog相关状态
      logDialogVisible: false,
      currentLogs: [],
      currentRiskContent: '',
      currentRiskStatus: '',
      currentRiskTypeId: null,
      logLoading: false,
      isNotOwner: false, // 新增状态变量
    }
  },
  created() {
    this.getRouteParams();
    this.checkPermission();
    this.fetchRiskTypes();
  },
  methods: {
  querySearch(queryString, cb) {
      this.assetOwnerID = 0
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
          const response = await axios.get(API_BASE_URL + '/user/search', {
            params: { query: queryString }
          })
          if (response.data.success) {
            console.log(response.data)
            const results = response.data.users.map(user => ({
              value: user.name,
              id: user.id
            }))

            cb(results)
          }
        } catch (error) {
          console.error('搜索用户失败:', error)
          cb([])
        }
      }, 1000)
    },
    handleSelect(item,risk) {
      risk.riskOwner = item.value
      risk.riskOwnerID = item.id
      this.markAsChanged(risk)
    },
    getRouteParams() {
      this.assetId = this.$route.query.assetId;
      this.assetName = this.$route.query.name;
      this.assetOwner = this.$route.query.assetOwner;
    },
    checkPermission() {
      const user = sessionStorage.getItem('userData');
      console.log(user);
      console.log(this.assetOwner,this.assetId,this.assetName);

      if (!user) {
        console.error('Please login first');
        this.$router.push('/login');
        return;
      }

      const userData = JSON.parse(user);
      this.username = userData.username;
      this.currentUserId = userData.userId;
      console.log(this.username);

      if (this.username !== this.assetOwner) {
        this.isNotOwner = true;

      }
    },

    async fetchRiskTypes() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/risk-management/risk-types`, {
          params: { assetId: this.assetId }
        });

        if (response.data.success) {
          this.riskTypes = response.data.data.map(risk => ({
            typeid: risk.typeId,
            content: risk.content,
            warning: risk.warning,
            applicable: null,
            riskOwner: '',
            comments: '',
            dueDate: '',
            status: 'new',
            changed: false,
            loading: false,
            originalData: null
          }));
          console.log(response.data);

          await this.fetchValidRelationships();
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch risk types:', error);
        this.$message.error('Failed to load risk types: ' + error.message);
      }
    },

    // 获取有效风险关系数据(valid=2/1)
    async fetchValidRelationships() {
      try {
        // 并行获取所有风险类型的有效关系
        const requests = this.riskTypes.map(risk =>
            axios.get(`${API_BASE_URL}/api/risk-management/valid-relationships`, {
              params: {
                assetId: this.assetId,
                typeID: risk.typeid
              }
            })
        );

        const responses = await Promise.all(requests);
        console.log("valid:"+responses)
        // 更新风险类型数据
        responses.forEach((response, index) => {
          if (response.data.success && response.data.data) {
            const validData = response.data.data;
            const risk = this.riskTypes[index];

            // 更新前端输入框的值
            risk.applicable = validData.applicable ? 1 : 0;
            risk.riskOwner = validData.riskOwner || '';
            risk.comments = validData.comments || '';
            risk.dueDate = validData.dueDate || '';
            risk.status = validData.status === 'Treated' ? 'completed' : 'in-progress';

            console.log("riskOwner: " + validData.riskOwner);
          }

        });

      } catch (error) {
        console.error('Error fetching valid relationships:', error);
      }
    },

    async showLogDialog(risk) {
      try {
        this.logLoading = true;
        this.currentRiskContent = risk.content;
        this.currentRiskStatus = risk.status;
        this.currentRiskTypeId = risk.typeid;
        this.logDialogVisible = true;

        const response = await axios.get(`${API_BASE_URL}/api/risk-management/logs`, {
          params: {
            assetId: this.assetId,
            typeID: risk.typeid
          }
        });

        if (response.data.success) {
          console.log(response.data)
          this.currentRiskStatus = response.data.status
          this.currentLogs = response.data.data.map((log, index) => ({
            index: index + 1,
            time: log.dateTime,
            action: log.action,
            by: log.by,
            rid: log.id
          }));
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error('Error loading risk logs:', error);
        this.$message.error('Failed to load risk logs: ' + error.message);
        this.logDialogVisible = false;
      } finally {
        this.logLoading = false;
      }
    },

    async handleViewTreatmentDetails(rid) {
      try {
        const response = await axios.get(
            `${API_BASE_URL}/api/risk-management/treatment-details`,
            { params: { rid } }
        );

        if (response.data.success) {
          const details = response.data.data;

          console.log('完整响应数据:', response.data);

          this.$alert(
              `<div class="treatment-details">
              <p><strong>Treated By:</strong> ${details.treatedBy}</p>
              <p><strong>Time:</strong> ${new Date(details.treatedTime).toLocaleString()}</p>
              <p><strong>Risk Level:</strong> ${this.getRiskLevelText(details.riskLevel)}</p>
              <p><strong>Treatment Option:</strong> ${this.getTreatmentOptionText(details.treatmentOption)}</p>
              <p><strong>Comments:</strong></p>
              <div class="comments">${details.comments || 'No comments'}</div>
              ${details.evidence?.length ?
                  `<p><strong>Evidence (${details.evidence.length}):</strong></p>
                 <ul>${details.evidence.map(f => `<li>${f}</li>`).join('')}</ul>` :
                  '<p><strong>No evidence files</strong></p>'
              }
            </div>`,
              'Treatment Details',
              {
                dangerouslyUseHTMLString: true,
                customClass: 'treatment-details-alert',
                confirmButtonText: 'Close'
              }
          );
        }
      } catch (error) {
        this.$message.error(`Error loading details: ${error.message}`);
      }
    },
    getRiskLevelText(level) {
      // 直接返回后端提供的字符串
      return level || 'Unknown';
    },
    getTreatmentOptionText(option) {
      // 同样直接返回
      return option || 'Unknown';
    },


    determineRiskStatus(riskRelationship) {
      // 根据后端RiskRelationship对象确定状态
      if (!riskRelationship) return 'new';

      if (riskRelationship.valid === 2) {
        return riskRelationship.treatmentStatus === '1' ? 'Treated' : 'Assigned';
      } else if (riskRelationship.valid === 1) {
        return 'draft';
      }
      return 'new';
    },

    async showTreatmentDetails(rid) {
      try {
        const response = await axios.get(
            `${API_BASE_URL}/api/risk-management/treatment-details`,
            { params: { rid } }
        );

        if (response.data.success) {
          const details = response.data.data;
          let treatmentInfo = `=== Treatment Details ===\n\n`;
          treatmentInfo += `Treated By: ${details.treatedBy}\n`;
          treatmentInfo += `Treatment Time: ${new Date(details.treatedTime).toLocaleString()}\n`;
          treatmentInfo += `Risk Level: ${details.riskLevel}\n`;
          treatmentInfo += `Treatment Method: ${details.treatmentOption}\n\n`;
          treatmentInfo += `Comments:\n${details.comments}\n\n`;
          treatmentInfo += `Evidence Files:\n${details.evidence.join('\n')}`;

          this.$message.success(treatmentInfo);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        this.$message.error(`Error loading treatment details: ${error.message}`);
      }
    },

    markAsChanged(risk) {
      const currentData = JSON.stringify({
        applicable: risk.applicable,
        riskOwner: risk.riskOwner,
        riskOwnerID:risk.riskOwnerID || 0,
        comments: risk.comments,
        dueDate: risk.dueDate
      });

      risk.changed = currentData !== risk.originalData;
      this.hasUnsavedChanges = this.riskTypes.some(r => r.changed);
    },

    canSave(risk) {
      if (risk.applicable === 1) {
        return risk.riskOwner && risk.dueDate;
      }
      return true;
    },

    showError(risk, field = null) {
      if (risk.applicable !== 1) return false;

      if (field) {
        return risk.changed && !risk[field] && risk.applicable === 1;
      }
      return risk.changed && risk.applicable === 1 && (!risk.riskOwner || !risk.dueDate);
    },

    async saveRiskData(risk, isFinal,index) {
      risk.loading = true;

      if (!this.canSave(risk)) {
        this.$message.error('Please fill in all required fields');
        risk.loading = false;
        return;
      }
      
      if(risk.applicable === 1 && risk.riskOwnerID === undefined){
        this.$message.error('[Risk '+(index+1)+']: Can\'t set riskOwner; No such user');
        risk.loading = false;
        return;
      }

      try {
        // 准备符合后端要求的请求数据
        const requestData = {
          assetId: this.assetId, // 确保是字符串
          typeID: risk.typeid, // 注意字段名与后端一致
          applicable: risk.applicable === 1 ? "1" : "0", // 确保是字符串 "1"/"0"
          riskOwner: risk.riskOwner,
          comments: risk.comments,
          dueDate: risk.dueDate,
          isDone: isFinal,
          currentUserId: this.currentUserId// 直接使用布尔值
        };

        console.log(requestData);
        const response = await axios.post(
            `${API_BASE_URL}/api/risk-management/save-risk`,
            requestData,
            {
              headers: {
                // 'X-Current-User-ID': this.currentUserId,
                'Content-Type': 'application/json'
              }
            }
        );

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        this.$message.success(isFinal ? 'Risk marked as complete' : 'Draft saved successfully');

        // 更新原始数据和状态
        risk.originalData = JSON.stringify({
          applicable: risk.applicable,
          riskOwner: risk.riskOwner,
          comments: risk.comments,
          dueDate: risk.dueDate
        });
        console.log(risk);

        risk.changed = false;
        risk.status = isFinal ? 'completed' : 'draft';
        this.hasUnsavedChanges = this.riskTypes.some(r => r.changed);

      } catch (error) {
        console.error('Failed to save risk data:', error);
        this.$message.error('Failed to save risk data: ' + error.message);
      } finally {
        risk.loading = false;
      }
    },

    async saveAllRisks() {
      const unsavedRisks = this.riskTypes.filter(r => r.changed && this.canSave(r));

      if (unsavedRisks.length === 0) {
        this.$message.error('No changes to save');
        return;
      }

      if (!confirm(`Save all ${unsavedRisks.length} changes?`)) {
        return;
      }

      try {
        for (const risk of unsavedRisks) {
          await this.saveRiskData(risk, false);
        }

        this.$message.success('All changes saved successfully');
        this.hasUnsavedChanges = false;
      } catch (error) {
        console.error('Failed to save all risks:', error);
        this.$message.error('Failed to save all risks: ' + error.message);
      }
    },


    checkUnsavedChanges() {
      if (this.hasUnsavedChanges) {
        if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
          this.$router.go(-1);
        }
      } else {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style scoped>
.risk-management-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

.content {
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  margin-bottom: 30px;
  padding: 30px 0;
  border-bottom: 1px solid #eee;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  flex-grow: 1;
  margin: 0;
}

.header-actions {
  margin-left: auto;
}

.back-button, .save-all-button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
}

.save-all-button {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.save-all-button:disabled {
  background: #cccccc;
  border-color: #cccccc;
  cursor: not-allowed;
}

.risk-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.risk-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.risk-item.has-error {
  border-color: #ff4444;
}

.risk-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.risk-title {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.risk-warning {
  margin: 0;
  color: #ff4444;
  font-size: 13px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
}

.status-badge.completed {
  background-color: #4CAF50;
  color: white;
}

.status-badge.in-progress {
  background-color: #FFC107;
  color: black;
}

.risk-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.radio-group {
  display: flex;
  gap: 15px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.comments-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
}

.action-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.applicable-fields {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  flex-grow: 1;
}

.form-field {
  display: flex;
  align-items: center;
  gap: 20px;
}

.required-field::after {
  content: " *";
  color: #ff4444;
}

.risk-owner-input, input[type="date"] {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.input-error {
  border-color: #ff4444 !important;
}

.log-button, .save-button, .complete-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.log-button {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

.save-button {
  background: #FFC107;
  color: black;
  border-color: #FFC107;
}

.complete-button {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.save-section {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
}

.error-message {
  color: #ff4444;
  font-size: 12px;
  padding-top: 4px;
}
::v-deep .treatment-details-alert {
  width: 60%;
  max-width: 700px;
}


::v-deep .treatment-details-alert .el-message-box__content {
  padding-top: 15px;
}

.treatment-details p {
  margin: 8px 0;
}

.treatment-details .comments {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  margin: 8px 0;
}

.treatment-details ul {
  margin: 8px 0;
  padding-left: 20px;
}

.owner-warning {
  margin-bottom: 20px;
}

/* 如果需要调整 alert 样式 */
.owner-warning >>> .el-alert {
  border-radius: 4px;
}
</style>