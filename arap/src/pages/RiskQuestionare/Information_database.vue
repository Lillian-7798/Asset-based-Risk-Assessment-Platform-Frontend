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
            Database information Asset Questionnaire
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
                    1. Is data encryption (AES-256+) applied to sensitive
                    fields?
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
                    Sensitive data is unencrypted, risking exposure to breaches.
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Are database access logs retained for ≥90 days?
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
                    Insufficient log retention hinders forensic investigations
                    and compliance.
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is multi-factor authentication (MFA) required for admin
                    access?
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
                    Admin accounts lack MFA, increasing risk of unauthorized
                    access.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 3 -->

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Are SQL injection protections implemented?
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
                    Missing SQLi protections leave the database vulnerable to
                    attacks.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5.Is database patching automated with SLA?
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
                    Delayed patching exposes databases to known vulnerabilities.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 5 -->

              <!-- Question 6 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    6. Are backups tested annually for restore capability?
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
                    Untested backups may fail during recovery, risking data
                    loss.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 6 -->

              <!-- Question 7 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    7. Is data anonymization used for PII in non-production
                    environments?
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
                    PII in test environments violates privacy and compliance.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 7 -->

              <!-- Question 8 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    8. Are database replicas geographically isolated?
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
                    Lack of geo-isolation risks data loss in regional outages.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 8 -->

              <!-- Question 9 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    9. Is vendor risk assessed for cloud databases?
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
                    Unverified cloud vendors may have inadequate security
                    controls.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 9 -->

              <!-- Question 10 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    10. Are database schemas documented with data lineage?
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
                    Undocumented schemas complicate audits and data governance.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 10 -->

              <!-- Question 11 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    11. Is sensitive data masked in test environments?
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
                    Unmasked sensitive data in test environments increases
                    exposure risk.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 11 -->

              <!-- Question 12 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    12. Are failed login attempts locked after 5 tries?
                  </el-text>
                  <el-select
                    v-model="Q12Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q12Status === 'No'" style="color: red">
                    No account lockout allows brute-force attacks on
                    credentials.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 12 -->
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
      };

      let storedData =
        JSON.parse(localStorage.getItem("Qinformationdata")) || [];
      storedData.push(formData);
      localStorage.setItem("Qinformationdata", JSON.stringify(storedData));

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
