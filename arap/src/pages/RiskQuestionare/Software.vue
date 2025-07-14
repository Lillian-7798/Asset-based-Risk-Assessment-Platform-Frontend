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
                  <el-select v-model="Q1Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ1Change">
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
              <div v-if="Q1Status === 'No'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      1.1 Is the software's status correctly updated in the
                      inventory?
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
                        <span>Software unauthorized and wrong software status
                          in inventory.</span>
                      </div>
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

                  <el-select v-model="Q2Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, whitelisted with version control"
                      value="Yes, whitelisted with version control" />
                    <el-option label="Licensed but unwhitelisted" value="Licensed but unwhitelisted" />
                    <el-option label="No" value="No" />
                  </el-select>

                  <div v-if="Q2Status === 'No' || Q2Status === 'Licensed but unwhitelisted'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Software is not whitelisted.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 3 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    3. Is the software automatically scanned for vulnerabilities using an SCAP-compliant tool (e.g.,
                    OpenVAS,
                    Nessus,Tenable) at least weekly?
                    <el-tooltip class="item" effect="dark"
                      content="An SCAP-compliant tool is a software solution that adheres to the Security Content Automation Protocol (SCAP), a set of open standards for automating vulnerability management, measurement, and policy compliance. These tools (e.g., OpenVAS, Nessus, Tenable) use SCAP-defined formats to consistently identify, assess, and report security vulnerabilities in systems."
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
                  <el-select v-model="Q3Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, scanned weekly or more frequently"
                      value="Yes, scanned weekly or more frequently" />
                    <el-option label="Scanned, but less frequently" value="Scanned, but less frequently" />
                    <el-option label="No regular scans" value="No regular scans" />
                  </el-select>
                  <div v-if="Q3Status === 'No regular scans' || Q3Status === 'Scanned, but less frequently'"
                    style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Software is not scanned for vulnerabilities within a reasonable time period.</span>
                    </div>
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
                    <el-tooltip class="item" effect="dark"
                      content="An authenticated method involves scanning a system with valid credentials (e.g., username/password or agent-based access) to perform deeper checks like configuration flaws, missing patches, and installed software. An unauthenticated method scans without credentials, detecting only surface-level vulnerabilities visible from the network, such as open ports or unpatched services."
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
                  <el-select v-model="Q4Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="Scanned, but only unauthenticated" value="Scanned, but only unauthenticated" />
                    <el-option label="No authenticated scans performed" value="No authenticated scans performed" />
                  </el-select>
                  <div
                    v-if="Q4Status === 'No authenticated scans performed' || Q4Status === 'Scanned, but only unauthenticated'"
                    style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span> Authenticated scan is not performed</span>
                    </div>
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
                  <el-select v-model="Q5Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, fully automated" value="Yes, fully automated" />
                    <el-option label="Partially automated" value="Partially automated" />
                    <el-option label="No automation" value="No automation" />
                  </el-select>
                  <div v-if="Q5Status === 'No automation' || Q5Status === 'Partially automated'" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Updates are not fully automated.</span>
                    </div>
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
                  <el-select v-model="Q6Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, with documented tracking (e.g., Jira tickets, automated dashboards)"
                      value="Yes, with documented tracking (e.g., Jira tickets, automated dashboards)" />
                    <el-option label="Ad-hoc comparisons (no formal process)"
                      value="Ad-hoc comparisons (no formal process)" />
                    <el-option label="No, remediation is not tracked" value="No, remediation is not tracked" />
                  </el-select>
                  <div
                    v-if="Q6Status === 'No, remediation is not tracked' || Q6Status === 'Ad-hoc comparisons (no formal process)'"
                    style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span> Updates are not fully automated. </span>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!-- Question 6 -->

              <!-- Question 7 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    7. Are documented security configuration standards maintained and enforced for the software?
                  </el-text>
                  <el-select v-model="Q7Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, fully documented and enforced" value="Yes, fully documented and enforced" />
                    <el-option label="Partially documented (standards exist but not consistently applied)"
                      value="Partially documented (standards exist but not consistently applied)" />
                    <el-option label="No standards exist" value="No standards exist" />
                  </el-select>
                  <div v-if="Q7Status !== 'Yes, fully documented and enforced' && Q7Status != ''" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Documented security configuration standards not strictly maintained or enforced.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 8 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    8. Are secure images or templates for the software maintained based on the organization's approved
                    configuration standards?
                  </el-text>
                  <el-select v-model="Q8Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, always" value="Yes, always" />
                    <el-option label="Sometimes" value="Sometimes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q8Status !== 'Yes, always' && Q8Status != ''" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Secure images/templates not consistently used.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 9 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    9. Are master images/templates stored on securely configured servers with integrity monitoring?
                  </el-text>
                  <el-select v-model="Q9Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, fully secured & monitored" value="Yes, fully secured & monitored" />
                    <el-option label="Partially secured (basic access controls but no real-time monitoring)"
                      value="Partially secured (basic access controls but no real-time monitoring)" />
                    <el-option label="No, stored on standard file shares" value="No, stored on standard file shares" />
                  </el-select>
                  <div v-if="Q9Status !== 'Yes, fully secured & monitored' && Q9Status != ''" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Security images are not fully secured.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 10 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    10. Are system configuration management tools deployed to automatically enforce and redeploy
                    approved
                    security settings?
                  </el-text>
                  <el-select v-model="Q10Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, fully automated" value="Yes, fully automated" />
                    <el-option label="Partially automated (manual triggers or ad-hoc enforcement)"
                      value="Partially automated (manual triggers or ad-hoc enforcement)" />
                    <el-option label="No, configurations are managed manually"
                      value="No, configurations are managed manually" />
                  </el-select>
                  <div v-if="Q10Status !== 'Yes, fully automated' && Q10Status != ''" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Configuration enforcement not fully automatic.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 11 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    11. Is SCAP-compliant configuration monitoring system used?
                  </el-text>
                  <el-select v-model="Q11Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, fully implemented (automated scans + real-time alerts)"
                      value="Yes, fully implemented (automated scans + real-time alerts)" />
                    <el-option label="Partially implemented (manual scans or no exception tracking)"
                      value="Partially implemented (manual scans or no exception tracking)" />
                    <el-option label="No SCAP monitoring in place" value="No SCAP monitoring in place" />
                  </el-select>
                  <div
                    v-if="Q11Status !== 'Yes, fully implemented (automated scans + real-time alerts)' && Q11Status != ''"
                    style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Not using SCAP-compliant monitoring.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 12 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    12. Is the software an email or web browser?
                  </el-text>
                  <el-select v-model="Q12Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ12Change">
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Question 12.1 -->
              <div v-if="Q12Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      12.1 Are unauthorized browser/email plugins/add-ons uninstalled or disabled?
                    </el-text>
                    <el-select v-model="Q12_1Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, actively managed (automated blocking + allowlists)"
                        value="Yes, actively managed (automated blocking + allowlists)" />
                      <el-option label="Partially managed (manual reviews, no enforcement)"
                        value="Partially managed (manual reviews, no enforcement)" />
                      <el-option label="No controls in place" value="No controls in place" />
                    </el-select>
                    <div
                      v-if="Q12_1Status !== 'Yes, actively managed (automated blocking + allowlists)' && Q12_1Status != ''"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Unauthorized plugins/add-ons may exist.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 12.2 -->
              <div v-if="Q12Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      12.2 Are unauthorized scripting languages blocked in the web browser or email client?
                    </el-text>
                    <el-select v-model="Q12_2Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, strictly enforced" value="Yes, strictly enforced" />
                      <el-option label="Partially enforced (some restrictions but gaps exist)"
                        value="Partially enforced (some restrictions but gaps exist)" />
                      <el-option label="No controls in place" value="No controls in place" />
                    </el-select>
                    <div v-if="Q12_2Status !== 'Yes, strictly enforced' && Q12_2Status != ''" style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Uncontrolled script execution may exist.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    13. Is the software an in-house developed software?
                  </el-text>
                  <el-select v-model="Q13Status" placeholder="Select" style="width: 100%" clearable
                    @change="handleQ13Change">
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Question 13.1 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.1 Are secure coding practices enforced for all development?
                    </el-text>
                    <el-select v-model="Q13_1Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, strictly enforced (via code reviews, SAST/DAST tools, and training)"
                        value="Yes, strictly enforced (via code reviews, SAST/DAST tools, and training)" />
                      <el-option label="Partially enforced (ad-hoc reviews or limited tooling)"
                        value="Partially enforced (ad-hoc reviews or limited tooling)" />
                      <el-option label="No formal practices in place" value="No formal practices in place" />
                    </el-select>
                    <div
                      v-if="Q13_1Status !== 'Yes, strictly enforced (via code reviews, SAST/DAST tools, and training)' && Q13_1Status != ''"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Insecure coding practices may exist.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13.2 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.2 Is explicit error checking performed and documented for all input?
                    </el-text>
                    <el-select v-model="Q13_2Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, rigorously enforced" value="Yes, rigorously enforced" />
                      <el-option label="Partial validation" value="Partial validation" />
                      <el-option label="No formal input validation" value="No formal input validation" />
                    </el-select>
                    <div v-if="Q13_2Status !== 'Yes, rigorously enforced' && Q13_2Status != ''" style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Poor input validation may exist.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13.3 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.3 Is only up-to-date and trusted third-party components used?
                    </el-text>
                    <el-select v-model="Q13_3Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, strictly enforced (automated scanning + approved vendor lists)"
                        value="Yes, strictly enforced (automated scanning + approved vendor lists)" />
                      <el-option label="Partially enforced (some manual reviews, occasional exceptions)"
                        value="Partially enforced (some manual reviews, occasional exceptions)" />
                      <el-option label="No formal controls" value="No formal controls" />
                    </el-select>
                    <div
                      v-if="Q13_3Status !== 'Yes, strictly enforced (automated scanning + approved vendor lists)' && Q13_3Status != ''"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Untrusted/outdated components may be used.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13.4 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.4 Does your organization exclusively use standardized encryption algorithms?
                    </el-text>
                    <el-select v-model="Q13_4Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, rigorously enforced" value="Yes, rigorously enforced" />
                      <el-option label="Partial enforced" value="Partial enforced" />
                      <el-option label="No formal control" value="No formal control" />
                    </el-select>
                    <div v-if="Q13_4Status !== 'Yes, rigorously enforced' && Q13_4Status != ''" style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Non-standard/deprecated encryption may be used.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13.5 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.5 Do all development personnel receive role-specific secure coding training?
                    </el-text>
                    <el-select v-model="Q13_5Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, mandatory & role-specific" value="Yes, mandatory & role-specific" />
                      <el-option label="Occasional generic training (not role-specific)"
                        value="Occasional generic training (not role-specific)" />
                      <el-option label="No formal training program" value="No formal training program" />
                    </el-select>
                    <div v-if="Q13_5Status !== 'Yes, mandatory & role-specific' && Q13_5Status != ''"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Insufficient secure coding training may exist.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13.6 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.6 Are SAST and DAST tools used to enforce secure coding practices?
                    </el-text>
                    <el-select v-model="Q13_6Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, integrated into CI/CD (automated blocking of insecure code)"
                        value="Yes, integrated into CI/CD (automated blocking of insecure code)" />
                      <el-option label="Used ad-hoc (manual scans, no pipeline enforcement)"
                        value="Used ad-hoc (manual scans, no pipeline enforcement)" />
                      <el-option label="No SAST/DAST tools in use" value="No SAST/DAST tools in use" />
                    </el-select>
                    <div
                      v-if="Q13_6Status !== 'Yes, integrated into CI/CD (automated blocking of insecure code)' && Q13_6Status != ''"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Not or partially using SAST/DAST tools.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 13.7 -->
              <div v-if="Q13Status === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="24" style="text-align: left">
                    <el-text class="q-text">
                      13.7 Are production and non-production environments strictly segregated?
                    </el-text>
                    <el-select v-model="Q13_7Status" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes, fully enforced (separate networks, RBAC, and audit logs)"
                        value="Yes, fully enforced (separate networks, RBAC, and audit logs)" />
                      <el-option label="Partial segregation (some shared resources or unmonitored access)"
                        value="Partial segregation (some shared resources or unmonitored access)" />
                      <el-option label="No separation (devs have direct/unlogged production access)"
                        value="No separation (devs have direct/unlogged production access)" />
                    </el-select>
                    <div
                      v-if="Q13_7Status !== 'Yes, fully enforced (separate networks, RBAC, and audit logs)' && Q13_7Status != ''"
                      style="color: red">
                      <div style="display: flex; align-items: center; gap: 4px;">
                        <el-icon :size="21">
                          <WarnTriangleFilled />
                        </el-icon>
                        <span>Poor environment segregation may exist.</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <!-- Question 14 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    14. Are all third-party software components verified for active developer support?
                  </el-text>
                  <el-select v-model="Q14Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes, rigorously tracked and updated (automated monitoring + patching)"
                      value="Yes, rigorously tracked and updated (automated monitoring + patching)" />
                    <el-option label="Partially verified (manual audits, some gaps)"
                      value="Partially verified (manual audits, some gaps)" />
                    <el-option label="No formal process in place" value="No formal process in place" />
                  </el-select>
                  <div
                    v-if="Q14Status !== 'Yes, rigorously tracked and updated (automated monitoring + patching)' && Q14Status != ''"
                    style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>Unsupported/unhardened software may exist.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Question 15 -->
              <el-row gutter="{20}">
                <el-col :span="24" style="text-align: left">
                  <el-text class="q-text">
                    15. Is WAF or other Application firewall in place for the software?
                  </el-text>
                  <el-select v-model="Q15Status" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                  <div v-if="Q15Status === 'No' && Q15Status != ''" style="color: red">
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <el-icon :size="21">
                        <WarnTriangleFilled />
                      </el-icon>
                      <span>No deployment of application firewalls.</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
              <!-- Question 15 -->
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
      Q1_1Status: "",
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
    Q1_1Status() { this.checkForChanges(); },
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
    Q12_1Status() { this.checkForChanges(); },
    Q12_2Status() { this.checkForChanges(); },
    Q13Status() { this.checkForChanges(); },
    Q13_1Status() { this.checkForChanges(); },
    Q13_2Status() { this.checkForChanges(); },
    Q13_3Status() { this.checkForChanges(); },
    Q13_4Status() { this.checkForChanges(); },
    Q13_5Status() { this.checkForChanges(); },
    Q13_6Status() { this.checkForChanges(); },
    Q13_7Status() { this.checkForChanges(); },
    Q14Status() { this.checkForChanges(); },
    Q15Status() { this.checkForChanges(); },
  },
  methods: {
    handleQ1Change(val) {
      if (val === 'Yes') {
        this.Q1_1Status = '';
      }
      this.checkForChanges();
    },
    handleQ12Change(val) {
      if (val === 'No') {
        this.Q12_1Status = '';
        this.Q12_2Status = '';
      }
      this.checkForChanges();
    },
    handleQ13Change(val) {
      if (val === 'No') {
        this.Q13_1Status = '';
        this.Q13_2Status = '';
        this.Q13_3Status = '';
        this.Q13_4Status = '';
        this.Q13_5Status = '';
        this.Q13_6Status = '';
        this.Q13_7Status = '';
      }
      this.checkForChanges();
    },
    async loadQuestionnaireData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/questionnaire/load`, {
          params: {
            id: this.$route.query.id,
            type: "Software"
          }
        });

        if (response.data.success && response.data.isload) {
          // 先保存初始数据
          this.initialData = response.data.status;
          // this.initialData = JSON.parse(JSON.stringify(response.data.status));


          // 然后再设置组件状态
          Object.keys(response.data.status).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(this, key)) {  // 修改这里
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
      // const isEqual = JSON.stringify(currentState) === JSON.stringify(this.initialData);
      this.hasChanges = !isEqual;

      // 调试
      console.log("Initial:", JSON.stringify(this.initialData));
      console.log("Current:", JSON.stringify(currentState));
      console.log("Equal:", isEqual);

      // const currentState = this.getCurrentState();
      // console.log("initial:",this.initialData)
      // console.log(currentState)
      // const isEqual = this.deepEqual(currentState, this.initialData);
      // this.hasChanges = !isEqual;
    },

    getCurrentState() {
      return {
        Q1Status: this.Q1Status,
        Q1_1Status: this.Q1_1Status,
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
    },

    // 深度比较两个对象
    deepEqual(obj1, obj2) {
      if (obj1 === obj2) return true;

      if (typeof obj1 !== 'object' || obj1 === null ||
        typeof obj2 !== 'object' || obj2 === null) {
        return false;
      }

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) return false;

      for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!this.deepEqual(obj1[key], obj2[key])) return false;
      }

      return true;
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
      // Your existing validation logic
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
        !this.Q12Status ||
        !this.Q13Status ||
        !this.Q14Status ||
        !this.Q15Status
      ) {
        this.$message.error("All fields from Q1 to Q15 must be filled!");
        return false;
      }

      if (this.Q1Status === "No" && !this.Q1_1Status) {
        this.$message.error("Q1.1 cannot be empty when Q1 is 'No'");
        return false;
      }

      if (
        this.Q12Status === "Yes" &&
        (!this.Q12_1Status || !this.Q12_2Status)
      ) {
        this.$message.error("Q12.1 and Q12.2 cannot be empty when Q12 is 'Yes'");
        return false;
      }

      if (this.Q13Status === "Yes") {
        for (let i = 1; i <= 7; i++) {
          if (!this[`Q13_${i}Status`]) {
            this.$message.error(`Q13.${i} cannot be empty when Q13 is 'Yes'`);
            return false;
          }
        }
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
        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,          // 嵌套的问卷答案对象
            id: this.$route.query.id, // 从路由获取的 id
            type: "Software",        // 固定的 type
            status: 0     // 状态
          },
          {
            headers: {
              'Content-Type': 'application/json', // 明确声明 JSON 格式
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
        const answer = {
          Q1Status: this.Q1Status,
          Q1_1Status: this.Q1_1Status,
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
          // status: 'completed' // Set status to completed for done
        };

        const response = await axios.post(
          `${API_BASE_URL}/questionnaire/submit`,
          {
            answer: answer,          // 嵌套的问卷答案对象
            id: this.$route.query.id, // 从路由获取的 id
            type: "Software",        // 固定的 type
            status: 1     // 状态
          },
          {
            headers: {
              'Content-Type': 'application/json', // 明确声明 JSON 格式
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
  /* 添加这行 */
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
  /* 左右自动外边距，使元素水平居中 */
}
</style>
