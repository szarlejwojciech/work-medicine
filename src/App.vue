<template>
  <v-app>
    <v-main class="ma-2 pb-12" style="padding: 48px 0px 0px 250px">
      <MedicineWork />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import MedicineWork from "./components/MedicineWork.vue";

export default Vue.extend({
  name: "App",
  components: {
    MedicineWork,
  },
});
</script>
<style scoped>
body {
  background-image: url(./assets/mock.png) !important;
}
</style>