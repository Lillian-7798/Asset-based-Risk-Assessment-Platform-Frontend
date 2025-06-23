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
                  <el-text class="q-text">Asset ID:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="swid"
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
              </el-row>

              <el-row gutter="{20}">
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

              <div v-if="externalSupplied === 0">
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
                      <el-option label="On-Premises" :value=0 />
                      <el-option label="SaaS" :value=1 />
                      <el-option label="Hybrid" :value=2 />
                      <el-option label="Hosted" :value=3 />
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
                      <el-option label="Permanent" :value=0 />
                      <el-option label="Subscription" :value=1 />
                      <el-option label="trial" :value=2 />
                      <el-option
                        label="volume licensing"
                        value="volume licensing"
                      />
                    </el-select>
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10" offset="2">
                    <el-text class="q-text"
                      >License Start Date:<span
                        class="required-asterisk"
                        >*</span
                      >:</el-text
                    >
                    <el-date-picker
                      v-model="LicenseStartDate"
                      type="date"
                      placeholder="Pick a day"
                      style="width: 100%"
                      clearable
                    />
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text"
                      >License Expire Date:<span
                        class="required-asterisk"
                        >*</span
                      >:</el-text
                    >
                    <el-date-picker
                      v-model="LicenseExpireDate"
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
                    <el-option label="Fixed Physical Asset" :value= 0 />
                    <el-option
                      label="Non-fixed Physical Asset"
                      :value= 1
                    />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Depending on the selection, show different fields -->
              <div v-if="physicalAssetType === 0">
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
                        :value=0
                      />
                      <el-option
                        label="Production Equipment & Machinery"
                        :value=1
                      />
                      <el-option
                        label="Office Equipment"
                        :value=2
                      />
                      <el-option
                        label="Transportation Vehicles"
                        :value=3
                      />
                      <el-option
                        label="Network & IT Infrastructure"
                        :value=4
                      />
                      <el-option
                        label="Power & Utility Equipment"
                        :value=5
                      />
                      <el-option
                        label="Security Equipment"
                        :value=6
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

              <div v-if="physicalAssetType === 1">
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
                        :value=0
                      />
                      <el-option
                        label="Removable Storage Media"
                        :value=1
                      />
                      <el-option
                        label="Temporary Facilities and Tools"
                        :value=2
                      />
                      <el-option
                        label="Transportation and Logistics Assets"
                        :value=3
                      />
                      <el-option
                        label="Laboratory and Production Consumables"
                        :value=4
                      />
                      <el-option
                        label="Security and Emergency Equipment"
                        :value=5
                      />
                      <el-option
                        label="Other High-Mobility Assets"
                        :value=6
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
                      <el-option label="Good" :value=1 />
                      <el-option label="Damaged" :value=0 />
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
                      <el-option label="Yes" :value=1 />
                      <el-option label="No" :value=0 />
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
                      <el-option label="Yes" :value=1 />
                      <el-option label="No" :value=0 />
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
                      :value=0
                    />
                    <el-option
                      label="Monthly, Quarterly, Every 5000 km"
                      :value=1
                    />
                    <el-option
                      label="Annually, Biannually, Every 5 Years"
                      :value=2
                    />
                    <el-option
                      label="As Needed, After Event, On Failure"
                      :value=3
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
                    <el-option label="Permanent" :value=0 />
                    <el-option label="5 Years" :value=1 />
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
                    <el-option label="Database" :value=0 />
                    <el-option label="Document" :value=1 />
                    <el-option label="Patent" :value=2 />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Dynamic Section Based on Information Asset Type -->
              <div v-if="InformationAssetCategory === 0">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Data Schema:</el-text>
                    <el-select
                      v-model="DataSchema"
                      placeholder="Select Schema"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="MySQL" :value=0 />
                      <el-option label="MongoDB" :value=1 />
                      <el-option label="Other" :value=2 />
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
                      <el-option label="Yes" :value=1 />
                      <el-option label="No" :value=0 />
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
                      <el-option label="Daily" :value=0 />
                      <el-option label="Weekly" :value=1 />
                      <el-option label="Monthly" :value=2 />
                    </el-select>
                  </el-col>
                </el-row>
              </div>
              <div v-if="InformationAssetCategory === 1">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">File Format:</el-text>
                    <el-select
                      v-model="fileFormat"
                      placeholder="Select Format"
                      style="width: 100%"
                      clearable
                    >
                      <el-option label="PDF" :value=0 />
                      <el-option label="DOCX" :value=1 />
                      <el-option label="CAD" :value=2 />
                      <el-option label="Other" :value=3 />
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
                      <el-option label="Public" :value=0 />
                      <el-option label="Internal" :value=1 />
                      <el-option label="Secret" :value=2 />
                    </el-select>
                  </el-col>
                </el-row>
              </div>

              <div v-if="InformationAssetCategory === 2">
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
      swid:"",
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
      LicenseStartDate: "",
      LicenseExpireDate:"",
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
        { value: 0, label: "Active" },
        { value: 1, label: "Decommissioned" },
      ],
      Importances: [
        { value: 3, label: "Extremely High" },
        { value: 2, label: "High" },
        { value: 1, label: "Medium" },
        { value: 0, label: "Low" },
      ],
      externalSuppliedOptions: [
        { value: 0, label: "Yes" },
        { value: 1, label: "No" },
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
    // TODO:1.修改save逻辑,判断emptyfiled 
    // 2.限制physical-time的输入大小 
    // 3.限制software-license的开始时间和结束时间 
    // 4.对于asset owner进行搜索匹配，显示名字但是传递id;
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
          this.swid = response.data.data.swid;
          this.assetOwner = response.data.data.assetOwner.assetUserName;
          this.contact = response.data.data.contact;
          this.description = response.data.data.description;
          this.status = response.data.data.status;
          this.importance = response.data.data.importance;
          this.associatedAssets = response.data.data.associatedAssets;
          //映射Software
          if(this.AssetType=='Software'){
            this.version = response.data.data.version;
            this.installDate = response.data.data.installDate;
            this.authorizedOperatingSystems = response.data.data.operatingSystems;
            this.externalSupplied = response.data.data.externalSuppliedService;
            this.Manufacture = response.data.data.manufacture;
            this.ServiceType = response.data.data.serviceType;
            this.LicenseType = response.data.data.licenseType;
            this.LicenseStartDate = response.data.data.licenseStartDate;
            this.LicenseExpireDate = response.data.data.licenseEndDate;
            this.LicenseNumber = response.data.data.licenseNumber;
            this.RelatedContractNumber = response.data.data.relatedContractNumber;
          }
          //映射physical
          if(this.AssetType=='Physical'){
            this.physicalAssetType = response.data.data.fixedPhysicalAsset;
            this.fixedAssetCategory = response.data.data.assetCategory;
            this.Location = response.data.data.location;
            this.nonFixedAssetCategory = response.data.data.assetCategory2;
            this.CurrentHolder = response.data.data.currentHolder;
            this.CheckoutDate = response.data.data.checkoutDate;
            this.ExpectedReturnDate = response.data.data.expectedReturnDate;
            this.Condition = response.data.data.conditions;
            this.DataEncryption = response.data.data.dateEncryption;
            this.RemoteWipeCapability = response.data.data.remoteWipeCapability;
            this.PurchaseDate = response.data.data.epurchaseDate;
            this.DepreciationPeriod = response.data.data.depreciationPeriod;
            this.MaintenanceCycle = response.data.data.maintenanceCycle;
          }
          // 映射infomation
          if(this.AssetType=='Information'){
            this.informationRetentionPolicy = response.data.data.retentionPolicy;
            this.informationStorageLocation = response.data.data.storageLocation;
            this.InformationAssetCategory = response.data.data.assetCategory;
            this.databaseVersion = response.data.data.assetVersion;
            this.DataSchema = response.data.data.dataSchema;
            this.containsPII = response.data.data.containsPII;
            this.backupFrequency = response.data.data.backupFrequency;
            this.fileFormat = response.data.data.fileFormat;
            this.confidentialityLevel = response.data.data.confidentialityLevel;
            this.registrationNumber = response.data.data.registrationNumber;
            this.expiryDate = response.data.data.expiryDate;
          }
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
        swid:this.swid,
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
        LicenseStartDate: this.LicenseStartDate,
        LicenseExpireDate:this.LicenseExpireDate,
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

      // let storedData = JSON.parse(sessionStorage.getItem("assets")) || [];
      // storedData.push(formData);
      // sessionStorage.setItem("assets", JSON.stringify(storedData));

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
