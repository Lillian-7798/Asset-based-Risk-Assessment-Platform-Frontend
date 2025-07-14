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
        <div style="height: 35px;"></div>

        <div class="header-content" style="display: flex; align-items: center">
          <!-- 返回按钮 -->
          <el-button type="primary" round @click="handleBackClick" style="
              background-color: #409eff;
              color: white;
              border-color: #409eff;
              margin-left: 20px;
              align-items: center;
            ">
            <el-icon>
              <ArrowLeft />
            </el-icon>
            Back
          </el-button>

          <!-- 文字标题 -->
          <el-text style="font-size: 24px; font-weight: bold; flex-grow: 1;">
            {{ name ? `${name}  Inventory` : 'Add a new Inventory' }}
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
                  <el-text class="q-text">Name
                    <span class="required-asterisk">*</span>:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Name of the asset."
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="name" placeholder="Please input" clearable />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Asset ID:</el-text>
                  <el-input style="width: 100%" v-model="swid" placeholder="Please input" clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Asset Type<span class="required-asterisk">*</span>:</el-text>
                  <el-select v-model="AssetType" placeholder="Default" style="width: 100%" clearable>
                    <el-option v-for="item in AssetTypes" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Asset Owner<span class="required-asterisk">*</span>:</el-text>
                  <el-autocomplete style="width: 100%" v-model="assetOwner" :fetch-suggestions="querySearch"
                    placeholder="Please input" @select="handleSelect" :trigger-on-focus="false"></el-autocomplete>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Contact:</el-text>
                  <el-input style="width: 100%" v-model="contact" placeholder="Please input" clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Description:</el-text>
                  <el-input style="width: 100%" v-model="description" :autosize="{ minRows: 3, maxRows: 8 }"
                    type="textarea" placeholder="Please input" />
                </el-col>
              </el-row>

              <el-divider class="divider" />
            </div>

            <!-- Dynamic Section Based on Asset Type -->
            <div v-if="AssetType === 'Software'">
              <!-- Software-specific fields -->
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Version
                    <span class="required-asterisk">*</span>:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="The software inventory system should track the name, version, publisher, and install date for all software, including operating systems authorized by the organization."
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="version" placeholder="Please input" clearable />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Install Date<span class="required-asterisk">*</span>:</el-text>
                  <el-date-picker v-model="installDate" type="date" placeholder="Pick a day" style="width: 100%"
                    clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Authorized Operating Systems<span
                      class="required-asterisk">*</span>:</el-text>
                  <el-input style="width: 100%" v-model="authorizedOperatingSystems" placeholder="Please input"
                    clearable />
                </el-col>

                <el-col :span="10" offset="2">
                  <el-text class="q-text">External Supplied Service<span class="required-asterisk">*</span>:</el-text>
                  <el-select v-model="externalSupplied" placeholder="Default" style="width: 100%" clearable>
                    <el-option v-for="item in externalSuppliedOptions" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>

              <div v-if="externalSupplied === 0">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Manufacture:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="The software inventory system should track the name, version, publisher, and install date for all software, including operating systems authorized by the organization."
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-input style="width: 100%" v-model="Manufacture" placeholder="Please input" clearable />
                  </el-col>
                  <el-col :span="10">
                    <el-text class="q-text">Service Type:</el-text>
                    <el-select v-model="ServiceType" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="On-Premises" :value=0 />
                      <el-option label="SaaS" :value=1 />
                      <el-option label="Hybrid" :value=2 />
                      <el-option label="Hosted" :value=3 />
                    </el-select>
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">License Type:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="The organization shall ensure that required data and information about licenses, related entitlements, and usage against entitlements, for all IT assets in scope, is accurately recorded throughout the life cycle; that reconciliations are conducted and assessed periodically between requirements, usage against entitlements, and entitlements; and verified."
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="LicenseType" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Permanent" :value=0 />
                      <el-option label="Subscription" :value=1 />
                      <el-option label="trial" :value=2 />
                      <el-option label="volume licensing" value="volume licensing" />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">License Start and Expire Date:<span
                        class="required-asterisk">*</span>:</el-text>
                    <el-date-picker v-model="dateRange" type="daterange" range-separator="To"
                      start-placeholder="Start date" end-placeholder="End date" :size="size"
                      @change="handleDateRangeChange" />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">License Number:</el-text>
                    <el-input style="width: 100%" v-model="LicenseNumber" placeholder="Please input" clearable />
                  </el-col>
                  <el-col :span="10">
                    <el-text class="q-text">Related Contract Number:</el-text>
                    <el-input style="width: 100%" v-model="RelatedContractNumber" placeholder="Please input"
                      clearable />
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
                  <el-text class="q-text">Physical Asset Type<span class="required-asterisk">*</span>:
                  </el-text>
                  <el-select v-model="physicalAssetType" placeholder="Select" style="width: 100%" clearable>
                    <el-option label="Fixed Physical Asset" :value=0 />
                    <el-option label="Non-fixed Physical Asset" :value=1 />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Depending on the selection, show different fields -->
              <div v-if="physicalAssetType === 0">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Asset Category (Fixed):
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="1. Buildings & Structures a) Office buildings, factories, warehouses b) Data center rooms (including earthquake/fire-resistant structures) c) Laboratories, R&D centers
                                  2. Production Equipment & Machinery a) Industrial machinery: Lathes, injection molding machines, 3D printers b) Production line equipment: Assembly-line robots, packaging machines c) Special equipment: Boilers, pressure vessels (require compliance inspections)
                                  3. Office Equipment a) Computers (desktops, laptops) b) Printers, copiers, projectors c) Telephone systems (IP phones, conference equipment)
                                  4. Transportation Vehicles a) Freight vehicles (trucks, forklifts) b) Business vehicles (sedans, shuttle buses) c) Drones (for logistics/inspections)
                                  5. Network & IT Infrastructure a) Servers (physical servers, blade servers) b) Storage devices (SAN/NAS, tape libraries) c) Networking equipment (routers, firewalls, fiber switches)
                                  6. Power & Utility Equipment a) Generators, UPS (uninterruptible power supplies) b) Power distribution cabinets, transformers c) HVAC systems (data center precision cooling)
                                  7. Security Equipment a) Surveillance cameras, access control systems b) Biometric devices (fingerprint/facial recognition systems) c) Fire protection systems (smoke detectors, sprinklers)"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="fixedAssetCategory" placeholder="Select Category" style="width: 100%" clearable>
                      <el-option label="Buildings & Structures" :value=0 />
                      <el-option label="Production Equipment & Machinery" :value=1 />
                      <el-option label="Office Equipment" :value=2 />
                      <el-option label="Transportation Vehicles" :value=3 />
                      <el-option label="Network & IT Infrastructure" :value=4 />
                      <el-option label="Power & Utility Equipment" :value=5 />
                      <el-option label="Security Equipment" :value=6 />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Location:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Physical/Virtual location (e.g., Data Center A, Rack 3)"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-input style="width: 100%" v-model="Location" placeholder="Enter location" clearable />
                  </el-col>
                </el-row>
              </div>

              <div v-if="physicalAssetType === 1">
                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Asset Category (Non-fixed):
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="1.Mobile Electronic Devices a) Portable devices: i. Laptops, tablets ii. Smartphones, two-way radios iii. External hard drives, USB encryption dongles b) Peripheral tools: i. Portable projectors, barcode scanners ii. Temperature gauges, RFID readers
                                    2.Removable Storage Media a) Magnetic tapes, optical discs (for backup) b) SD cards, portable SSD storage c) Encrypted USB drives (containing sensitive data)
                                    3.Temporary Facilities and Tools a) Construction/maintenance tools: i. Power drills, multimeters, oscilloscopes ii. Temporary lighting equipment, ladders b) Exhibition/event assets: i. Roll-up banners, portable display booths ii. Rented audio equipment, LED screens
                                    4.Transportation and Logistics Assets a) Logistics containers:
                                    i. Pallets, transport containers, company-owned shipping containers ii. Cold chain transport boxes (for pharmaceutical/food industries) b) Short-term leased equipment: i. Temporarily rented forklifts, trucks
                                    5.Laboratory and Production Consumables a) High-value consumables: i. Industrial sensors (reusable) ii. Precision laboratory glassware b) Spare parts: i. Server backup hard drives, network modules
                                    6.Security and Emergency Equipment a) Fire extinguishers (require periodic replacement) b) Portable surveillance cameras c) Mobile backup generators
                                    7.Other High-Mobility Assets a) Employee assets: i. ID badges, access cards (can be deactivated if lost) ii. Issued uniforms, safety helmets b) Customer assets: i. Equipment leased to customers (e.g., shared power banks)"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="nonFixedAssetCategory" placeholder="Select Category" style="width: 100%"
                      clearable>
                      <el-option label="Mobile Electronic Devices" :value=0 />
                      <el-option label="Removable Storage Media" :value=1 />
                      <el-option label="Temporary Facilities and Tools" :value=2 />
                      <el-option label="Transportation and Logistics Assets" :value=3 />
                      <el-option label="Laboratory and Production Consumables" :value=4 />
                      <el-option label="Security and Emergency Equipment" :value=5 />
                      <el-option label="Other High-Mobility Assets" :value=6 />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Current Holder:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Employee/Department using the asset"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-input style="width: 100%" v-model="CurrentHolder" placeholder="Please input" clearable />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Checkout Date:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Date assigned to holder"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-date-picker v-model="CheckoutDate" type="date" placeholder="Pick a day" style="width: 100%"
                      clearable />
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Expected Return Date:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="For temporary assets."
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-date-picker v-model="ExpectedReturnDate" type="date" placeholder="Pick a day"
                      style="width: 100%" clearable />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Condition:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Physical state (e.g., Damaged/Good)"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="Condition" placeholder="Select Condition" style="width: 100%" clearable>
                      <el-option label="Good" :value=1 />
                      <el-option label="Damaged" :value=0 />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Data Encryption:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Whether storage is encrypted"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="DataEncryption" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes" :value=1 />
                      <el-option label="No" :value=0 />
                    </el-select>
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Remote Wipe Capability:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Critical for lost devices"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="RemoteWipeCapability" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes" :value=1 />
                      <el-option label="No" :value=0 />
                    </el-select>
                  </el-col>
                </el-row>
              </div>

              <el-divider class="divider" />

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Purchase Date:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Date of acquisition"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-date-picker v-model="PurchaseDate" type="date" placeholder="Pick a day" style="width: 100%"
                    clearable />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Depreciation Period:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Lifespan for accounting"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="DepreciationPeriod" @blur="validateDepreciationPeriod" />
                </el-col>
              </el-row>
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Maintenance Cycle:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Scheduled maintenance frequency  e.g.1) Daily, Weekly, Every 72 Operating Hours 2)Monthly, Quarterly, Every 5000 km 3) Annually, Biannually, Every 5 Years 4)As Needed, After Event, On Failure"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-select v-model="MaintenanceCycle" placeholder="Select Cycle" style="width: 100%" clearable>
                    <el-option label="Daily, Weekly, Every 72 Operating Hours" :value=0 />
                    <el-option label="Monthly, Quarterly, Every 5000 km" :value=1 />
                    <el-option label="Annually, Biannually, Every 5 Years" :value=2 />
                    <el-option label="As Needed, After Event, On Failure" :value=3 />
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
                  <el-text class="q-text">Retention Policy:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Legal retention period"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-select v-model="informationRetentionPolicy" placeholder="Select Policy" style="width: 100%"
                    clearable>
                    <el-option label="Permanent" :value=0 />
                    <el-option label="5 Years" :value=1 />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Storage Location:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Physical/cloud storage path"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="informationStorageLocation" placeholder="Please input"
                    clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Asset Category<span class="required-asterisk">*</span>:</el-text>
                  <el-select v-model="InformationAssetCategory" placeholder="Select Type" style="width: 100%" clearable>
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
                    <el-text class="q-text">Data Schema:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Database engine"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="DataSchema" placeholder="Select Schema" style="width: 100%" clearable>
                      <el-option label="MySQL" :value=0 />
                      <el-option label="MongoDB" :value=1 />
                      <el-option label="Other" :value=2 />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Version:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Database version"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-input style="width: 100%" v-model="databaseVersion" placeholder="Please input" clearable />
                  </el-col>
                </el-row>

                <el-row gutter="{20}">
                  <el-col :span="10">
                    <el-text class="q-text">Contains PII:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Triggers GDPR compliance workflows"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="containsPII" placeholder="Select" style="width: 100%" clearable>
                      <el-option label="Yes" :value=1 />
                      <el-option label="No" :value=0 />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Backup Frequency:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Backup policy"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="backupFrequency" placeholder="Select Frequency" style="width: 100%" clearable>
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
                    <el-text class="q-text">File Format:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Document type"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="fileFormat" placeholder="Select Format" style="width: 100%" clearable>
                      <el-option label="PDF" :value=0 />
                      <el-option label="DOCX" :value=1 />
                      <el-option label="CAD" :value=2 />
                      <el-option label="Other" :value=3 />
                    </el-select>
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Confidentiality Level:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Access control basis"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-select v-model="confidentialityLevel" placeholder="Select Level" style="width: 100%" clearable>
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
                    <el-text class="q-text">Registration Number:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Patent/trademark ID"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-input style="width: 100%" v-model="registrationNumber" placeholder="Please input" clearable />
                  </el-col>
                  <el-col :span="10" offset="2">
                    <el-text class="q-text">Expiry Date:
                      <el-tooltip
                          class="item"
                          effect="dark"
                          content="Legal expiration date"
                          placement="top"
                      >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                      </el-tooltip>
                    </el-text>
                    <el-date-picker v-model="expiryDate" type="date" placeholder="Pick a day" style="width: 100%"
                      clearable />
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
                  <el-text class="q-text">Department:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Department of the employee"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="department" placeholder="Please input" clearable />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Position:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Current job title or role"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="position" placeholder="Please input" clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Hire Date:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Date of joining"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-date-picker v-model="hireDate" type="date" placeholder="Pick a day" style="width: 100%"
                    clearable />
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Background Check Status:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Whether the background check has been completed"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-select v-model="backgroundCheckStatus" placeholder="Select Status" style="width: 100%" clearable>
                    <el-option label="Completed" :value=0 />
                    <el-option label="Pending" :value=1 />
                    <el-option label="Failed" :value=2 />
                    <el-option label="Expired" :value=3 />
                    <el-option label="Not Required" :value=4 />
                  </el-select>
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Security Training Status:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Whether the security awareness training is completed"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-select v-model="securityTrainingStatus" placeholder="Select Status" style="width: 100%" clearable>
                    <el-option label="Completed" :value=0 />
                    <el-option label="Pending" :value=1 />
                    <el-option label="Failed" :value=2 />
                    <el-option label="Expired" :value=3 />
                    <el-option label="Not Required" :value=4 />
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <el-text class="q-text">NDA Signing Date:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Date of signing confidentiality agreement/employment contract"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-date-picker v-model="NDASigningDate" type="date" placeholder="Pick a day" style="width: 100%"
                    clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Remote Work Agreement Status:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Whether the remote work agreement is signed"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-select v-model="RemoteWorkAgreementStatus" placeholder="Select Status" style="width: 100%"
                    clearable>
                    <el-option label="Yes" :value=1 />
                    <el-option label="No" :value=0 />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Security Incident Records:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Records of any security incidents involving the employee"
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="securityIncidentRecords" placeholder="Please input"
                    clearable />
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Last Audit Date:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Date of the last audit check of the employee's asset responsibilities and usage"
                        placement="top"
                    >
                      <spans
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</spans
                      >
                    </el-tooltip>
                  </el-text>
                  <el-date-picker v-model="LastAuditDate" type="date" placeholder="Pick a day" style="width: 100%"
                    clearable />
                </el-col>
              </el-row>

              <el-divider class="divider" />
            </div>

            <!-- Status, Importance, Associated Assets Section -->
            <div class="basicInfo-second">
              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Status<span class="required-asterisk">*</span>:</el-text>
                  <el-select v-model="status" placeholder="Default" style="width: 100%" clearable>
                    <el-option v-for="item in Status" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>
                <el-col :span="10" offset="2">
                  <el-text class="q-text">Importance<span class="required-asterisk">*</span></el-text>
                  <el-select v-model="importance" placeholder="Default" style="width: 100%" clearable>
                    <el-option v-for="item in Importances" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>
              </el-row>

              <el-row gutter="{20}">
                <el-col :span="10">
                  <el-text class="q-text">Associated Assets:
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="An inventory of information and other associated assets, including owners, shall be developed and maintained."
                        placement="top"
                    >
                      <span
                          style="
                          cursor: pointer;
                          color: blue;
                          font-size: 16px;
                          margin-left: 5px;
                        "
                      >❓</span
                      >
                    </el-tooltip>
                  </el-text>
                  <el-input style="width: 100%" v-model="associatedAssets" :autosize="{ minRows: 2, maxRows: 2 }"
                    type="textarea" placeholder="Please input" />
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
    this.name = this.$route.query.name;
    this.fromPage = this.$route.query.fromPage;
    this.pageName = this.$route.query.pageName;
    this.Pre_filled();
  },
  data() {
    return {
      showConfirmDialog: false,
      leaveConfirmed: false,
      targetRoute: null,
      dateRange: [],
      searchTimeout: false,
      name: "",
      assetID: "",
      fromPage: "",
      pageName: "",
      swid: "",
      AssetType: "",
      assetOwner: "",
      assetOwnerID: 0,
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
      LicenseExpireDate: "",
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
      DepreciationPeriod: "",
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
    querySearch(queryString, cb) {
      this.assetOwnerID = 0
      if (queryString.length < 2) {
        cb([])
        return
      }

      // 防抖处理
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }

      this.searchTimeout = setTimeout(async () => {
        try {
          const response = await axios.get(API_BASE_URL + '/user/search', {
            params: { query: queryString }
          })
          if (response.data.success) {
            console.log(response.data)
            const results = response.data.users.map(user => ({
              value: user.name,
              id: user.id
            }))

            cb(results)
          }
        } catch (error) {
          console.error('搜索用户失败:', error)
          cb([])
        }
      }, 1000)
    },

    handleSelect(item) {
      this.assetOwner = item.value
      this.assetOwnerID = item.id
      // console.log(this.assetOwnerID)
    },
    handleDateRangeChange(val) {
      // console.log(this.dateRange)
      this.LicenseStartDate = val ? val[0] : null;
      this.LicenseExpireDate = val ? val[1] : null;
    },
    validateDepreciationPeriod() {
      const value = this.DepreciationPeriod;
      if (value < 0 || value > 100) {
        this.$message.error('Depreciation Period must be between 0 and 100!');
        // 可选：自动重置为合法值
        this.DepreciationPeriod = "";
      }
    },
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
          this.assetOwnerID = response.data.data.assetOwner.assetUserId;
          this.contact = response.data.data.contact;
          this.description = response.data.data.description;
          this.status = response.data.data.status;
          this.importance = response.data.data.importance;
          this.associatedAssets = response.data.data.associatedAssets;
          //映射Software
          if (this.AssetType == 'Software') {
            this.version = response.data.data.version;
            this.installDate = response.data.data.installDate;
            this.authorizedOperatingSystems = response.data.data.operatingSystems;
            this.externalSupplied = response.data.data.externalSuppliedService;
            this.Manufacture = response.data.data.manufacture;
            this.ServiceType = response.data.data.serviceType;
            this.LicenseType = response.data.data.licenseType;
            this.LicenseStartDate = response.data.data.licenseStartDate;
            this.LicenseExpireDate = response.data.data.licenseEndDate;
            this.dateRange = [this.LicenseStartDate, this.LicenseExpireDate]
            this.LicenseNumber = response.data.data.licenseNumber;
            this.RelatedContractNumber = response.data.data.relatedContractNumber;
          }
          //映射physical
          if (this.AssetType == 'Physical') {
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
          if (this.AssetType == 'Information') {
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
          // 映射people
          if (this.AssetType == 'People') {
            this.department = response.data.data.department;
            this.position = response.data.data.position;
            this.hireDate = response.data.data.hireDate;
            this.backgroundCheckStatus = response.data.data.backgroundCheckStatus;
            this.securityTrainingStatus = response.data.data.securityTrainingStatus;
            this.NDASigningDate = response.data.data.ndaSigningDate;
            this.RemoteWorkAgreementStatus = response.data.data.remoteWorkAgreementStatus;
            this.securityIncidentRecords = response.data.data.securityIncidentRecords;
            this.LastAuditDate = response.data.data.lastAuditDate;
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

   // handleBackClick() {
   //   this.showConfirmDialog = true; // 显示确认弹窗
   //   this.$router.go(-1);
   // },

    handleBackClick() {
      const fromPage = this.$route.query.fromPage || 1; // Get the page from query params
      const pageName = this.$route.query.pageName || '';
      if(pageName == 'AssetInventory'){
        this.$router.push({
          path: '/home/asset-inventory',
          query: { page: fromPage } // Pass it back to the list view
        });
      }
      if(pageName == 'EvidenceChain'){
        this.$router.push({
          path: '/home/evidence-chain',
          query: { page: fromPage } // Pass it back to the list views
        });
      }

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
      let emptyField = true;

      if (this.name === "" || this.name === null || this.name === undefined) {
        this.$message.error("Name is required.");
        return;
      }

      if (
        this.AssetType === "" ||
        this.AssetType === null ||
        this.AssetType === undefined
      ) {
        this.$message.error("Asset Type is required.");
        return;
      }

      if (
        this.assetOwner === "" ||
        this.assetOwner === null ||
        this.assetOwner === undefined
      ) {
        this.$message.error("Asset Owner is required.");
        return;
      }
      if (this.assetOwnerID <= 0) {
        this.$message.error("There is no such user.");
        return;
      }
      if (
        this.status === "" ||
        this.status === null ||
        this.status === undefined
      ) {
        this.$message.error("Status is required.");
        return;
      }

      if (
        this.importance === "" ||
        this.importance === null ||
        this.importance === undefined
      ) {
        this.$message.error("Importance is required.");
        return;
      }

      // 总体的空字符串判断
      if (this.swid == "" || this.contact == "" || this.description == "") {
        emptyField = true;
      } else {
        emptyField = false;
      }

      let payload = {
        id: this.assetID,
        assetName: this.name,
        swid: this.swid || null,
        assetOwner: this.assetOwnerID,
        contact: this.contact || null,
        description: this.description || null,
        status: this.status,
        importance: this.importance,
        associatedAssets: this.associatedAssets || null,
      }
      // -----------------------------Software -----------------------------
      if (this.AssetType === 'Software') {
        // 必填字段验证
        if (this.version === "" ||
          this.version === null ||
          this.version === undefined) {
          this.$message.error("Version is required for Software assets.");
          return;
        }
        if (!this.installDate) {
          this.$message.error("Install Date is required for Software assets.");
          return;
        }

        if (this.authorizedOperatingSystems === "" ||
          this.authorizedOperatingSystems === null ||
          this.authorizedOperatingSystems === undefined) {
          this.$message.error("Authorized Operating Systems is required.");
          return;
        }
        if (this.externalSupplied === "" ||
          this.externalSupplied === null ||
          this.externalSupplied === undefined) {
          this.$message.error("Authorized Operating Systems is required.");
          return;
        }
        // 空子段填写判断
        if (this.externalSupplied == 0) {
          emptyField = emptyField || this.Manufacture === "" || this.ServiceType == "" || this.LicenseType == "" || this.LicenseStartDate == "" || this.LicenseExpireDate == "" || this.LicenseNumber == "" || this.RelatedContractNumber == "";
        }
        // 字段填写
        payload = {
          ...payload,
          AssetType: 0,
          EmptyField: emptyField ? 0 : 1,
          version: this.version,
          installDate: this.installDate,
          operatingSystems: this.authorizedOperatingSystems,
          externalSuppliedService: this.externalSupplied,
          manufacture: this.Manufacture || null,
          serviceType: this.ServiceType || null,
          licenseType: this.LicenseType || null,
          licenseStartDate: this.LicenseStartDate || null,
          licenseEndDate: this.LicenseExpireDate || null,
          licenseNumber: this.LicenseNumber || null,
          relatedContractNumber: this.RelatedContractNumber || null,
        };
      }
      // -------------------------------------Physical------------------------------
      if (this.AssetType === 'Physical') {
        if (this.physicalAssetType==="") {
          this.$message.error("Physical Asset Type is required");
          return;
        }
        emptyField = emptyField || this.PurchaseDate === "" || this.DepreciationPeriod === "" || this.MaintenanceCycle === "";
        payload = {
          ...payload,
          AssetType: 1,
          physicalAssetType: this.physicalAssetType,
          epurchaseDate: this.PurchaseDate || null,
          depreciationPeriod: this.DepreciationPeriod || null,
          maintenanceCycle: this.MaintenanceCycle || null,
        };
        if (this.physicalAssetType === 0) {
          emptyField = emptyField || this.fixedAssetCategory === "" || this.Location === "";
          payload = {
            ...payload,
            EmptyField: emptyField ? 0 : 1,
            assetCategory: this.fixedAssetCategory,
            location: this.Location || null,
          }
        } else {
          emptyField = emptyField || this.nonFixedAssetCategory === "" || this.CurrentHolder === ""
            || this.CheckoutDate === "" || this.ExpectedReturnDate === "" || this.Condition === "" || this.DataEncryption === "" || this.RemoteWipeCapability === "";
          payload = {
            ...payload,
            EmptyField: emptyField ? 0 : 1,
            assetCategory2: this.nonFixedAssetCategory,
            currentHolder: this.CurrentHolder || null,
            checkoutDate: this.CheckoutDate || null,
            expectedReturnDate: this.ExpectedReturnDate || null,
            conditions: this.Condition || null,
            dateEncryption: this.DataEncryption || null,
            remoteWipeCapability: this.RemoteWipeCapability || null,
          }
        }
      }
      // -------------------------------------------Information----------------------------------
      if (this.AssetType === 'Information') {
        if (this.InformationAssetCategory==="") {
          this.$message.error("Information Asset Category is required");
          return;
        }
        emptyField = emptyField || this.informationRetentionPolicy === "" || this.informationStorageLocation === "";
        payload = {
          ...payload,
          AssetType: 2,
          informationRetentionPolicy: this.informationRetentionPolicy,
          informationStorageLocation: this.informationStorageLocation || null,
          informationAssetCategory: this.InformationAssetCategory,
        };
        if(this.InformationAssetCategory==0){
          emptyField = emptyField || this.databaseVersion === "" || this.DataSchema === ""|| this.containsPII === "" || this.backupFrequency === "";
          payload = {
            ...payload,
            EmptyField: emptyField ? 0 : 1,
            databaseVersion: this.databaseVersion || null,
            DataSchema: this.DataSchema || null,
            containsPII: this.containsPII,
            backupFrequency: this.backupFrequency,
          }
        }
        if(this.InformationAssetCategory==1){
          emptyField = emptyField || this.fileFormat === "" || this.confidentialityLevel === "";
          payload = {
            ...payload,
            EmptyField: emptyField ? 0 : 1,
            fileFormat: this.fileFormat,
            confidentialityLevel: this.confidentialityLevel
          }
        }
        if(this.InformationAssetCategory==2){
          emptyField = emptyField || this.registrationNumber === "" || this.expiryDate === "";
          payload = {
            ...payload,
            EmptyField: emptyField ? 0 : 1,
            registrationNumber: this.registrationNumber || null,
            expiryDate: this.expiryDate || null,
          }
        }
      }
      // --------------------------------People-------------------------------------
      if(this.AssetType === 'People'){
        emptyField = emptyField || this.registrationNumber === "" || this.expiryDate === "";
        payload = {
          ...payload,
          AssetType: 3,
          EmptyField: emptyField ? 0 : 1,
          department: this.department || null,
          position: this.position || null,
          hireDate: this.hireDate || null,
          backgroundCheckStatus: this.backgroundCheckStatus,
          securityTrainingStatus: this.securityTrainingStatus,
          NDASigningDate: this.NDASigningDate || null,
          RemoteWorkAgreementStatus: this.RemoteWorkAgreementStatus,
          securityIncidentRecords: this.securityIncidentRecords || null,
          LastAuditDate: this.LastAuditDate || null,
        };
      }
      // POST 请求到后端
      try {
        const response = await axios.post(
          API_BASE_URL+'/inventory/save',
          payload
        );
        if(response.data.success){
          console.log("Data sent to backend:", response.data); // 控制台显示后端响应
          this.assetID = response.data.id;
          this.$message.success(response.data.message+" successfully!");
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
        this.$message.error("Failed to save data. Please try again!");
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
  padding: 0 10%;
  /* 添加左右内边距，让内容向中间聚集 */
}

.el-col {
  flex: 1 1 48%;
  /* 每个输入框占用 48% 宽度 */
  padding-right: 20px;
  box-sizing: border-box;
}

.el-row>.el-col:last-child {
  margin-left: 0;
}

.el-row>.el-col:first-child {
  margin-right: 0;
}

/* 当只有一个输入框时，让它占满一行并左对齐 */
.el-row>.el-col:only-child {
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
