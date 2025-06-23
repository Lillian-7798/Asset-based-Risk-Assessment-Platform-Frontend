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
            @click="handleBackClick"
            style="
              background-color: #409eff;
              color: white;
              border-color: #409eff;
            "
          >
            <el-icon>
              <ArrowLeft />
            </el-icon>
            Back
          </el-button>

          <!-- 文字标题 -->
          <el-text style="font-size: 20px; font-weight: bold; flex-grow: 1">
            Add a New Inventory
          </el-text>
        </div>
      </div>
      <div class="sub-content">
        <el-scrollbar height="80vh">
          <div class="form-rows">
            <!-- Basic Info Section -->
            <div class="basicInfo-first">
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Name<span class="required-asterisk">*</span>:</el-text
                  >
                  <el-input
                    style="width: 100%"
                    v-model="name"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">AssetID:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="assetID"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Asset Type<span class="required-asterisk">*</span
                    >:</el-text
                  >
                  <el-select
                    v-model="AssetType"
                    placeholder="Default"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in AssetTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text"
                    >Asset Owner<span class="required-asterisk">*</span
                    >:</el-text
                  >
                  <el-input
                    style="width: 100%"
                    v-model="assetOwner"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Description:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="description"
                    :autosize="{ minRows: 3, maxRows: 8 }"
                    type="textarea"
                    placeholder="Please input"
                  />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Contact:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="contact"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-divider class="divider" />
            </div>

            <!-- Dynamic Section Based on Asset Type -->
            <div v-if="AssetType === 'Software'">
              <!-- Software-specific fields -->
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Version<span class="required-asterisk">*</span>:</el-text
                  >
                  <el-input
                    style="width: 100%"
                    v-model="version"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text"
                    >Install Date<span class="required-asterisk">*</span
                    >:</el-text
                  >
                  <el-date-picker
                    v-model="installDate"
                    type="date"
                    placeholder="Pick a day"
                    style="width: 100%"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Authorized Operating Systems<span class="required-asterisk"
                      >*</span
                    >:</el-text
                  >
                  <el-input
                    style="width: 100%"
                    v-model="authorizedOperatingSystems"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>

                <el-col :span="10" offset="2">
                  <el-text class="q-text">External Supplied:</el-text>
                  <el-select
                    v-model="externalSupplied"
                    placeholder="Default"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in externalSuppliedOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>

              <div v-if="externalSupplied === 'Yes'">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Manufacture:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="Manufacture"
                      placeholder="Please input"
                      clearable
                    />
                  </el-col>
                  <el-col :span="10">
                    <el-text class="q-text">Service Type:</el-text>
                    <el-select
                      v-model="ServiceType"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="On-Premises" value="On-Premises" />
                      <el-option label="SaaS" value="SaaS" />
                      <el-option label="Hybrid" value="Hybrid" />
                      <el-option label="Hosted" value="Hosted" />
                    </el-select>
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">License Type:</el-text>
                    <el-select
                      v-model="LicenseType"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Permanent" value="Permanent" />
                      <el-option label="Subscription" value="Subscription" />
                      <el-option label="trial" value="trial" />
                      <el-option
                        label="volume licensing"
                        value="volume licensing"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text"
                      >License Start and Expire Date:<span
                        class="required-asterisk"
                        >*</span
                      >:</el-text
                    >
                    <el-date-picker
                      v-model="LicenseStartandExpireDate"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 100%"
                      clearable
                    />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">License Number:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="LicenseNumber"
                      placeholder="Please input"
                      clearable
                    />
                  </el-col>
                  <el-col :span="10">
                    <el-text class="q-text">Related Contract Number:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="RelatedContractNumber"
                      placeholder="Please input"
                      clearable
                    />
                  </el-col>
                </el-row>
              </div>

              <!-- Add a divider to separate this section -->
              <el-divider class="divider" />
            </div>

            <!-- Dynamic Section Based on Asset Type -->
            <div v-if="AssetType === 'Physical'">
              <!-- Fixed or Non-fixed Physical Asset -->
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Physical Asset Type<span class="required-asterisk">*</span
                    >:</el-text
                  >
                  <el-select
                    v-model="physicalAssetType"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Fixed Physical Asset" value="Fixed" />
                    <el-option
                      label="Non-fixed Physical Asset"
                      value="Non-fixed"
                    />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Depending on the selection, show different fields -->
              <div v-if="physicalAssetType === 'Fixed'">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Asset Category (Fixed):</el-text>
                    <el-select
                      v-model="fixedAssetCategory"
                      placeholder="Select Category"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Buildings & Structures"
                        value="Buildings & Structures"
                      />
                      <el-option
                        label="Production Equipment & Machinery"
                        value="Production Equipment & Machinery"
                      />
                      <el-option
                        label="Office Equipment"
                        value="Office Equipment"
                      />
                      <el-option
                        label="Transportation Vehicles"
                        value="Transportation Vehicles"
                      />
                      <el-option
                        label="Network & IT Infrastructure"
                        value="Network & IT Infrastructure"
                      />
                      <el-option
                        label="Power & Utility Equipment"
                        value="Power & Utility Equipment"
                      />
                      <el-option
                        label="Security Equipment"
                        value="Security Equipment"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Location:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="Location"
                      placeholder="Enter location"
                      clearable
                    />
                  </el-col>
                </el-row>
              </div>

              <div v-if="physicalAssetType === 'Non-fixed'">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text"
                      >Asset Category (Non-fixed):</el-text
                    >
                    <el-select
                      v-model="nonFixedAssetCategory"
                      placeholder="Select Category"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        label="Mobile Electronic Devices"
                        value="Mobile Electronic Devices"
                      />
                      <el-option
                        label="Removable Storage Media"
                        value="Removable Storage Media"
                      />
                      <el-option
                        label="Temporary Facilities and Tools"
                        value="Temporary Facilities and Tools"
                      />
                      <el-option
                        label="Transportation and Logistics Assets"
                        value="Transportation and Logistics Assets"
                      />
                      <el-option
                        label="Laboratory and Production Consumables"
                        value="Laboratory and Production Consumables"
                      />
                      <el-option
                        label="Security and Emergency Equipment"
                        value="Security and Emergency Equipment"
                      />
                      <el-option
                        label="Other High-Mobility Assets"
                        value="Other High-Mobility Assets"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Current Holder:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="CurrentHolder"
                      placeholder="Please input"
                      clearable
                    />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Checkout Date:</el-text>
                    <el-date-picker
                      v-model="CheckoutDate"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 100%"
                      clearable
                    />
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Expected Return Date:</el-text>
                    <el-date-picker
                      v-model="ExpectedReturnDate"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 100%"
                      clearable
                    />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Condition:</el-text>
                    <el-select
                      v-model="Condition"
                      placeholder="Select Condition"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Good" value="Good" />
                      <el-option label="Damaged" value="Damaged" />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Data Encryption:</el-text>
                    <el-select
                      v-model="DataEncryption"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Remote Wipe Capability:</el-text>
                    <el-select
                      v-model="RemoteWipeCapability"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                  </el-col>
                </el-row>
              </div>

              <el-divider class="divider" />

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Purchase Date:</el-text>
                  <el-date-picker
                    v-model="PurchaseDate"
                    type="date"
                    placeholder="Pick a day"
                    style="width: 100%"
                    clearable
                  />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Depreciation Period:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="DepreciationPeriod"
                    :disabled="true"
                  />
                </el-col>
              </el-row>
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Maintenance Cycle:</el-text>
                  <el-select
                    v-model="MaintenanceCycle"
                    placeholder="Select Cycle"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      label="Daily, Weekly, Every 72 Operating Hours"
                      value="Daily, Weekly, Every 72 Operating Hours"
                    />
                    <el-option
                      label="Monthly, Quarterly, Every 5000 km"
                      value="Monthly, Quarterly, Every 5000 km"
                    />
                    <el-option
                      label="Annually, Biannually, Every 5 Years"
                      value="Annually, Biannually, Every 5 Years"
                    />
                    <el-option
                      label="As Needed, After Event, On Failure"
                      value="As Needed, After Event, On Failure"
                    />
                  </el-select>
                </el-col>
              </el-row>

              <el-divider class="divider" />
            </div>

            <!-- -------------------- Information Asset Section ------------------------------------->
            <div v-if="AssetType === 'Information'">
              <!-- Retention Policy, Storage Location, Information Asset Type -->
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Retention Policy:</el-text>
                  <el-select
                    v-model="informationRetentionPolicy"
                    placeholder="Select Policy"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Permanent" value="Permanent" />
                    <el-option label="5 Years" value="5 Years" />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Storage Location:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="informationStorageLocation"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Asset Category<span class="required-asterisk">*</span
                    >:</el-text
                  >
                  <el-select
                    v-model="InformationAssetCategory"
                    placeholder="Select Type"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Database" value="Database" />
                    <el-option label="Document" value="Document" />
                    <el-option label="Patent" value="Patent" />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Dynamic Section Based on Information Asset Type -->
              <div v-if="InformationAssetCategory === 'Database'">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Data Schema:</el-text>
                    <el-select
                      v-model="DataSchema"
                      placeholder="Select Schema"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="MySQL" value="mysql" />
                      <el-option label="MongoDB" value="mongodb" />
                      <el-option label="Other" value="other" />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Version:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="databaseVersion"
                      placeholder="Please input"
                      clearable
                    />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Contains PII:</el-text>
                    <el-select
                      v-model="containsPII"
                      placeholder="Select"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Yes" value="Yes" />
                      <el-option label="No" value="No" />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Backup Frequency:</el-text>
                    <el-select
                      v-model="backupFrequency"
                      placeholder="Select Frequency"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Daily" value="daily" />
                      <el-option label="Weekly" value="weekly" />
                      <el-option label="Monthly" value="monthly" />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div v-if="InformationAssetCategory === 'Document'">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">File Format:</el-text>
                    <el-select
                      v-model="fileFormat"
                      placeholder="Select Format"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="PDF" value="PDF" />
                      <el-option label="DOCX" value="DOCX" />
                      <el-option label="CAD" value="CAD" />
                      <el-option label="Other" value="other" />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Confidentiality Level:</el-text>
                    <el-select
                      v-model="confidentialityLevel"
                      placeholder="Select Level"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="Public" value="Public" />
                      <el-option label="Internal" value="Internal" />
                      <el-option label="Sec" value="Sec" />
                    </el-select>
                  </el-col>
                </el-row>
              </div>

              <div v-if="InformationAssetCategory === 'Patent'">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Registration Number:</el-text>
                    <el-input
                      style="width: 100%"
                      v-model="registrationNumber"
                      placeholder="Please input"
                      clearable
                    />
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Expiry Date:</el-text>
                    <el-date-picker
                      v-model="expiryDate"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 100%"
                      clearable
                    />
                  </el-col>
                </el-row>
              </div>

              <el-divider class="divider" />
            </div>

            <!-- Dynamic Section Based on Asset Type -->
            <div v-if="AssetType === 'People'">
              <!-- People-specific fields -->
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Department:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="department"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Position:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="position"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Hire Date:</el-text>
                  <el-date-picker
                    v-model="hireDate"
                    type="date"
                    placeholder="Pick a day"
                    style="width: 100%"
                    clearable
                  />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Background Check Status:</el-text>
                  <el-select
                    v-model="backgroundCheckStatus"
                    placeholder="Select Status"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Completed" value="Completed" />
                    <el-option label="Pending" value="Pending" />
                    <el-option label="Failed" value="Failed" />
                    <el-option label="Expired" value="Expired" />
                    <el-option label="Not Required" value="Not Required" />
                  </el-select>
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Security Training Status:</el-text>
                  <el-select
                    v-model="securityTrainingStatus"
                    placeholder="Select Status"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Completed" value="Completed" />
                    <el-option label="Pending" value="Pending" />
                    <el-option label="Failed" value="Failed" />
                    <el-option label="Expired" value="Expired" />
                    <el-option label="Not Required" value="Not Required" />
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <el-text class="q-text">NDA Signing Date:</el-text>
                  <el-date-picker
                    v-model="NDASigningDate"
                    type="date"
                    placeholder="Pick a day"
                    style="width: 100%"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Remote Work Agreement Status:</el-text
                  >
                  <el-select
                    v-model="RemoteWorkAgreementStatus"
                    placeholder="Select Status"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Yes" value="Yes" />
                    <el-option label="No" value="No" />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Security Incident Records:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="securityIncidentRecords"
                    placeholder="Please input"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Last Audit Date:</el-text>
                  <el-date-picker
                    v-model="LastAuditDate"
                    type="date"
                    placeholder="Pick a day"
                    style="width: 100%"
                    clearable
                  />
                </el-col>
              </el-row>

              <el-divider class="divider" />
            </div>

            <!-- Status, Importance, Associated Assets Section -->
            <div class="basicInfo-second">
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text"
                    >Status<span class="required-asterisk">*</span>:</el-text
                  >
                  <el-select
                    v-model="status"
                    placeholder="Default"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in Status"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text"
                    >Importance<span class="required-asterisk">*</span></el-text
                  >
                  <el-select
                    v-model="importance"
                    placeholder="Default"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in Importances"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Associated Assets:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="associatedAssets"
                    :autosize="{ minRows: 2, maxRows: 2 }"
                    type="textarea"
                    placeholder="Please input"
                  />
                </el-col>
              </el-row>
            </div>
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
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";

