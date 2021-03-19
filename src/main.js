import Vue from "vue"
import Cookies from "js-cookie"

import "normalize.css"
import "element-ui/lib/theme-chalk/index.css"
import "@/styles/index.scss"

import locale from "element-ui/lib/locale/lang/zh-CN"

import ElementUI from "element-ui"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { debugLogger } from "@/utils/debug-logger"
// svg icon
import "@/icons"
import "@/permission" // permission control
import "./utils/error-log" // error log

// add fastclick to fix 300ms delay for mobile browser
import FastClick from "fastclick"
FastClick.attach(document.body)

Vue.prototype.debugLogger = debugLogger

Vue.use(ElementUI, {
  size: Cookies.get("size") || "medium", // set element-ui default size
  locale,
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
