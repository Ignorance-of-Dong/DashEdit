/*
 * @Author: xiaowei
 * @Date: 2025-11-03 16:16:15
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 10:46:08
 * @Description:
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { FactverseBIResolver } from "@factverse-bi/resolver";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [
        // FactverseBIResolver({
        //   importStyle: "sass",
        // }),
      ],
      dts: true,
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ["vue", "pinia", "vue-router"],
      resolvers: [],
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      vueTemplate: true,
      dts: true, //auto generation auto-imports.d.ts file
    }),
  ],
  server: {
    hmr: true,
    port: 8888,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://dtcs-dev.datamesh.com/",
        changeOrigin: true,
      },
    },
  },
});
