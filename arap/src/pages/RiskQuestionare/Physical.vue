<template>
  <div>
    <Header />
    <div class="content">
      <!-- Confirm Dialog for unsaved changes -->
      <el-dialog v-model="showConfirmDialog" title="Warning" width="30%" :before-close="handleBeforeClose">
        <span>You have unsaved changes. Are you sure you want to leave?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showConfirmDialog = false">Cancel</el-button>
            <el-button type="primary" @click="confirmLeave">Leave Anyway</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- Content -->
      <div class="page-header">
        <div style="height: 20px"></div>
        <div class="header-content" style="display: flex; align-items: center">
          <el-button type="primary" round @click="handleBackClick" style="
              background-color: #409eff;
              color: white;
              border-color: #409eff;
            ">
            <el-icon>
              <ArrowLeft />
            </el-icon> Back
          </el-button>

          <el-text style="font-size: 20px; font-weight: bold; flex-grow: 1">
            Fixed Physical Asset Questionnaire
          </el-text>
        </div>
        <div style="height: 20px"></div>
      </div>

      <div class="sub-content">
        <el-scrollbar height="80vh">
          <div class="form-rows">
            <!-- Basic Info Section -->
            <div>
              <!-- Question 1 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    1. Are assets fully documented in the inventory system?
                  </el-text>
                  <el-select v-model="Q1Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ1Change">
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Question 1.1 -->
              <div v-if="Q1Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      1.1 Do the missing fields contain key information (e.g., asset ID, location)?
                    </el-text>
                    <el-select v-model="Q1_1Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q1_1Status === 'No'" style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Missing key information may affect tracking</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Is the asset performing maintenance as planned?
                  </el-text>
                  <el-select v-model="Q2Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ2Change">
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="AVERAGE" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q2Status === 'No' || Q2Status === 'AVERAGE'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to maintain may result in equipment failure</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2.1 -->
              <div v-if="Q2Status === 'No' || Q2Status == 'AVERAGE'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      2.1 What are the reasons for overdue maintenance?
                    </el-text>
                    <el-select v-model="Q2_1Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Insufficient resources" value="Insufficient resources" />
                      <el-option label="Missing records" value="Missing records" />
                      <el-option label="Others" value="Others" />
                    </el-select>
                    <div
                      v-if="Q2_1Status === 'Insufficient resources' || Q2_1Status == 'Missing records' || Q2_1Status == 'Others'"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Maintenance delays can hide bigger problems</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the associated software/firmware licensed and version-compliant?
                  </el-text>
                  <el-select v-model="Q3Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ3Change">
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Not Sure" value="AVERAGE" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q3Status === 'No' || Q3Status === 'AVERAGE'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Unauthorized software can lead to legal risks</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3.1 -->
              <div v-if="Q3Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      3.1 Is there a corrective action plan in place?
                    </el-text>
                    <el-select v-model="Q3_1Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q3_1Status === 'No'" style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>No corrective action plan may lead to continued violations</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Does the current risk level of the asset match the actual one?
                  </el-text>
                  <el-select v-model="Q4Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q4Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Underestimation of risk levels can lead to insufficient protection</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Is the physical storage location secure (e.g., surveillance, access control)?
                  </el-text>
                  <el-select v-model="Q5Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ5Change">
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q5Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Improper storage may result in theft or destruction</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 5.1 -->
              <div v-if="Q5Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      5.1 Do you store sensitive data or high-value equipment?
                    </el-text>
                    <el-select v-model="Q5_1Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q5_1Status === 'Yes'" style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Exposure of sensitive data can lead to significant losses</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>

            <el-divider class="divider" />
          </div>

          <el-row justify="center" align="middle">
            <!-- Save button -->
            <el-col :span="2">
              <el-button type="primary" round @click="handleSave" :loading="isSaving">
                Save
              </el-button>
            </el-col>

            <!-- Done button -->
            <el-col :span="2">
              <el-button type="success" round @click="handleDone" :loading="isSubmitting">
                Done
              </el-button>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "../../components/Footer.vue";
