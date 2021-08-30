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
// mocked portal interface
.app-root {
  background: #0008 !important;
  background-image: url(./assets/mock.png) !important;
  background-repeat: no-repeat !important;
  background-position: 0px -33px !important;
  background-blend-mode: darken;
}
</style>
