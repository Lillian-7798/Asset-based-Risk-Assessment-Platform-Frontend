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
          >The treatment will not be saved, are you sure you want to exit?</span
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
            {{ riskname }}
          </el-text>
        </div>
        <div style="height: 20px"></div>
      </div>

      <div class="sub-content">
        <el-scrollbar height="80vh">
          <div class="form-rows">
            <!-- Basic Info Section -->
            <div>
              <!-- RiskLevel -->
              <el-row gutter="{20}">
                <el-col :span="10" style="text-align: left">
                  <el-text class="q-text">
                    Risk Level<span class="required-asterisk">*</span>:</el-text
                  >
                  <el-select
                    v-model="RiskLevel"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Very High" value="veryhigh" />
                    <el-option label="High" value="high" />
                    <el-option label="Medium" value="medium" />
                    <el-option label="Low" value="low" />
                    <el-option label="Very low" value="verylow" />
                  </el-select>
                </el-col>
                <el-col :span="10" style="text-align: left">
                  <el-text class="q-text">Upload evidence:</el-text>
                  <el-upload
                    ref="upload"
                    class="upload-demo"
                    drag
                    :action="`http://localhost:8081/api/file/upload/${rid}`"
                    :on-change="handleFileChange"
                    :file-list="fileList"
                    :auto-upload="false"
                    :limit="5"
                  >
                    <!-- 需要改成传输treatmentid 虽然之后展示有点麻烦 -->
                    <!-- 因为一一对应，后端改treatmentid值在生成的时候等于rid的值即可 这样展示已上传文件和其他都方便 -->
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      Drag and drop files here or click to upload(max files=5)
                    </div>
                  </el-upload>
                  <!-- <el-upload action="/api/upload" multiple :data="uploadData">
                    <el-button type="primary">上传文件</el-button>
                  </el-upload> -->
                  <el-text class="q-text"
                    >Evidence Uploaded<span class="required-asterisk">*</span
                    >:</el-text
                  >

                  <div v-if="uploadedFiles.length" style="margin-top: 10px">
                    <div
                      v-for="(file, index) in uploadedFiles"
                      :key="index"
                      class="file-item"
                    >
                      <span
                        @click="openFile(file)"
                        style="
                          cursor: pointer;
                          color: #409eff;
                          text-decoration: underline;
                        "
                      >
                        {{ file.original_name }}
                      </span>
                    </div>
                  </div>
                </el-col>
              </el-row>

              <!-- Treatment Option -->
              <el-row gutter="{20}">
                <el-col :span="10" style="text-align: left">
                  <el-text class="q-text">
                    Treatment Option<span class="required-asterisk">*</span>:
                    <el-tooltip
                      class="item"
                      trigger="hover"
                      placement="top"
                      width="200"
                      :content="tooltipContent"
                    >
                      <span
                        style="
                          cursor: pointer;
                          vertical-align: middle; /* 添加这行 */
                          font-size: 16px;
                          margin-left: 5px;
                        "
                        ><el-icon> <InfoFilled /> </el-icon
                      ></span>
                    </el-tooltip>
                  </el-text>
                  <el-select
                    v-model="TreatmentOption"
                    placeholder="Select"
                    style="width: 100%"
                    clearable
                  >
                    <el-option label="Risk Avoidance" value="RiskAvoidance" />
                    <el-option
                      label="Risk Modification"
                      value="RiskModification"
                    />
                    <el-option label="Risk Retention" value="RiskRetention" />
                    <el-option label="Risk Sharing" value="RiskSharing" />
                  </el-select>
                </el-col>
              </el-row>

              <!-- Comments-->
              <el-row gutter="{20}">
                <el-col :span="10" style="text-align: left">
                  <el-text class="q-text">Comments:</el-text>
                  <el-input
                    style="width: 100%"
                    v-model="comments"
                    :autosize="{ minRows: 3, maxRows: 8 }"
                    type="textarea"
                    placeholder="Please input"
                  />
                </el-col>
                <el-col :span="10" style="text-align: left">
                  <el-text class="q-text"
                    >Comments form assigner:<br
                  /></el-text>
                  <el-text class="q-text">{{ commentsFromAssigner }}</el-text>
                </el-col>
              </el-row>
              <!-- Comments -->
            </div>

            <el-divider class="divider" />
          </div>

          <el-row
            justify="center"
            style="
              width: 100%;
              margin: 0;
              padding: 0;
              display: flex;
              gap: 10px;
              justify-content: center;
            "
          >
            <!-- Save button -->
            <el-col :span="6" style="text-align: center; padding: 0; margin: 0">
              <el-button
                type="primary"
                round
                @click="handleSave"
                style="width: 50%"
                >Save</el-button
              >
            </el-col>

            <!-- Done button -->
            <el-col :span="6" style="text-align: center; padding: 0; margin: 0">
              <el-button
                type="success"
                round
                @click="handleDone"
                style="width: 50%"
                >Done</el-button
              >
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
      uploadedFiles: [], // 存储已上传的文件列表
      rid: this.$route.query.rid, // 无默认值了，要是rid没有传就会报错
      riskname: this.$route.query.riskname || "default riskname", // 默认值为 "default riskname"
      commentsFromAssigner: "", // 默认值
      tooltipContent: `
        Risk treatment involves selecting and implementing measures to address identified risks. Four primary strategies:
        1. Risk Avoidance: Completely eliminating the activity or process that creates the risk.
        1.1 When the risk is too severe (e.g., catastrophic impact).
        1.2 No feasible controls can mitigate the risk to an acceptable level.
        2. Risk Modification: Reducing either the likelihood (chance of the risk occurring) or the impact (severity of consequences if it occurs).
        2.1 The risk is manageable but requires controls.
        2.2 Cost of mitigation is less than potential loss.
        3. Risk Retention (Acceptance): Consciously accepting the risk without further action.
        3.1 The risk is low-priority or cost to mitigate outweighs benefits.
        3.2 No better treatment options exist (e.g., rare but unavoidable risks).
        4. Risk Sharing (Transfer): Shifting part or all of the risk to another party.
        4.1 The organization cannot bear the full impact alone.
        4.2 External parties can manage the risk more effectively.
      `,
      showConfirmDialog: false,
      leaveConfirmed: false,
      targetRoute: null,
      RiskLevel: "",
      TreatmentOption: "",
      comments: "",
      fileList: [],
      savedFiles: [], // 保存的文件列表（从localStorage读取）
    };
  },
  created() {
    this.fetchUploadedFiles();
    this.fetchComments(); // 组件创建时加载 comments
    // 在组件加载时从localStorage读取已保存的文件列表
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    this.savedFiles = savedFiles;
  },
  computed: {
    // 合并 fileList 和 savedFiles 显示
    allFiles() {
      return [...this.savedFiles, ...this.fileList];
    },
  },
  methods: {
    fetchUploadedFiles() {
      axios
        .get(`http://localhost:8081/api/file/find/${this.rid}`)
        .then((response) => {
          this.uploadedFiles = response.data; // 假设返回的数据是一个数组
        })
        .catch((error) => {
          console.error("Error fetching files:", error);
        });
    },

    // 打开文件
    openFile(file) {
      // 从 file_path 中提取文件的路径，去掉 'static\' 部分
      const filePath = file.file_path.split("static\\")[1]; // 提取路径部分
      const fileUrl = `http://localhost:8081/files/${filePath.replace(
        /\\/g,
        "/"
      )}`; // 替换路径中的 \ 为 /

      // 在新标签页中打开文件链接
      window.open(fileUrl, "_blank");
    },

    fetchComments() {
      axios
        .get(`http://localhost:8081/api/risk_relationship/${this.rid}`)
        .then((response) => {
          this.commentsFromAssigner = response.data;
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList; // 更新当前的文件列表
    },

    // 删除文件
    deleteFile(index) {
      if (index < this.savedFiles.length) {
        // From savedFiles, remove the file
        this.savedFiles.splice(index, 1);
      } else {
        // From fileList, remove the file
        this.fileList.splice(index - this.savedFiles.length, 1);
      }

      // Update localStorage with the new saved files
      localStorage.setItem("uploadedFiles", JSON.stringify(this.savedFiles));
      //这里先不用数据库显示？感觉挺好
    },

    goBack() {
      if (window.history.length > 1) {
        this.$router.back(); // 有历史记录则返回上一页
      } else {
        this.$router.push("/home/my-risk"); // 否则跳转到默认页
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
        !this.RiskLevel ||
        !this.TreatmentOption ||
        this.allFiles.length === 0 // Check if allFiles is empty
      ) {
        alert("All fields with * must be filled!");
        return;
      }

      // Done action
      const formData = {
        RiskLevel: this.RiskLevel,
        TreatmentOption: this.TreatmentOption,
        comments: this.comments,
        Done: "Finished", // 新增字段 Done，存储 "Finished"
      };
      this.$refs.upload.submit(); // 触发上传操作
      let storedData = JSON.parse(localStorage.getItem("RisksHomepage")) || [];
      storedData.push(formData);
      localStorage.setItem("RisksHomepage", JSON.stringify(storedData));
      // Retrieve saved files from localStorage, merge with current fileList
      let savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
      const allFiles = [...savedFiles, ...this.fileList];

      // Save the updated files list to localStorage
      localStorage.setItem("uploadedFiles", JSON.stringify(allFiles));

      // Update savedFiles in the component to reflect the saved files
      this.savedFiles = [...allFiles];

      // Clear fileList after saving
      this.fileList = [];

      // POST 请求到后端
      try {
        const response = await axios.post(
          // "http://localhost:8081/api/risk_treatment/save/3", //这个id是要换的，根据主界面传入的id来换，这里先展示1
          `http://localhost:8081/api/risk_treatment/save/${this.rid}`,
          formData
        );
        console.log("Data sent to backend:", response.data); // 控制台显示后端响应
        alert("Data saved and sent to backend successfully!");

        // Second POST request: Update treatment status in risk_relationship table
        const response2 = await axios.post(
          `http://localhost:8081/api/risk_relationship/change/${this.rid}`
        );
        console.log("Treatment status updated:", response2.data); // Log backend response for the second request
        alert("Treatment status updated successfully!");
      } catch (error) {
        console.error("Error sending data to backend:", error);
        alert("Failed to send data to backend.");
      }

      //alert("Treatment is finished. All data has been successfully saved!");
    },
    async handleSave() {
      const formData = {
        RiskLevel: this.RiskLevel,
        TreatmentOption: this.TreatmentOption,
        comments: this.comments,
        Done: "In-progress", // 新增字段 Done
      };
      //测试文件上传
      this.$refs.upload.submit(); // 触发上传操作

      let storedData = JSON.parse(localStorage.getItem("RisksHomepage")) || [];
      storedData.push(formData);
      localStorage.setItem("RisksHomepage", JSON.stringify(storedData));
      // Retrieve saved files from localStorage, merge with current fileList
      let savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
      const allFiles = [...savedFiles, ...this.fileList];

      // Save the updated files list to localStorage
      localStorage.setItem("uploadedFiles", JSON.stringify(allFiles));

      // Update savedFiles in the component to reflect the saved files
      this.savedFiles = [...allFiles];

      // Clear fileList after saving
      this.fileList = [];

      // POST 请求到后端
      try {
        const response = await axios.post(
          // "http://localhost:8081/api/risk_treatment/save/3", //这个id是要换的，根据主界面传入的id来换，这里先展示1
          `http://localhost:8081/api/risk_treatment/save/${this.rid}`,
          formData
        );
        console.log("Data sent to backend:", response.data); // 控制台显示后端响应
        alert("Data saved and sent to backend successfully!");
      } catch (error) {
        console.error("Error sending data to backend:", error);
        alert("Failed to send data to backend.");
      }

      //alert("Data saved successfully!");
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
