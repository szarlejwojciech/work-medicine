<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-data-table
          class="elevation-1 mb-10"
          v-model="selectedLicenceCategory"
          :headers="headers"
          :items="displayData"
          item-key="id"
          show-select
          disable-pagination
          disable-sort
          hide-default-footer
          single-select
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:item.text="{ item }">
            {{ item.text }}
            <v-icon
              v-for="(icon, i) in getIconName(item.text)"
              class="ml-2 mb-0.5"
              style="margin-right: -0.5em"
              color="primary"
              :key="i"
              >{{ icon }}</v-icon
            >
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <TestsList
          v-if="selectedLicenceCategory.length > 0"
          :selectedLicenceCategory="selectedLicenceCategory"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import medicine_work_driving_licence from "../assets/medicine_work_driving_licence.json";
import { ref, reactive, defineComponent } from "@vue/composition-api";
import TestsList from "./TestsList.vue";

interface displayDataItemInterface {
  id: number;
  text: string;
  options: string[];
}

export default defineComponent({
  name: "MedicineWorkDrivingLicence",
  components: { TestsList },
  setup() {
    const singleSelect = ref(false);
    const selectedLicenceCategory: displayDataItemInterface[] = reactive([]);
    const headers = [{ text: "Wybierz kategorię prawa jazdy", value: "text" }];

    const displayData: displayDataItemInterface[] =
      medicine_work_driving_licence.arrayValues;

    function getIconName(text: string) {
      const icons: { [key: string]: string[] } = {
        "Kategoria B": ["mdi-car-sports"],
        "Kategoria C": ["mdi-truck"],
        "Kategoria C+E": ["mdi-truck-trailer", "mdi-truck"],
        "Kategoria D": ["mdi-bus-side"],
        "Kategoria D+E": ["mdi-truck-trailer", "mdi-bus-side"],
        "Kategoria T": ["mdi-tram"],
        "Pojazdy uprzywilejowane": ["mdi-ambulance"],
      };
      return icons[text];
    }

    return {
      singleSelect,
      selectedLicenceCategory,
      headers,
      displayData,
      getIconName,
    };
  },
});
</script>
<style  scoped>
.v-icon.mdi-bus-side::before {
  font-size: 1.3em !important;
}
</style>