<template>
  <v-container>
    <v-card class="pa-3">
      <template>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab v-for="label in tabsLabels" :key="label">
            {{ label }}
          </v-tab>
        </v-tabs>
      </template>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card> Medycyna pracy </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card> Prawo jazdy </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card> Policja </v-card>
        </v-tab-item>
        <!-- <v-tab-item v-for="i in 1" :key="i"> w budowie </v-tab-item> -->
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "ConfigurationPage",
  components: {},
  setup() {
    const tab = ref(null);
    const tabsLabels = [
      "Medycyna pracy",
      "Prawo jazdy",
      "Medycyna pracy policja",
      // "Pozwolenie na broń",
    ];
    return {
      tab,
      tabsLabels,
    };
  },
});
</script>
