<template>
  <div>
    <Header />
    <div class="content">
      <!-- Confirm Dialog -->
      <el-dialog v-model="showConfirmDialog" title="Warning" width="30%" :before-close="handleBeforeClose">
        <span>The inventory will not be saved, are you sure you want to exit?</span>
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
          <el-button type="primary" round @click="handleBackClick" style="
              background-color: #409eff;
              color: white;
              border-color: #409eff;
            ">
            <el-icon>
              <ArrowLeft />
            </el-icon> Back
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
                  <el-select v-model="Q1Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q1Status === 'No'" style="color: red">
                    WARNING: Sensitive data is unencrypted, risking exposure to
                    breaches.<br />
                    RISKS: Data breach, regulatory fines
                  </div>
                </el-col>
              </el-row>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Are database access logs retained for ≥90 days?
                  </el-text>
                  <el-select v-model="Q2Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q2Status === 'No'" style="color: red">
                    WARNING: Insufficient log retention hinders forensic
                    investigations and compliance. <br />
                    RISKS: Unable to trace breaches
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
                  <el-select v-model="Q3Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q3Status === 'No'" style="color: red">
                    WARNING: Admin accounts lack MFA, increasing risk of
                    unauthorized access.<br />
                    RISKS: Unauthorized privilege escalation
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
                  <el-select v-model="Q4Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q4Status === 'No'" style="color: red">
                    WARNING: Missing SQLi protections leave the database
                    vulnerable to attacks.<br />RISKS:Data corruption,
                    exfiltration
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5.Is database patching automated with SLA?
                    <el-tooltip class="item" effect="dark"
                      content="SLA (Service Level Agreement) defines the expected performance and response time for a service, such as fixing critical vulnerabilities within a set timeframe. Here, an SLA of 30 days for critical means critical database patches must be applied within 30 days to meet compliance or security standards."
                      placement="top">
                      <span style="
                          cursor: pointer;
                          vertical-align: middle;  /* 添加这行 */
                          font-size: 16px;
                          margin-left: 5px;
                        "><el-icon>
                          <InfoFilled />
                        </el-icon></span>
                    </el-tooltip>
                  </el-text>
                  <el-select v-model="Q5Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q5Status === 'No'" style="color: red">
                    WARNING: Delayed patching exposes databases to known
                    vulnerabilities.<br />
                    RISKS: Exploitable vulnerabilities
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
                  <el-select v-model="Q6Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q6Status === 'No'" style="color: red">
                    WARNING: Untested backups may fail during recovery, risking
                    data loss. <br />
                    RISKS:Failed disaster recovery
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
                  <el-select v-model="Q7Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q7Status === 'No'" style="color: red">
                    WARNING: PII in test environments violates privacy and
                    compliance.<br />
                    RISKS: GDPR non-compliance
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
                  <el-select v-model="Q8Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q8Status === 'No'" style="color: red">
                    WARNING: Lack of geo-isolation risks data loss in regional
                    outages.<br />
                    RISKS: Regional outage impact
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
                  <el-select v-model="Q9Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q9Status === 'No'" style="color: red">
                    WARNING: Unverified cloud vendors may have inadequate
                    security controls. <br />
                    RISKS: Third-party breaches
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
                  <el-select v-model="Q10Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q10Status === 'No'" style="color: red">
                    WARNING: Undocumented schemas complicate audits and data
                    governance.<br />
                    RISKS: Operational inefficiencies
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
                  <el-select v-model="Q11Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q11Status === 'No'" style="color: red">
                    WARNING: Unmasked sensitive data in test environments
                    increases exposure risk.<br />
                    RISKS: Test data leakage
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
                  <el-select v-model="Q12Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q12Status === 'No'" style="color: red">
                    WARNING: No account lockout allows brute-force attacks on
                    credentials.<br />RISKS: Brute force attacks
                  </div>
                </el-col>
              </el-row>
              <!-- Question 12 -->
            </div>

            <el-divider class="divider" />
          </div>

          <el-row justify="center" align="middle">
            <!-- Save button -->
            <el-col :span="2">
              <el-button type="primary" round @click="handleSave">Save</el-button>
            </el-col>

            <!-- Done button -->
            <el-col :span="2">
              <el-button type="success" round @click="handleDone">Done</el-button>
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
      if (window.history.length > 1) {
        this.$router.back(); // 有历史记录则返回上一页
      } else {
        this.$router.push("/home/risk-assessment");
      }
    },
    handleClose() {
      this.showConfirmDialog = true;
    },
    handleBackClick() {
      this.showConfirmDialog = true; // 显示确认弹窗
    },
    handleBeforeClose(done) {
      this.showConfirmDialog = false;
      done();
    },
    confirmLeave() {
      this.leaveConfirmed = true;
      this.showConfirmDialog = false;
      // 选择返回时执行此方法
      this.goBack(); // 调用 goBack 方法返回页面
    },
    async handleDone() {
      // 数据验证
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
        !this.Q11Status ||
        !this.Q12Status
      ) {
        alert("All fields from Q1 to Q12 must be filled!");
        return;
      }

      // 生成risks和warnings
      let risks = [];
      let warnings = [];

      // 问题1
      if (this.Q1Status === "No") {
        risks.push("Data breach, regulatory fines");
        warnings.push(
          "Sensitive data is unencrypted, risking exposure to breaches."
        );
      }

      // 问题2
      if (this.Q2Status === "No") {
        risks.push("Unable to trace breaches");
        warnings.push(
          "Insufficient log retention hinders forensic investigations and compliance."
        );
      }

      // 问题3
      if (this.Q3Status === "No") {
        risks.push("Unauthorized privilege escalation");
        warnings.push(
          "Admin accounts lack MFA, increasing risk of unauthorized access."
        );
      }

      // 问题4
      if (this.Q4Status === "No") {
        risks.push("Data corruption, exfiltration");
        warnings.push(
          "Missing SQLi protections leave the database vulnerable to attacks."
        );
      }

      // 问题5
      if (this.Q5Status === "No") {
        risks.push("Exploitable vulnerabilities");
        warnings.push(
          "Delayed patching exposes databases to known vulnerabilities."
        );
      }

      // 问题6
      if (this.Q6Status === "No") {
        risks.push("Failed disaster recovery");
        warnings.push(
          "Untested backups may fail during recovery, risking data loss."
        );
      }

      // 问题7
      if (this.Q7Status === "No") {
        risks.push("GDPR non-compliance");
        warnings.push(
          "PII in test environments violates privacy and compliance."
        );
      }

      // 问题8
      if (this.Q8Status === "No") {
        risks.push("Regional outage impact");
        warnings.push(
          "Lack of geo-isolation risks data loss in regional outages."
        );
      }

      // 问题9
      if (this.Q9Status === "No") {
        risks.push("Third-party breaches");
        warnings.push(
          "Unverified cloud vendors may have inadequate security controls."
        );
      }

      // 问题10
      if (this.Q10Status === "No") {
        risks.push("Operational inefficiencies");
        warnings.push(
          "Undocumented schemas complicate audits and data governance."
        );
      }

      // 问题11
      if (this.Q11Status === "No") {
        risks.push("Test data leakage");
        warnings.push(
          "Unmasked sensitive data in test environments increases exposure risk."
        );
      }

      // 问题12
      if (this.Q12Status === "No") {
        risks.push("Brute force attacks");
        warnings.push(
          "No account lockout allows brute-force attacks on credentials."
        );
      }

      // Done action
      const formData = {
        Q1: this.Q1Status,
        Q2: this.Q2Status,
        Q3: this.Q3Status,
        Q4: this.Q4Status,
        Q5: this.Q5Status,
        Q6: this.Q6Status,
        Q7: this.Q7Status,
        Q8: this.Q8Status,
        Q9: this.Q9Status,
        Q10: this.Q10Status,
        Q11: this.Q11Status,
        Q12: this.Q12Status,
        Q13: "",
        Q14: "",
        Q15: "",
        Q16: "",
        Q17: "",
        Q18: "",
        Q19: "",
        Q20: "",
        Q21: "",
        Q22: "",
        Q23: "",
        Q24: "",
        Q25: "",
        risks: risks.join(";"), // 合并所有风险
        warning: warnings.join(";"), // 合并所有警告

        //Done: "Finished", // 新增字段 Done，存储 "Finished"
        //这个done之后变成更新qstatus
      };
      // 生成risks和warnings

      let storedData =
        JSON.parse(localStorage.getItem("Qinformationdata")) || [];
      storedData.push(formData);
      localStorage.setItem("Qinformationdata", JSON.stringify(storedData));

      // POST 请求到后端
      try {
        const response = await axios.post(
          "http://localhost:8081/api/questionaire/save/3", //这个id是要换的，根据主界面传入的id来换，这里先展示1
          formData
        );
        console.log("Data sent to backend:", response.data); // 控制台显示后端响应
        alert("Data saved and sent to backend successfully!");
      } catch (error) {
        console.error("Error sending data to backend:", error);
        alert("Failed to send data to backend.");
      }

      // alert("Questionnaire is finished. All data has been successfully saved!");
    },
    async handleSave() {
      // 生成risks和warnings
      let risks = [];
      let warnings = [];

      // 问题1
      if (this.Q1Status === "No") {
        risks.push("Data breach, regulatory fines");
        warnings.push(
          "Sensitive data is unencrypted, risking exposure to breaches."
        );
      }

      // 问题2
      if (this.Q2Status === "No") {
        risks.push("Unable to trace breaches");
        warnings.push(
          "Insufficient log retention hinders forensic investigations and compliance."
        );
      }

      // 问题3
      if (this.Q3Status === "No") {
        risks.push("Unauthorized privilege escalation");
        warnings.push(
          "Admin accounts lack MFA, increasing risk of unauthorized access."
        );
      }

      // 问题4
      if (this.Q4Status === "No") {
        risks.push("Data corruption, exfiltration");
        warnings.push(
          "Missing SQLi protections leave the database vulnerable to attacks."
        );
      }

      // 问题5
      if (this.Q5Status === "No") {
        risks.push("Exploitable vulnerabilities");
        warnings.push(
          "Delayed patching exposes databases to known vulnerabilities."
        );
      }

      // 问题6
      if (this.Q6Status === "No") {
        risks.push("Failed disaster recovery");
        warnings.push(
          "Untested backups may fail during recovery, risking data loss."
        );
      }

      // 问题7
      if (this.Q7Status === "No") {
        risks.push("GDPR non-compliance");
        warnings.push(
          "PII in test environments violates privacy and compliance."
        );
      }

      // 问题8
      if (this.Q8Status === "No") {
        risks.push("Regional outage impact");
        warnings.push(
          "Lack of geo-isolation risks data loss in regional outages."
        );
      }

      // 问题9
      if (this.Q9Status === "No") {
        risks.push("Third-party breaches");
        warnings.push(
          "Unverified cloud vendors may have inadequate security controls."
        );
      }

      // 问题10
      if (this.Q10Status === "No") {
        risks.push("Operational inefficiencies");
        warnings.push(
          "Undocumented schemas complicate audits and data governance."
        );
      }

      // 问题11
      if (this.Q11Status === "No") {
        risks.push("Test data leakage");
        warnings.push(
          "Unmasked sensitive data in test environments increases exposure risk."
        );
      }

      // 问题12
      if (this.Q12Status === "No") {
        risks.push("Brute force attacks");
        warnings.push(
          "No account lockout allows brute-force attacks on credentials."
        );
      }

      const formData = {
        Q1: this.Q1Status,
        Q2: this.Q2Status,
        Q3: this.Q3Status,
        Q4: this.Q4Status,
        Q5: this.Q5Status,
        Q6: this.Q6Status,
        Q7: this.Q7Status,
        Q8: this.Q8Status,
        Q9: this.Q9Status,
        Q10: this.Q10Status,
        Q11: this.Q11Status,
        Q12: this.Q12Status,
        //Done: "In-progress", // 新增字段 Done
        risks: risks.join(";"), // 合并所有风险
        warning: warnings.join(";"), // 合并所有警告
      };

      let storedData =
        JSON.parse(localStorage.getItem("Qinformationdata")) || [];
      storedData.push(formData);
      localStorage.setItem("Qinformationdata", JSON.stringify(storedData));

      // POST 请求到后端
      try {
        const response = await axios.post(
          "http://localhost:8081/api/questionaire/save/3", //这个id是要换的，根据主界面传入的id来换，这里先展示1
          formData
        );
        console.log("Data sent to backend:", response.data); // 控制台显示后端响应
        alert("Data saved and sent to backend successfully!");
      } catch (error) {
        console.error("Error sending data to backend:", error);
        alert("Failed to send data to backend.");
      }

      // alert("Data saved successfully!");
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
