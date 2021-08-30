import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import WorkMedicinePage from "../views/WorkMedicinePage.vue";
import ConfigurationPage from "../views/ConfigurationPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/registration/work-medicine-configuration",
    name: "ConfigurationPage",
    component: ConfigurationPage,
  },
  {
    path: "/registration/work-medicine",
    name: "WorkMedicinePage",
    component: WorkMedicinePage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
