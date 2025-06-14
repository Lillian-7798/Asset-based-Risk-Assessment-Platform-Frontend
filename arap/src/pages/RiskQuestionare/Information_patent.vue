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
            Patent information Asset Questionnaire
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
                    1. Are patent applications filed under PCT for international
                    protection?
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
                    Missing PCT filings limit international patent protection
                    and market opportunities.
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
                    No monitoring increases vulnerability to litigation from
                    patent assertion entities.
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
                    Unencrypted disclosures risk premature exposure or theft of
                    proprietary ideas.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 3 -->

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
                    Untracked fees risk accidental patent expiration and loss of
                    rights.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Are employees required to sign ntellectual Property
                    assignment agreements?
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
                    Missing agreements create ownership ambiguities for company
                    inventions.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 5 -->

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
                    Unreviewed claims may have weak enforcement or loopholes.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 6 -->

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
                    No reporting system delays infringement detection and legal
                    action.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 7 -->

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
                    Unvalidated dates risk losing priority rights in disputes.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 8 -->

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
                    Disorganized tracking hinders portfolio management and
                    licensing opportunities.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 9 -->

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
                    Undefined terms risk disputes over rights, licensing, or
                    revenue sharing.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 10 -->

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
                    Missing licenses violate export controls and risk penalties.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 11 -->
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
      };

      let storedData =
        JSON.parse(localStorage.getItem("Qinformationdoc")) || [];
      storedData.push(formData);
      localStorage.setItem("Qinformationdoc", JSON.stringify(storedData));

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
