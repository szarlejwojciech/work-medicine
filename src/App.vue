<template>
  <v-app class="app-root">
    <v-main class="ma-2 pb-12" style="padding: 48px 0px 0px 250px">
      <MedicineWorkTemplate />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MedicineWorkTemplate from "./components/MedicineWorkTemplate.vue";

export default Vue.extend({
  name: "App",
  components: {
    MedicineWorkTemplate,
  },
});
</script>
<style lang="scss" scoped>
.app-root {
  background-image: linear-gradient(white, white), url(/img/mock.0e640248.png) !important;
  background-repeat: no-repeat, no-repeat !important;
  background-position: 255px 50px, 0px -33px !important;
}
</style>