const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "~@/assets/styles/utils/variables.scss";
          @import "~@/assets/styles/utils/reusables.scss";
        `,
      },
    },
  },
});
