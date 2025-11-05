/*
 * @Author: xiaowei
 * @Date: 2025-11-03 16:16:15
 * @LastEditors: xiaowei
 * @LastEditTime: 2025-11-04 11:25:22
 * @Description:
 */
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import FactVerseBI from "factverse-bi";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(FactVerseBI);

app.mount("#app");
