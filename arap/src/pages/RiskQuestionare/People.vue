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
            People Questionnaire
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
                    1. Is the employee's full name documented in the HR system?
                  </el-text>
                  <el-select v-model="Q1Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q1Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to document the employee's full name may lead to identification issues and mismanagement.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Are employee unique identifiers (e.g., Employee ID) properly documented and linked to their role?
                  </el-text>
                  <el-select v-model="Q2Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q2Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Missing or incorrect identifiers can cause data discrepancies and access control issues.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the employee's department recorded in the system?
                  </el-text>
                  <el-select v-model="Q3Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q3Status === 'No' || Q3Status === 'Partial'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to update department information may lead to misallocated resources or unauthorized access.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Is the employee's position or role clearly defined in the system?
                  </el-text>
                  <el-select v-model="Q4Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q4Status === 'No' || Q4Status === 'Partial'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Unclear job roles may cause internal confusion and security vulnerabilities.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Is the employee's position linked to their access permissions and security clearance?
                  </el-text>
                  <el-select v-model="Q5Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q5Status === 'No' || Q5Status === 'Partial'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Misaligned access control may grant unauthorized privileges to employees.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 6 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    6. Has the employee undergone security training relevant to their role?
                  </el-text>
                  <el-select v-model="Q6Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q6Status === 'No' || Q6Status === 'Partial'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Lack of relevant training can result in human errors or security breaches.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 7 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    7. Is the employee's security clearance documented and up-to-date?
                  </el-text>
                  <el-select v-model="Q7Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q7Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Outdated clearance can lead to security vulnerabilities and unauthorized data access.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 8 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    8. Is there a primary list of assets assigned to the employee?
                  </el-text>
                  <el-select v-model="Q8Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q8Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to maintain a list of primary assets may result in mismanagement and security risks.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 9 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    9. Is the purpose of each asset assigned to the employee documented?
                  </el-text>
                  <el-select v-model="Q9Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q9Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to document asset purposes can result in misallocation and security issues.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 10 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    10. Is the employee's responsibility for the assets clearly defined in the system?
                  </el-text>
                  <el-select v-model="Q10Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q10Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to define asset responsibilities can lead to confusion and accountability gaps.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 11 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    11. Is the employee's remote work agreement status documented and up-to-date?
                  </el-text>
                  <el-select v-model="Q11Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q11Status === 'No' || Q11Status === 'Partial'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to document remote work agreements can lead to security risks and regulatory non-compliance.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 12 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    12. Has the employee's access and asset data been audited in the last 12 months?
                  </el-text>
                  <el-select v-model="Q12Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q12Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to audit access and asset data regularly can result in untracked changes and security risks.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 13 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    13. Is the employee's security incident record accurately maintained?
                  </el-text>
                  <el-select v-model="Q13Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q13Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to maintain security incident records can delay incident response and post-event analysis.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 14 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    14. Are security incidents related to the employee regularly reviewed and analyzed?
                  </el-text>
                  <el-select v-model="Q14Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q14Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to review or analyze security incidents may lead to recurring issues.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 15 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    15. Is the employee's device and information access regularly reviewed and adjusted as necessary?
                  </el-text>
                  <el-select v-model="Q15Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q15Status === 'No' || Q15Status === 'Partial'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to regularly review and adjust access may lead to unnecessary security gaps.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 16 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    16. Is an approver defined for granting or modifying the employee's system access permissions?
                  </el-text>
                  <el-select v-model="Q16Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q16Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Lack of an access approver increases the risk of unauthorized access and security breaches.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 17 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    17. Does the employee regularly participate in security drills or simulated attack exercises?
                  </el-text>
                  <el-select v-model="Q17Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q17Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Lack of security drills may leave employees unprepared for real attacks.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 18 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    18. Is the employee fully aware of potential social engineering attacks and have strategies to respond?
                  </el-text>
                  <el-select v-model="Q18Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q18Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Lack of awareness of social engineering attacks can lead to information leakage or internal threats.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 19 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    19. Has the employee's access and asset data been updated promptly following role changes?
                  </el-text>
                  <el-select v-model="Q19Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q19Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to update access rights and asset data after role changes can cause unnecessary security risks.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 20 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    20. Is the employee's workplace recorded and aligned with their role and access permissions?
                  </el-text>
                  <el-select v-model="Q20Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q20Status === 'No'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Failure to record workplace may lead to improper resource allocation or access errors.</span>
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
      Q12Status: "",
      Q13Status: "",
      Q14Status: "",
      Q15Status: "",
      Q16Status: "",
      Q17Status: "",
      Q18Status: "",
      Q19Status: "",
      Q20Status: "",
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
    Q12Status() { this.checkForChanges(); },
    Q13Status() { this.checkForChanges(); },
    Q14Status() { this.checkForChanges(); },
    Q15Status() { this.checkForChanges(); },
    Q16Status() { this.checkForChanges(); },
    Q17Status() { this.checkForChanges(); },
    Q18Status() { this.checkForChanges(); },
    Q19Status() { this.checkForChanges(); },
    Q20Status() { this.checkForChanges(); },
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
        Q12Status: "",
        Q13Status: "",
        Q14Status: "",
        Q15Status: "",
        Q16Status: "",
        Q17Status: "",
        Q18Status: "",
        Q19Status: "",
        Q20Status: "",
      };
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
        Q12Status: this.Q12Status,
        Q13Status: this.Q13Status,
        Q14Status: this.Q14Status,
        Q15Status: this.Q15Status,
        Q16Status: this.Q16Status,
        Q17Status: this.Q17Status,
        Q18Status: this.Q18Status,
        Q19Status: this.Q19Status,
        Q20Status: this.Q20Status,
      };
    },
    handleBeforeUnload(event) {
      if (this.hasChanges) {
        event.preventDefault();
        event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    },
    goBack() {
      this.$router.push("/home/risk-assessment");
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
      // Validate all required fields
      const requiredFields = [
        'Q1Status', 'Q2Status', 'Q3Status', 'Q4Status', 'Q5Status',
        'Q6Status', 'Q7Status', 'Q8Status', 'Q9Status', 'Q10Status',
        'Q11Status', 'Q12Status', 'Q13Status', 'Q14Status', 'Q15Status',
        'Q16Status', 'Q17Status', 'Q18Status', 'Q19Status', 'Q20Status'
      ];

      for (const field of requiredFields) {
        if (!this[field]) {
          this.$message.error(`All fields must be filled!`);
          return false;
        }
      }
      return true;
    },
    async loadQuestionnaireData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/questionnaire/load`, {
          params: {
            id: this.$route.query.id,
            type: "People"
          }
        });

        if (response.data.success && response.data.isload) {
          // Save initial data
          this.initialData = response.data.status;
          
          // Set component state
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
    async handleSave() {
      if (!this.validateForm()) return;

      this.isSaving = true;

      try {
        const answer = this.getCurrentState();
        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,
            id: this.$route.query.id,
            type: "People",
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
          // Update initial data to reflect saved state
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
        const answer = this.getCurrentState();
        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,
            id: this.$route.query.id,
            type: "People",
            status: 1
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data.success) {
          // Handle risk relationships if returned from backend
          if (response.data.risk > 0) {
            this.$message.success(`Questionnaire submitted successfully with ${response.data.risk} new risks identified!`);
          } else {
            this.$message.success('Questionnaire submitted successfully with no new risks identified!');
          }

          // Update initial data to reflect submitted state
          this.initialData = JSON.parse(JSON.stringify(answer));
          this.hasChanges = false;

          // Optionally navigate away after successful submission
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