import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Tacklebox from "@narrative.io/tackle-box";
import "@narrative.io/tackle-box/dist/tackle-box.css";
import { http } from "./plugins/axios";

Vue.use(Tacklebox);

Vue.config.productionTip = false;

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
