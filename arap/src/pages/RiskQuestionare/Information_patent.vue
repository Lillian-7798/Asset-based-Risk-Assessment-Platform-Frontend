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
            Questionnaire for {{ this.$route.query.name }}
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
                    1. Are patent applications filed under PCT for international protection?
                  </el-text>
                  <el-select
                    v-model="Q1Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q1Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Missing PCT filings limit international patent protection and market opportunities.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Is a patent troll monitoring service employed?
                  </el-text>
                  <el-select
                    v-model="Q2Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q2Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>No monitoring increases vulnerability to litigation from patent assertion entities.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Are invention disclosures encrypted pre-filing?
                  </el-text>
                  <el-select
                    v-model="Q3Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q3Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Unencrypted disclosures risk premature exposure or theft of proprietary ideas.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Are patent maintenance fees tracked with reminders?
                  </el-text>
                  <el-select
                    v-model="Q4Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q4Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Untracked fees risk accidental patent expiration and loss of rights.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Are employees required to sign intellectual Property assignment agreements?
                  </el-text>
                  <el-select
                    v-model="Q5Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q5Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Missing agreements create ownership ambiguities for company inventions.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 6 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    6. Are patent claims reviewed by external counsel?
                  </el-text>
                  <el-select
                    v-model="Q6Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q6Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Unreviewed claims may have weak enforcement or loopholes.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 7 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    7. Is there a process for reporting potential infringements?
                  </el-text>
                  <el-select
                    v-model="Q7Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q7Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>No reporting system delays infringement detection and legal action.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 8 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    8. Are patent filing dates validated for priority claims?
                  </el-text>
                  <el-select
                    v-model="Q8Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q8Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Unvalidated dates risk losing priority rights in disputes.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 9 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    9. Are patent assets listed in an IP portfolio database?
                  </el-text>
                  <el-select
                    v-model="Q9Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q9Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Disorganized tracking hinders portfolio management and licensing opportunities.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 10 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    10. Are joint ownership terms clearly defined?
                  </el-text>
                  <el-select
                    v-model="Q10Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q10Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Undefined terms risk disputes over rights, licensing, or revenue sharing.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 11 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    11. Are foreign filing licenses obtained when required?
                  </el-text>
                  <el-select
                    v-model="Q11Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q11Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Missing licenses violate export controls and risk penalties.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
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
      initialData: {}, // To store initial state for change detection
      hasChanges: false, // Track if form has unsaved changes

      Q1Status: "",
      Q2Status: "",
      Q3Status: "",
      Q4Status: "",
      Q5Status: "",
      Q6Status: "",
      Q7Status: "",
      Q8Status: "",
      Q9Status: "",
      Q10Status: "",
      Q11Status: "",
    };
  },
  created() {
    // Load saved data when component is created
    this.loadQuestionnaireData();
    // Set up beforeunload event
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    // Clean up event listener
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
  watch: {
    // Watch all question status fields for changes
    Q1Status() { this.checkForChanges(); },
    Q2Status() { this.checkForChanges(); },
    Q3Status() { this.checkForChanges(); },
    Q4Status() { this.checkForChanges(); },
    Q5Status() { this.checkForChanges(); },
    Q6Status() { this.checkForChanges(); },
    Q7Status() { this.checkForChanges(); },
    Q8Status() { this.checkForChanges(); },
    Q9Status() { this.checkForChanges(); },
    Q10Status() { this.checkForChanges(); },
    Q11Status() { this.checkForChanges(); },
  },
  methods: {
    getEmptyState() {
      return {
        Q1Status: "",
        Q2Status: "",
        Q3Status: "",
        Q4Status: "",
        Q5Status: "",
        Q6Status: "",
        Q7Status: "",
        Q8Status: "",
        Q9Status: "",
        Q10Status: "",
        Q11Status: "",
      };
    },
    async loadQuestionnaireData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/questionnaire/load`, {
          params: {
            id: this.$route.query.id,
            type: "Patent"
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
        Q2Status: this.Q2Status,
        Q3Status: this.Q3Status,
        Q4Status: this.Q4Status,
        Q5Status: this.Q5Status,
        Q6Status: this.Q6Status,
        Q7Status: this.Q7Status,
        Q8Status: this.Q8Status,
        Q9Status: this.Q9Status,
        Q10Status: this.Q10Status,
        Q11Status: this.Q11Status,
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
        this.$router.back();
      } else {
        this.$router.push("/home/risk-assessment");
      }
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
        !this.Q5Status ||
        !this.Q6Status ||
        !this.Q7Status ||
        !this.Q8Status ||
        !this.Q9Status ||
        !this.Q10Status ||
        !this.Q11Status
      ) {
        this.$message.error("All fields from Q1 to Q11 must be filled!");
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
          Q2Status: this.Q2Status,
          Q3Status: this.Q3Status,
          Q4Status: this.Q4Status,
          Q5Status: this.Q5Status,
          Q6Status: this.Q6Status,
          Q7Status: this.Q7Status,
          Q8Status: this.Q8Status,
          Q9Status: this.Q9Status,
          Q10Status: this.Q10Status,
          Q11Status: this.Q11Status,
        };
        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,
            id: this.$route.query.id,
            type: "Patent",
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
          Q2Status: this.Q2Status,
          Q3Status: this.Q3Status,
          Q4Status: this.Q4Status,
          Q5Status: this.Q5Status,
          Q6Status: this.Q6Status,
          Q7Status: this.Q7Status,
          Q8Status: this.Q8Status,
          Q9Status: this.Q9Status,
          Q10Status: this.Q10Status,
          Q11Status: this.Q11Status,
        };

        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,
            id: this.$route.query.id,
            type: "Patent",
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