import Header from "../../components/Header.vue";
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      showConfirmDialog: false,
      leaveConfirmed: false,
      targetRoute: null,
      isSaving: false,
      isSubmitting: false,
      initialData: {},
      hasChanges: false,

      Q1Status: "",
      Q1_1Status: "",
      Q2Status: "",
      Q2_1Status: "",
      Q3Status: "",
      Q3_1Status: "",
      Q4Status: "",
      Q5Status: "",
      Q5_1Status: "",
    };
  },
  created() {
    this.loadQuestionnaireData();
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  watch: {
    Q1Status() { this.checkForChanges(); },
    Q1_1Status() { this.checkForChanges(); },
    Q2Status() { this.checkForChanges(); },
    Q2_1Status() { this.checkForChanges(); },
    Q3Status() { this.checkForChanges(); },
    Q3_1Status() { this.checkForChanges(); },
    Q4Status() { this.checkForChanges(); },
    Q5Status() { this.checkForChanges(); },
    Q5_1Status() { this.checkForChanges(); },
  },
  methods: {
    getEmptyState() {
      return {
        Q1Status: "",
        Q1_1Status: "",
        Q2Status: "",
        Q2_1Status: "",
        Q3Status: "",
        Q3_1Status: "",
        Q4Status: "",
        Q4_1Status: "",
        Q5Status: "",
        Q5_1Status: "",
      }
    },
    handleQ1Change(val) {
      if (val === 'Yes') {
        this.Q1_1Status = '';
      }
      this.checkForChanges();
    },
    handleQ2Change(val) {
      if (val === 'Yes') {
        this.Q2_1Status = '';
      }
      this.checkForChanges();
    },
    handleQ3Change(val) {
      if (val === 'Yes') {
        this.Q3_1Status = '';
      }
      this.checkForChanges();
    },
    handleQ5Change(val) {
      if (val === 'Yes') {
        this.Q5_1Status = '';
      }
      this.checkForChanges();
    },
    async loadQuestionnaireData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/questionnaire/load`, {
          params: {
            id: this.$route.query.id,
            type: "Physical"
          }
        });

        if (response.data.success && response.data.isload) {
          this.initialData = response.data.status;
          Object.keys(response.data.status).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(this, key)) {
              this[key] = response.data.status[key];
            }
          });
        } else {
          this.initialData = this.getEmptyState();
        }
      } catch (error) {
        console.error('Error loading questionnaire:', error);
        this.initialData = this.getEmptyState();
      }
    },
    checkForChanges() {
      const currentState = this.getCurrentState();
      function normalizedStringify(obj) {
        return JSON.stringify(obj, Object.keys(obj).sort());
      }

      const isEqual = normalizedStringify(currentState) === normalizedStringify(this.initialData);
      this.hasChanges = !isEqual;
    },
    getCurrentState() {
      return {
        Q1Status: this.Q1Status,
        Q1_1Status: this.Q1_1Status,
        Q2Status: this.Q2Status,
        Q2_1Status: this.Q2_1Status,
        Q3Status: this.Q3Status,
        Q3_1Status: this.Q3_1Status,
        Q4Status: this.Q4Status,
        Q5Status: this.Q5Status,
        Q5_1Status: this.Q5_1Status,
      };
    },
    handleBeforeUnload(event) {
      if (this.hasChanges) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    },
    goBack() {
      if (window.history.length > 1) {
        this.$router.back(); // 有历史记录则返回上一页
      } else {
        this.$router.push("/home/risk-assessment"); // 否则跳转到默认页
      }
    },
    handleClose() {
      this.showConfirmDialog = true;
    },
    handleBackClick() {
      if (this.hasChanges) {
        this.showConfirmDialog = true;
      } else {
        this.goBack();
      }
    },
    handleBeforeClose(done) {
      this.showConfirmDialog = false;
      done();
    },
    confirmLeave() {
      this.leaveConfirmed = true;
      this.showConfirmDialog = false;
      this.goBack();
    },
    validateForm() {
      if (
        !this.Q1Status ||
        !this.Q2Status ||
        !this.Q3Status ||
        !this.Q4Status ||
        !this.Q5Status
      ) {
        this.$message.error("All fields from Q1 to Q5 must be filled!");
        return false;
      }

      if (this.Q1Status === "No" && !this.Q1_1Status) {
        this.$message.error("Q1.1 cannot be empty when Q1 is 'No'");
        return false;
      }

      if ((this.Q2Status === "No" || this.Q2Status === "AVERAGE") && !this.Q2_1Status) {
        this.$message.error("Q2.1 cannot be empty when Q2 is 'No' or 'Partial'");
        return false;
      }

      if (this.Q3Status === "No" && !this.Q3_1Status) {
        this.$message.error("Q3.1 cannot be empty when Q3 is 'No'");
        return false;
      }

      if (this.Q5Status === "No" && !this.Q5_1Status) {
        this.$message.error("Q5.1 cannot be empty when Q5 is 'No'");
        return false;
      }

      return true;
    },
    async handleSave() {
      if (!this.validateForm()) return;

      this.isSaving = true;

      try {
        const answer = {
          Q1Status: this.Q1Status,
          Q1_1Status: this.Q1_1Status,
          Q2Status: this.Q2Status,
          Q2_1Status: this.Q2_1Status,
          Q3Status: this.Q3Status,
          Q3_1Status: this.Q3_1Status,
          Q4Status: this.Q4Status,
          Q5Status: this.Q5Status,
          Q5_1Status: this.Q5_1Status,
        };
        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,
            id: this.$route.query.id,
            type: "Physical",
            status: 0
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data.success) {
          this.$message.success('Questionnaire saved successfully!');
          this.initialData = JSON.parse(JSON.stringify(answer));
          this.hasChanges = false;
        } else {
          throw new Error('Failed to save questionnaire');
        }
      } catch (error) {
        console.error('Error saving questionnaire:', error);
        this.$message.error('Failed to save questionnaire');
      } finally {
        this.isSaving = false;
      }
    },
    async handleDone() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;

      try {
        const answer = {
          Q1Status: this.Q1Status,
          Q1_1Status: this.Q1_1Status,
          Q2Status: this.Q2Status,
          Q2_1Status: this.Q2_1Status,
          Q3Status: this.Q3Status,
          Q3_1Status: this.Q3_1Status,
          Q4Status: this.Q4Status,
          Q5Status: this.Q5Status,
          Q5_1Status: this.Q5_1Status,
        };

        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,
            id: this.$route.query.id,
            type: "Physical",
            status: 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data.success) {
          if (response.data.risk > 0) {
            this.$message.success(`Questionnaire submitted successfully with ${response.data.risk} new risks identified!`);
          } else {
            this.$message.success('Questionnaire submitted successfully with no new risks identified!');
          }

          this.initialData = JSON.parse(JSON.stringify(answer));
          this.hasChanges = false;
          this.goBack();
        } else {
          throw new Error('Failed to submit questionnaire');
        }
      } catch (error) {
        console.error('Error submitting questionnaire:', error);
        this.$message.error('Failed to submit questionnaire');
      } finally {
        this.isSubmitting = false;
      }
    }
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-col {
  padding-right: 20px;
}

.q-text {
  font-weight: bold;
  line-height: 35px;
  font-size: 15px;
  vertical-align: middle;
}

.el-divider {
  margin-top: 20px;
  margin-bottom: 20px;
}

.required-asterisk {
  color: red;
  margin-left: 5px;
}

.form-rows {
  width: 90%;
  margin: 0 auto;
}
</style>