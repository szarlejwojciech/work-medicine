<template>
  <v-container>
    <v-data-table-header>Hello world </v-data-table-header>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="data"
      item-key="name"
      show-select
      class="elevation-1"
      group-by="value"
    >
    </v-data-table>
    <div v-for="item in selected" :key="item">{{ item.name }}</div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import data from "../assets/data";

export default Vue.extend({
  name: "MedicineWork",

  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [{ text: "Czynnik szkodliwy", value: "name" }],
    };
  },
  setup() {
    return { data };
  },
});
</script>
