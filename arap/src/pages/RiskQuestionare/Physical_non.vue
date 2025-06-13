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
            Non-Fixed Physical Asset Questionnaire
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
                    1. Is data encryption enabled on the device?
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
                    Unencrypted devices can lead to data breaches
                  </div>
                </el-col>
              </el-row>

              <!-- Question 1.1 -->
              <div v-if="Q1Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      1.1 Does the device store sensitive data?
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
                      Sensitive data is at extremely high risk of not being
                      encrypted
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Does remote wipe support?
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
                    Failure to remotely wipe may result in data not being
                    reclaimable
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2.1 -->
              <div v-if="Q2Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      2.1 Is the device type easy to lose (e.g., phone, tablet)?
                    </el-text>
                    <el-select
                      v-model="Q2_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q2_1Status === 'No'" style="color: red">
                      Devices with high loss rates require stronger security
                      measures
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the current holder information accurate?
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
                    Liability may be unclear due to incorrect information on the
                    holder
                  </div>
                </el-col>
              </el-row>
              <!-- Question 3 -->

              <!-- Question 3.1 -->
              <div v-if="Q3Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      3.1 Is it more than 30 days after the deadline?
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
                      A long period of non-return can mean loss
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Is the device in good physical condition?
                  </el-text>
                  <el-select
                    v-model="Q4Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                    <el-option label="Minor damage" value="Minor damage" />
                  </el-select>
                  <div
                    v-if="Q4Status === 'No' || Q4Status == 'Minor damage'"
                    style="color: red"
                  >
                    Device damage may affect functionality or safety
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 4.1 -->
              <div v-if="Q4Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      4.1 Does the damage affect functionality or safety?
                    </el-text>
                    <el-select
                      v-model="Q4_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="Q4_1Status === 'No'" style="color: red">
                      Critical Functional Compromise Could Lead to Business
                      Disruption
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
      Q4_1Status: "",
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
        Q4_1Status: this.Q4_1Status,
      };

      let storedData = JSON.parse(localStorage.getItem("Qphysicalnon")) || [];
      storedData.push(formData);
      localStorage.setItem("Qphysicalnon", JSON.stringify(storedData));

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
