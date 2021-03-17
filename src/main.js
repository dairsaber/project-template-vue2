import Vue from "vue"

import "normalize.css"
import "element-ui/lib/theme-chalk/index.css"
import "@/styles/index.scss"

import locale from "element-ui/lib/locale/lang/zh-CN"

import ElementUI from "element-ui"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { debugLogger } from "@/utils/debugLogger"
// svg icon
import "@/icons"

import "@/permission" // permission control
Vue.prototype.debugLogger = debugLogger

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
