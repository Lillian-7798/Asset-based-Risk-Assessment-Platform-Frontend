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
            Software Questionnaire
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
                    1. Is the software authorized by the vendor?
                  </el-text>
                  <el-select
                    v-model="isAuthorized"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <!-- <div v-if="isAuthorized === 'No'" style="color: red">
                    Software unauthorized and wrong software status in
                    inventory.
                  </div> -->
                </el-col>
              </el-row>

              <!-- Question 1.1 -->
              <div v-if="isAuthorized === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      1.1 Is the software's status correctly updated in the
                      inventory?
                    </el-text>
                    <el-select
                      v-model="statusUpdated"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                    <div v-if="statusUpdated === 'No'" style="color: red">
                      Software unauthorized and wrong software status in
                      inventory.
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 2 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    2. Is the software explicitly whitelisted to ensure it's the
                    only authorized version allowed to run on endpoints?
                  </el-text>
                  <el-select
                    v-model="whitelistedStatus"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label="Yes, whitelisted with version control"
                      value="Whitelisted"
                    />
                    <el-option
                      label="Licensed but unwhitelisted"
                      value="Licensed"
                    />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="
                      whitelistedStatus === 'No' ||
                      whitelistedStatus === 'Licensed'
                    "
                    style="color: red"
                  >
                    Software is not whitelisted.
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the software automatically scanned for vulnerabilities
                    using an SCAP-compliant tool (e.g., OpenVAS, Nessus,
                    Tenable) at least weekly?
                  </el-text>
                  <el-select
                    v-model="VulnerabilitiesStatus"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label="Yes, scanned weekly or more frequently"
                      value="Yes"
                    />
                    <el-option
                      label="Scanned, but less frequently "
                      value="Scanned"
                    />
                    <el-option label="No regular scans" value="No" />
                  </el-select>
                  <div
                    v-if="
                      VulnerabilitiesStatus === 'No' ||
                      VulnerabilitiesStatus === 'Scanned'
                    "
                    style="color: red"
                  >
                    Software is not scanned for vulnerabilities within a
                    reasonable time period.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 3 -->

              <!-- Question 4 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    4. Is the software regularly scanned for vulnerabilities
                    using authenticated methods (e.g., local agents or
                    credentialed remote scans) to detect configuration flaws and
                    missing patches?
                  </el-text>
                  <el-select
                    v-model="Q4Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option
                      label="Scanned, but only unauthenticated"
                      value="AVERAGE"
                    />
                    <el-option
                      label="No authenticated scans performed"
                      value="No"
                    />
                  </el-select>
                  <div
                    v-if="Q4Status === 'No' || Q4Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Authenticated scan is not performed
                  </div>
                </el-col>
              </el-row>
              <!-- Question 4 -->

              <!-- Question 5 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    5. Is the software automatically updated with the latest
                    security patches using a dedicated tool (e.g., WSUS,
                    Ansible, SCCM)?
                  </el-text>
                  <el-select
                    v-model="Q5Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes, fully automated" value="Yes" />
                    <el-option label="Partially automated" value="AVERAGE" />
                    <el-option label="No automation" value="No" />
                  </el-select>
                  <div
                    v-if="Q5Status === 'No' || Q5Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Updates are not fully automated.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 5 -->

              <!-- Question 6 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    6. Are consecutive vulnerability scan results for the
                    software compared regularly to confirm timely remediation of
                    identified flaws?
                  </el-text>
                  <el-select
                    v-model="Q6Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label="Yes, with documented tracking (e.g., Jira tickets, automated dashboards)"
                      value="Yes"
                    />
                    <el-option
                      label="Ad-hoc comparisons (no formal process)"
                      value="AVERAGE"
                    />
                    <el-option
                      label="No, remediation is not tracked"
                      value="No"
                    />
                  </el-select>
                  <div
                    v-if="Q6Status === 'No' || Q6Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Updates are not fully automated.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 6 -->

              <!-- Question 7 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    7. Are documented security configuration standards
                    maintained and enforced for the software?
                  </el-text>
                  <el-select
                    v-model="Q7Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label="Yes, fully documented and enforced"
                      value="Yes"
                    />
                    <el-option
                      label="Partially documented (standards exist but not consistently applied)"
                      value="AVERAGE"
                    />
                    <el-option label="No standards exist" value="No" />
                  </el-select>
                  <div
                    v-if="Q7Status === 'No' || Q7Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Documented security configuration standards not strictly
                    maintained or enforced.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 7 -->

              <!-- Question 8 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    8. Are secure images or templates for the software
                    maintained based on the organization's approved
                    configuration standards. Any new system deployment or
                    existing system that becomes compromised should be imaged
                    using one of those images or templates.
                  </el-text>
                  <el-select
                    v-model="Q8Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes, always" value="Yes" />
                    <el-option label="Sometimes" value="AVERAGE" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div
                    v-if="Q8Status === 'No' || Q8Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Documented security configuration standards not strictly
                    maintained or enforced.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 8 -->

              <!-- Question 9 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    9. Are master images/templates stored on securely configured
                    servers with integrity monitoring to prevent unauthorized
                    modifications?
                  </el-text>
                  <el-select
                    v-model="Q9Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label=" Yes, fully secured & monitored"
                      value="Yes"
                    />
                    <el-option
                      label=" Partially secured (basic access controls but no real-time monitoring)"
                      value="AVERAGE"
                    />
                    <el-option
                      label="No, stored on standard file shares"
                      value="No"
                    />
                  </el-select>
                  <div
                    v-if="Q9Status === 'No' || Q9Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Security images are not fully secured.
                  </div>
                </el-col>
              </el-row>
              <!-- Question 9 -->

              <!-- Question 10 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    10. Are system configuration management tools deployed to
                    automatically enforce and redeploy approved security
                    settings for the software at scheduled intervals?
                  </el-text>
                  <el-select
                    v-model="Q10Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label=" Yes, fully automated" value="Yes" />
                    <el-option
                      label=" Partially automated (manual triggers or ad-hoc enforcement)"
                      value="AVERAGE"
                    />
                    <el-option
                      label="No, configurations are managed manually"
                      value="No"
                    />
                  </el-select>
                  <div
                    v-if="Q10Status === 'No' || Q10Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Configuration Enforcement are not fully automatic
                  </div>
                </el-col>
              </el-row>
              <!-- Question 10 -->

              <!-- Question 11 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    11. Any Security Content Automation Protocol (SCAP)
                    compliant configuration monitoring system used to verify all
                    security configuration elements, catalog approved
                    exceptions, and alert when unauthorized changes occur for
                    the software?
                  </el-text>
                  <el-select
                    v-model="Q11Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label=" Yes, fully implemented (automated scans + real-time alerts)"
                      value="Yes"
                    />
                    <el-option
                      label="Partially implemented (manual scans or no exception tracking)"
                      value="AVERAGE"
                    />
                    <el-option
                      label=" No SCAP monitoring in place"
                      value="No"
                    />
                  </el-select>
                  <div
                    v-if="Q11Status === 'No' || Q11Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Not Using SCAP-Compliant Monitoring
                  </div>
                </el-col>
              </el-row>
              <!-- Question 11 -->

              <!-- Question 12 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    12. Is the software an email or web Broswer?
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
                  <!-- <div
                    v-if="Q11Status === 'No'"
                    style="color: red"
                  >
                    Not Using SCAP-Compliant Monitoring
                  </div> -->
                </el-col>
              </el-row>
              <!-- Question 12 -->

              <!-- Question 12.1 -->
              <div v-if="Q12Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      12.1 Are unauthorized browser/email plugins/add-ons (e.g.,
                      Chrome extensions, Outlook add-ins) uninstalled or
                      disabled for the software?
                    </el-text>
                    <el-select
                      v-model="Q12_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, actively managed (automated blocking + allowlists)"
                        value="Yes"
                      />
                      <el-option
                        label="Partially managed (manual reviews, no enforcement)"
                        value="AVERAGE"
                      />
                      <el-option label="No controls in place" value="No" />
                    </el-select>
                    <div
                      v-if="Q12_1Status === 'No' || Q12_1Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Unauthorized Plugins/Add-Ons may exist.
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 12.1 -->

              <!-- Question 12.2 -->
              <div v-if="Q12Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      12.2 Are unauthorized scripting languages (e.g.,
                      JavaScript, VBScript, macros) blocked in the web browser
                      or email client across the organization?
                    </el-text>
                    <el-select
                      v-model="Q12_2Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label=" Yes, strictly enforced" value="Yes" />
                      <el-option
                        label="Partially enforced (some restrictions but gaps exist)"
                        value="AVERAGE"
                      />
                      <el-option label="No controls in place" value="No" />
                    </el-select>
                    <div
                      v-if="Q12_2Status === 'No' || Q12_2Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Uncontrolled Script Execution may exist.
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 12.2 -->

              <!-- Question 13 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    13. Is the software an in-house developed software?
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
                </el-col>
              </el-row>
              <!-- Question 13 -->

              <!-- Question 13.1 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.1 Are secure coding practices (e.g., OWASP Top 10, CERT
                      guidelines) enforced for all development involving the
                      software?
                    </el-text>
                    <el-select
                      v-model="Q13_1Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, strictly enforced (via code reviews, SAST/DAST tools, and training)"
                        value="Yes"
                      />
                      <el-option
                        label="Partially enforced (ad-hoc reviews or limited tooling)"
                        value="AVERAGE"
                      />
                      <el-option
                        label=" No formal practices in place"
                        value="No"
                      />
                    </el-select>
                    <div
                      v-if="Q13_1Status === 'No' || Q13_1Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Insecure Coding Practices
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.1 -->

              <!-- Question 13.2 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.2 For in-house developed software, is explicit error
                      checking performed and documented for all input, including
                      for size, data type, and acceptable ranges or formats.
                    </el-text>
                    <el-select
                      v-model="Q13_2Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, rigorously enforced "
                        value="Yes"
                      />
                      <el-option label="Partial validation" value="AVERAGE" />
                      <el-option
                        label=" No formal input validation"
                        value="No"
                      />
                    </el-select>
                    <div
                      v-if="Q13_2Status === 'No' || Q13_2Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Poor Input Validation
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.2 -->

              <!-- Question 13.3 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.3 Is only up-to-date and trusted third-party components
                      used for the software developed by the organization?
                    </el-text>
                    <el-select
                      v-model="Q13_3Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, strictly enforced (automated scanning + approved vendor lists) "
                        value="Yes"
                      />
                      <el-option
                        label="Partially enforced (some manual reviews, occasional exceptions)"
                        value="AVERAGE"
                      />
                      <el-option label="No formal controls" value="No" />
                    </el-select>
                    <div
                      v-if="Q13_3Status === 'No' || Q13_3Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Untrusted/Outdated Components may be used.
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.3 -->

              <!-- Question 13.4 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.4 Does your organization exclusively use standardized,
                      currently accepted, and extensively reviewed encryption
                      algorithms for the software?
                    </el-text>
                    <el-select
                      v-model="Q13_4Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes, rigorously enforced" value="Yes" />
                      <el-option label="Partial enforced" value="AVERAGE" />
                      <el-option label="No formal control" value="No" />
                    </el-select>
                    <div
                      v-if="Q13_4Status === 'No' || Q13_4Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Non-Standard/Deprecated Encryption used.
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.4 -->

              <!-- Question 13.5 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.5 Do all development personnel of this software receive
                      role-specific secure coding training tailored to their
                      development environment (e.g., web, mobile, cloud) and
                      responsibilities?
                    </el-text>
                    <el-select
                      v-model="Q13_5Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, mandatory & role-specific"
                        value="Yes"
                      />
                      <el-option
                        label="Occasional generic training (not role-specific)"
                        value="AVERAGE"
                      />
                      <el-option
                        label="No formal training program"
                        value="No"
                      />
                    </el-select>
                    <div
                      v-if="Q13_5Status === 'No' || Q13_5Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Insufficient Secure Coding Training
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.5 -->

              <!-- Question 13.6 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.6 Are static (SAST) and dynamic (DAST) analysis tools
                      used to enforce secure coding practices for the software?
                    </el-text>
                    <el-select
                      v-model="Q13_6Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, integrated into CI/CD (automated blocking of insecure code)"
                        value="Yes"
                      />
                      <el-option
                        label="Used ad-hoc (manual scans, no pipeline enforcement)"
                        value="AVERAGE"
                      />
                      <el-option label="No SAST/DAST tools in use" value="No" />
                    </el-select>
                    <div
                      v-if="Q13_5Status === 'No' || Q13_5Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Not or partially Using SAST/DAST
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.6 -->

              <!-- Question 13.7 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.7 Are production and non-production environments
                      strictly segregated, and is developer access to production
                      systems monitored/controlled?
                    </el-text>
                    <el-select
                      v-model="Q13_7Status"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Yes, fully enforced (separate networks, RBAC, and audit logs)"
                        value="Yes"
                      />
                      <el-option
                        label="Partial segregation (some shared resources or unmonitored access)"
                        value="AVERAGE"
                      />
                      <el-option
                        label="No separation (devs have direct/unlogged production access)"
                        value="No"
                      />
                    </el-select>
                    <div
                      v-if="Q13_5Status === 'No' || Q13_5Status === 'AVERAGE'"
                      style="color: red"
                    >
                      Poor Environment Segregation
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- Question 13.7 -->

              <!-- Question 14 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    14. Are all third-party software components (libraries,
                    frameworks, tools) verified for active developer support or
                    appropriately hardened if unsupported?
                  </el-text>
                  <el-select
                    v-model="Q14Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label="Yes, rigorously tracked and updated (automated monitoring + patching)"
                      value="Yes"
                    />
                    <el-option
                      label="Partially verified (manual audits, some gaps)"
                      value="AVERAGE"
                    />
                    <el-option label="No formal process in place" value="No" />
                  </el-select>
                  <div
                    v-if="Q14Status === 'No' || Q14Status === 'AVERAGE'"
                    style="color: red"
                  >
                    Unsupported/Unhardened Software
                  </div>
                </el-col>
              </el-row>
              <!-- Question 14 -->

              <!-- Question 15 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    15. Is WAF or other Application firewall in place for the
                    software?
                  </el-text>
                  <el-select
                    v-model="Q15Status"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />

                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q15Status === 'No'" style="color: red">
                    No deployment of Application Firewalls
                  </div>
                </el-col>
              </el-row>
              <!-- Question 15 -->
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
      isAuthorized: "",
      statusUpdated: "",
      whitelistedStatus: "",
      VulnerabilitiesStatus: "",
      Q4Status: "",
      Q5Status: "",
      Q6Status: "",
      Q7Status: "",
      Q8Status: "",
      Q9Status: "",
      Q10Status: "",
      Q11Status: "",
      Q12Status: "",
      Q12_1Status: "",
      Q12_2Status: "",
      Q13Status: "",
      Q13_1Status: "",
      Q13_2Status: "",
      Q13_3Status: "",
      Q13_4Status: "",
      Q13_5Status: "",
      Q13_6Status: "",
      Q13_7Status: "",
      Q14Status: "",
      Q15Status: "",
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
        isAuthorized: this.isAuthorized,
        statusUpdated: this.statusUpdated,
        whitelistedStatus: this.whitelistedStatus,
        VulnerabilitiesStatus: this.VulnerabilitiesStatus,
        Q4Status: this.Q4Status,
        Q5Status: this.Q5Status,
        Q6Status: this.Q6Status,
        Q7Status: this.Q7Status,
        Q8Status: this.Q8Status,
        Q9Status: this.Q9Status,
        Q10Status: this.Q10Status,
        Q11Status: this.Q11Status,
        Q12Status: this.Q12Status,
        Q12_1Status: this.Q12_1Status,
        Q12_2Status: this.Q12_2Status,
        Q13Status: this.Q13Status,
        Q13_1Status: this.Q13_1Status,
        Q13_2Status: this.Q13_2Status,
        Q13_3Status: this.Q13_3Status,
        Q13_4Status: this.Q13_4Status,
        Q13_5Status: this.Q13_5Status,
        Q13_6Status: this.Q13_6Status,
        Q13_7Status: this.Q13_7Status,
        Q14Status: this.Q14Status,
        Q15Status: this.Q15Status,
      };

      let storedData = JSON.parse(localStorage.getItem("Qsoftware")) || [];
      storedData.push(formData);
      localStorage.setItem("Qsoftware", JSON.stringify(storedData));

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
