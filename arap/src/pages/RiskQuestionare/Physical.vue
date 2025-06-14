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
                    Failure to register assets can lead to management confusion
                  </div>
                </el-col>
              </el-row>

              <!-- Question 1.1 -->
              <div v-if="Q1Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      1.1 Do the missing fields contain key information (e.g.,
                      asset ID, location)?
                    </el-text>
                    <el-select
                      v-model="Q1_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q1_1Status === 'No'" style="color: red">
                      Missing key information may affect tracking
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
                  <el-select
                    v-model="Q2Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Partial" value="AVERAGE" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q2Status === 'No' || Q2Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Failure to maintain may result in equipment failure
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
                    <el-select
                      v-model="Q2_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Insufficient resources"
                        value="Insufficient resources"
                      />
                      <el-option
                        label="Missing records"
                        value="Missing records"
                      />
                      <el-option label="Others" value="Others" />
                    </el-select>
                    <div
                      v-if="
                        Q2_1Status === 'Insufficient resources' ||
                        Q2_1Status == 'Missing records' ||
                        Q2_1Status == 'Others'
                      "
                      style="color: red"
                    >
                      Maintenance delays can hide bigger problems
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the associated software/firmware licensed and
                    version-compliant?
                  </el-text>
                  <el-select
                    v-model="Q3Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Not Sure" value="AVERAGE" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q3Status === 'No' || Q3Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Unauthorized software can lead to legal risks
                  </div>
                </el-col>
              </el-row>
              <!-- Question 3 -->

              <!-- Question 3.1 -->
              <div v-if="Q3Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      3.1 Is there a corrective action plan in place?
                    </el-text>
                    <el-select
                      v-model="Q3_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q3_1Status === 'No'" style="color: red">
                      No corrective action plan may lead to continued violations
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Does the current risk level of the asset match the actual
                    one?
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
                    Underestimation of risk levels can lead to insufficient
                    protection
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Is the physical storage location secure (e.g.,
                    surveillance, access control)?
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
                    Improper storage may result in theft or destruction
                  </div>
                </el-col>
              </el-row>
              <!-- Question 5 -->

              <!-- Question 5.1 -->
              <div v-if="Q5Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      5.1 Do you store sensitive data or high-value equipment?
                    </el-text>
                    <el-select
                      v-model="Q5_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q5_1Status === 'Yes'" style="color: red">
                      Exposure of sensitive data can lead to significant losses
                    </div>
                  </el-col>
                </el-row>
              </div>
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
        Q1_1Status: this.Q1_1Status,
        Q2Status: this.Q2Status,
        Q2_1Status: this.Q2_1Status,
        Q3Status: this.Q3Status,
        Q3_1Status: this.Q3_1Status,
        Q4Status: this.Q4Status,
        Q5Status: this.Q5Status,
        Q5_1Status: this.Q5_1Status,
      };

      let storedData = JSON.parse(localStorage.getItem("Qphysical")) || [];
      storedData.push(formData);
      localStorage.setItem("Qphysical", JSON.stringify(storedData));

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