export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.assetID = this.$route.query.id;
    this.AssetType = this.$route.query.assetType;
    this.Pre_filled();
  },
  data() {
    return {
      showConfirmDialog: false,
      leaveConfirmed: false,
      targetRoute: null,
      name: "",
      assetID: "",
      AssetType: "",
      assetOwner: "",
      description: "",
      contact: "",
      status: "",
      importance: "",
      associatedAssets: "",
      // Software
      version: "",
      installDate: "",
      authorizedOperatingSystems: "",
      externalSupplied: "",
      Manufacture: "",
      ServiceType: "",
      LicenseType: "",
      LicenseStartandExpireDate: "",
      LicenseNumber: "",
      RelatedContractNumber: "",
      //Physical
      physicalAssetType: "",
      fixedAssetCategory: "",
      Location: "",
      nonFixedAssetCategory: "",
      CurrentHolder: "",
      CheckoutDate: "",
      ExpectedReturnDate: "",
      Condition: "",
      DataEncryption: "",
      RemoteWipeCapability: "",
      PurchaseDate: "",
      DepreciationPeriod: "5",
      MaintenanceCycle: "",
      //Information
      informationRetentionPolicy: "",
      informationStorageLocation: "",
      InformationAssetCategory: "",
      databaseVersion: "",
      DataSchema: "",
      containsPII: "",
      backupFrequency: "",
      fileFormat: "",
      confidentialityLevel: "",
      registrationNumber: "",
      expiryDate: "",
      //People
      department: "",
      position: "",
      hireDate: "",
      backgroundCheckStatus: "",
      securityTrainingStatus: "",
      NDASigningDate: "",
      RemoteWorkAgreementStatus: "",
      securityIncidentRecords: "",
      LastAuditDate: "",
      AssetTypes: [
        { value: "Software", label: "Software" },
        { value: "Physical", label: "Physical" },
        { value: "Information", label: "Information" },
        { value: "People", label: "People" },
      ],
      Status: [
        { value: "Active", label: "Active" },
        { value: "Decommissioned", label: "Decommissioned" },
      ],
      Importances: [
        { value: "ExtremelyHigh", label: "Extremely High" },
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" },
      ],
      externalSuppliedOptions: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
      ],
      informationAssetTypes: [
        { value: "Database", label: "Database" },
        { value: "Document", label: "Document" },
        { value: "Patent", label: "Patent" },
      ],
      dataSchemaOptions: [
        { value: "mysql", label: "MySQL" },
        { value: "mongodb", label: "MongoDB" },
        { value: "other", label: "Other" },
      ],
      backupFrequencyOptions: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
      ],
      fileFormatOptions: [
        { value: "PDF", label: "PDF" },
        { value: "DOCX", label: "DOCX" },
        { value: "CAD", label: "CAD" },
        { value: "other", label: "Other" },
      ],
      confidentialityLevelOptions: [
        { value: "Public", label: "Public" },
        { value: "Internal", label: "Internal" },
        { value: "Sec", label: "Sec" },
      ],

      // 表单验证规则
    };
  },
  methods: {
    async Pre_filled() {
      console.log("get pre-filled information");
      try {
        const response = await axios.get(
          `${API_BASE_URL}/inventory/getAssetInfo`,
          {
            params: {
              id: this.$route.query.id,
              type: this.$route.query.assetType,
            },
          }
        );
        if (response.data.success) {
          console.log(response.data.data);
          //逐个映射basic字段
          this.name = response.data.data.assetName;
          this.assetOwner = response.data.data.assetOwner.assetUserName;
          this.description = response.data.data.description;
          this.status = response.data.data.status;
          this.importance = response.data.data.importance;
          this.associatedAssets = response.data.data.associatedAssets;
          //映射Software
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        // this.$message.error("获取当前资产信息失败，请稍后重试");
      }
    },
    goBack() {
      this.$router.push("/home/asset-inventory");
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
    async handleSave() {
      const formData = {
        name: this.name,
        assetID: this.assetID,
        AssetType: this.AssetType,
        assetOwner: this.assetOwner,
        description: this.description,
        contact: this.contact,
        status: this.status,
        importance: this.importance,
        associatedAssets: this.associatedAssets,
        // software
        version: this.version,
        installDate: this.installDate,
        authorizedOperatingSystems: this.authorizedOperatingSystems,
        externalSupplied: this.externalSupplied,
        Manufacture: this.Manufacture,
        ServiceType: this.ServiceType,
        LicenseType: this.LicenseType,
        LicenseStartandExpireDate: this.LicenseStartandExpireDate,
        LicenseNumber: this.LicenseNumber,
        RelatedContractNumber: this.RelatedContractNumber,
        //Physical
        physicalAssetType: this.physicalAssetType,
        fixedAssetCategory: this.fixedAssetCategory,
        Location: this.Location,
        nonFixedAssetCategory: this.nonFixedAssetCategory,
        CurrentHolder: this.CurrentHolder,
        CheckoutDate: this.CheckoutDate,
        ExpectedReturnDate: this.ExpectedReturnDate,
        Condition: this.Condition,
        DataEncryption: this.dataEncryption,
        RemoteWipeCapability: this.RemoteWipeCapability,
        PurchaseDate: this.PurchaseDate,
        DepreciationPeriod: this.DepreciationPeriod,
        MaintenanceCycle: this.MaintenanceCycle,
        //INformation
        informationRetentionPolicy: this.informationRetentionPolicy,
        informationStorageLocation: this.informationStorageLocation,
        InformationAssetCategory: this.InformationAssetCategory,
        DataSchema: this.DataSchema,
        containsPII: this.containsPII,
        backupFrequency: this.backupFrequency,
        fileFormat: this.fileFormat,
        confidentialityLevel: this.confidentialityLevel,
        registrationNumber: this.registrationNumber,
        expiryDate: this.expiryDate,
        databaseVersion: this.databaseVersion,
        // People
        department: this.department,
        position: this.position,
        hireDate: this.hireDate,
        backgroundCheckStatus: this.backgroundCheckStatus,
        securityTrainingStatus: this.securityTrainingStatus,
        NDASigningDate: this.NDASigningDate,
        RemoteWorkAgreementStatus: this.RemoteWorkAgreementStatus,
        securityIncidentRecords: this.securityIncidentRecords,
        LastAuditDate: this.LastAuditDate,
        timestamp: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
      };

      if (this.name === "" || this.name === null || this.name === undefined) {
        alert("Name is required.");
        return;
      }

      if (
        this.AssetType === "" ||
        this.AssetType === null ||
        this.AssetType === undefined
      ) {
        alert("Asset Type is required.");
        return;
      }

      if (
        this.assetOwner === "" ||
        this.assetOwner === null ||
        this.assetOwner === undefined
      ) {
        alert("Asset Owner is required.");
        return;
      }

      if (
        this.status === "" ||
        this.status === null ||
        this.status === undefined
      ) {
        alert("Status is required.");
        return;
      }

      if (
        this.importance === "" ||
        this.importance === null ||
        this.importance === undefined
      ) {
        alert("Importance is required.");
        return;
      }

      if (
        this.AssetType === "Software" &&
        (this.version === "" ||
          this.version === null ||
          this.version === undefined)
      ) {
        alert("Version is required for Software assets.");
        return;
      }

      if (this.AssetType === "Software" && !this.installDate) {
        alert("Install Date is required for Software assets.");
        return;
      }

      if (
        this.AssetType === "Software" &&
        (this.authorizedOperatingSystems === "" ||
          this.authorizedOperatingSystems === null ||
          this.authorizedOperatingSystems === undefined)
      ) {
        alert("Authorized Operating Systems is required.");
        return;
      }

      if (this.AssetType === "Physical" && !this.physicalAssetType) {
        alert("Physical Asset Type is required");
        return;
      }

      if (this.AssetType === "Information" && !this.InformationAssetCategory) {
        alert("Information Asset Category is required");
        return;
      }

      //localhost的，仅做演示用，之后删掉

      let storedData = JSON.parse(sessionStorage.getItem("assets")) || [];
      storedData.push(formData);
      sessionStorage.setItem("assets", JSON.stringify(storedData));

      // POST 请求到后端
      try {
        const response = await axios.post(
          "http://localhost:8081/api/asset-management/save",
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
.footer {
  background-color: #92a4bd;
  position: fixed;
  bottom: 0px;
  height: 5vh;
  width: 100%;
  margin: 0;
}

.el-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 10%; /* 添加左右内边距，让内容向中间聚集 */
}

.el-col {
  flex: 1 1 48%; /* 每个输入框占用 48% 宽度 */
  padding-right: 20px;
  box-sizing: border-box;
}

.el-row > .el-col:last-child {
  margin-left: 0;
}

.el-row > .el-col:first-child {
  margin-right: 0;
}

/* 当只有一个输入框时，让它占满一行并左对齐 */
.el-row > .el-col:only-child {
  flex: 1 1 100%;
  margin-left: 0;
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
