import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import vuetify from "./plugins/vuetify";
import VueCompositionAPI from "@vue/composition-api";

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
