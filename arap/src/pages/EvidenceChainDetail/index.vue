<template>
  <div>
    <Header />
    <div class="main">
      <div class="pdf-viewer-container">
        <!-- PDF查看器 -->
        <iframe v-if="pdfUrl" :src="pdfUrl" class="pdf-viewer" @load="handlePdfLoad"></iframe>

        <!-- 加载状态 -->
        <div v-if="loading" class="loading-state">
          <el-icon class="is-loading">
            <Loading />
          </el-icon>
          <span>PDF加载中...</span>
        </div>

        <!-- 错误状态 -->
        <div v-if="error" class="error-state">
          <el-icon>
            <CircleCloseFilled />
          </el-icon>
          <span>加载PDF失败</span>
          <el-button type="primary" @click="retryLoading">重试</el-button>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="goBack()">Exit</el-button>
      </div>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import Footer from "../../components/Footer.vue";
import axios from "axios";
import { API_BASE_URL } from "@/components/axios";
import { Loading, CircleCloseFilled } from '@element-plus/icons-vue';

export default {
  components: {
    Header,
    Footer,
    Loading,
    CircleCloseFilled
  },
  data() {
    return {
      pdfUrl: "",
      loading: true,
      error: false,
    };
  },
  mounted() {
    console.log("组件已挂载");
    this.fetchPdfUrl();
  },
  methods: {
    goBack() {
      this.$router.push("/home/evidence-chain");
    },
    async fetchPdfUrl() {
      this.loading = true;
      this.error = false;

      const evidenceChainId = this.$route.query.id;
      if (!evidenceChainId) {
        this.handleError('缺少证据链ID');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/evidence_chain/get_pdf_url`, {
          params: { id: evidenceChainId }
        });
        console.log(response.data)
        if (response.data.url) {
          this.pdfUrl = response.data.url;
        } else {
          this.handleError('无效的PDF URL');
        }
      } catch (err) {
        this.handleError('获取PDF链接失败');
        console.error('获取PDF URL失败:', err);
      }
    },

    handlePdfLoad() {
      this.loading = false;
      this.error = false;
    },

    handleError(message) {
      this.$message.error(message);
      this.loading = false;
      this.error = true;
    },

    retryLoading() {
      this.fetchPdfUrl();
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: #92A4BD;
  position: fixed;
  bottom: 0px;
  height: 5vh;
  width: 100%;
  margin: 0;
}

.main {
  height: 86.5vh;
  width: 100%;
  margin-top: 8.5vh;
  margin-left: 0;
}

/* .content {
  padding: 20px;
  min-height: calc(100vh - 120px);
} */

.pdf-viewer-container {
  position: relative;
  margin: 0 auto;
  max-width: 1200px;
  height: 95%;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.pdf-viewer {
  width: 100%;
  height: 100%;
  border: none;
}

.loading-state,
.error-state {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
}

.error-state {
  color: #f56c6c;
}

.is-loading {
  animation: rotating 2s linear infinite;
  font-size: 40px;
  margin-bottom: 20px;
  color: #409eff;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>