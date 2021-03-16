import Vue from "vue"

import "normalize.css"

import App from "./App.vue"
import router from "./router"
import store from "./store"

// svg icon
import "@/icons" // icon

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
