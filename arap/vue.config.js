const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: {
        warnings: false, // 禁用警告
        errors: false, // 禁用错误
      },
    },
  },
});
