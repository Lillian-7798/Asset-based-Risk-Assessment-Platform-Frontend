<template>
  <div>
    <Header />
    <div class="content">
      <!-- Confirm Dialog -->
      <el-dialog
        v-model="showConfirmDialog"
        title="Warning"
        width="30%"
        :before-close="handleBeforeClose"
      >
        <span
          >The inventory will not be saved, are you sure you want to exit?</span
        >
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="showConfirmDialog = false">No</el-button>
            <el-button type="primary" @click="confirmLeave">Yes</el-button>
          </span>
        </template>
      </el-dialog>

      <!-- Content -->
      <div class="page-header">
        <div style="height: 20px"></div>
        <div class="header-content" style="display: flex; align-items: center">
          <!-- 返回按钮 -->
          <el-button
            type="primary"
            round
            @click="goBack"
            style="
              background-color: #409eff;
              color: white;
              border-color: #409eff;
            "
          >
            <el-icon><ArrowLeft /></el-icon> Back
          </el-button>

          <!-- 文字标题 -->
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
                    Failure to document the employee's full name may lead to
                    identification issues and mismanagement.
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Are employee unique identifiers (e.g., Employee ID)
                    properly documented and linked to their role?
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
                  <div v-if="whitelistedStatus === 'No'" style="color: red">
                    Missing or incorrect identifiers can cause data
                    discrepancies and access control issues.
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the employee's department recorded in the system?
                  </el-text>
                  <el-select
                    v-model="Q3Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q3Status === 'No' || Q3Status === 'Partial'"
                    style="color: red"
                  >
                    Failure to update department information may lead to
                    misallocated resources or unauthorized access.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 3 -->

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Is the employee's position or role clearly defined in the
                    system?
                  </el-text>
                  <el-select
                    v-model="Q4Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q4Status === 'No' || Q4Status === 'Partial'"
                    style="color: red"
                  >
                    Unclear job roles may cause internal confusion and security
                    vulnerabilities.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Is the employee's position linked to their access
                    permissions and security clearance?
                  </el-text>
                  <el-select
                    v-model="Q5Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q5Status === 'No' || Q5Status === 'Partial'"
                    style="color: red"
                  >
                    Misaligned access control may grant unauthorized privileges
                    to employees.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 5 -->

              <!-- Question 6 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    6. Has the employee undergone security training relevant to
                    their role?
                  </el-text>
                  <el-select
                    v-model="Q6Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q6Status === 'No' || Q6Status === 'Partial'"
                    style="color: red"
                  >
                    Lack of relevant training can result in human errors or
                    security breaches.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 6 -->

              <!-- Question 7 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    7. Is the employee's security clearance documented and
                    up-to-date?
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
                    Outdated clearance can lead to security vulnerabilities and
                    unauthorized data access.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 7 -->

              <!-- Question 8 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    8. Is there a primary list of assets assigned to the
                    employee?
                  </el-text>
                  <el-select
                    v-model="Q8Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q8Status === 'No'" style="color: red">
                    Failure to maintain a list of primary assets may result in
                    mismanagement and security risks.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 8 -->

              <!-- Question 9 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    9. Is the purpose of each asset assigned to the employee
                    documented?
                  </el-text>
                  <el-select
                    v-model="Q9Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q9Status === 'No'" style="color: red">
                    Failure to document asset purposes can result in
                    misallocation and security issues.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 9 -->

              <!-- Question 10 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    10. Is the employee's responsibility for the assets clearly
                    defined in the system?
                  </el-text>
                  <el-select
                    v-model="Q10Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q10Status === 'No'" style="color: red">
                    Failure to define asset responsibilities can lead to
                    confusion and accountability gaps.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 10 -->

              <!-- Question 11 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    11. Is the employee's remote work agreement status
                    documented and up-to-date?
                  </el-text>
                  <el-select
                    v-model="Q11Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label=" No" value="No" />
                  </el-select>
                  <div
                    v-if="Q11Status === 'No' || Q11Status === 'Partial'"
                    style="color: red"
                  >
                    Failure to document remote work agreements can lead to
                    security risks and regulatory non-compliance.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 11 -->

              <!-- Question 12 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    12. Has the employee's access and asset data been audited in
                    the last 12 months?
                  </el-text>
                  <el-select
                    v-model="Q12Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes" value="Yes" />

                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q12Status === 'No'" style="color: red">
                    Failure to audit access and asset data regularly can result
                    in untracked changes and security risks.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 12 -->

              <!-- Question 13 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    13. Is the employee's security incident record accurately
                    maintained?
                  </el-text>
                  <el-select
                    v-model="Q13Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes" value="Yes" />

                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q13Status === 'No'" style="color: red">
                    Failure to maintain security incident records can delay
                    incident response and post-event analysis.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 13 -->

              <!-- Question 14 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    14. Are security incidents related to the employee regularly
                    reviewed and analyzed?
                  </el-text>
                  <el-select
                    v-model="Q14Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q14Status === 'No'" style="color: red">
                    Failure to review or analyze security incidents may lead to
                    recurring issues.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 14 -->

              <!-- Question 15 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    15. Is the employee's device and information access
                    regularly reviewed and adjusted as necessary?
                  </el-text>
                  <el-select
                    v-model="Q15Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="Partial" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q15Status === 'No' || Q15Status === 'Partial'"
                    style="color: red"
                  >
                    Failure to regularly review and adjust access may lead to
                    unnecessary security gaps.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 15 -->

              <!-- Question 16 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    16. Is an approver defined for granting or modifying the
                    employee's system access permissions?
                  </el-text>
                  <el-select
                    v-model="Q16Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q16Status === 'No'" style="color: red">
                    Lack of an access approver increases the risk of
                    unauthorized access and security breaches.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 16 -->

              <!-- Question 17 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    17. Does the employee regularly participate in security
                    drills or simulated attack exercises?
                  </el-text>
                  <el-select
                    v-model="Q17Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q17Status === 'No'" style="color: red">
                    Lack of security drills may leave employees unprepared for
                    real attacks.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 17 -->

              <!-- Question 18 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    18. Is the employee fully aware of potential social
                    engineering attacks and have strategies to respond?
                  </el-text>
                  <el-select
                    v-model="Q18Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q18Status === 'No'" style="color: red">
                    Lack of awareness of social engineering attacks can lead to
                    information leakage or internal threats.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 18 -->

              <!-- Question 19 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    19. Has the employee's access and asset data been updated
                    promptly following role changes?
                  </el-text>
                  <el-select
                    v-model="Q19Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q19Status === 'No'" style="color: red">
                    Failure to update access rights and asset data after role
                    changes can cause unnecessary security risks.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 19 -->

              <!-- Question 20 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    20. Is the employee's workplace recorded and aligned with
                    their role and access permissions?
                  </el-text>
                  <el-select
                    v-model="Q20Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q20Status === 'No'" style="color: red">
                    Failure to record workplace may lead to improper resource
                    allocation or access errors.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 20 -->
            </div>

            <el-divider class="divider" />
          </div>

          <el-button type="primary" round @click="handleSave">Save</el-button>
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
  methods: {
    goBack() {
      this.$router.push("/home/asset-inventory");
    },
    handleClose() {
      this.showConfirmDialog = true;
    },
    handleBeforeClose(done) {
      this.showConfirmDialog = false;
      done();
    },
    confirmLeave() {
      this.leaveConfirmed = true;
      this.showConfirmDialog = false;
      if (this.targetRoute) {
        this.$router.push(this.targetRoute);
      } else {
        this.$router.go(-1);
      }
    },
    handleSave() {
      const formData = {
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

      let storedData = JSON.parse(localStorage.getItem("Qpeople")) || [];
      storedData.push(formData);
      localStorage.setItem("Qpeople", JSON.stringify(storedData));

      alert("Data saved successfully!");
    },
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
}

.el-divider {
  margin-top: 20px;
  margin-bottom: 20px;
}

.required-asterisk {
  color: red;
  margin-left: 5px;
}
</style>
