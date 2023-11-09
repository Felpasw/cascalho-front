import "vuesax/dist/vuesax.css";
import "./assets/base.css";
import { store } from "./store/index";

import Vue from "vue";

import App from "./App.vue";
import router from "./router";

import Vuesax from "vuesax";

Vue.use(Vuesax, {
  colors: {
    primary: "#F39F5A",
    danger: "#AE445A",
    warn: "#662549",
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
