<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <v-data-table
          class="elevation-1 mb-10"
          v-model="selectedLicenceCategory"
          :headers="headers"
          :items="data.arrayValues"
          item-key="id"
          show-select
          disable-pagination
          disable-sort
          hide-default-footer
          single-select
          checkbox-color="primary"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:item.text="{ item }">
            {{ item.text }}
            <v-icon v-for="(icon, i) in getIconName(item.text)" class="ml-2 mb-0.5" style="margin-right: -0.5em" color="primary" :key="i">{{ icon }}</v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <TestsList v-if="selectedLicenceCategory.length > 0" :tests="examinationsList" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { PropType } from "@vue/composition-api";
import { defineComponent, ref, watch } from "@vue/composition-api";
import TestsList from "./TestsList.vue";

interface categoryInterface {
  id: number;
  text: string;
  examinations?: string[];
}
interface Examination {
  name: string;
  list?: string[];
}

interface DataItem {
  id: number;
  text: string;
  age?: string;
  category?: string;
  examinations: Examination[] | [];
  type?: string;
  disabled?: boolean;
  details?: string;
}

interface Data {
  id: number;
  title: string;
  arrayValues: DataItem[];
}

export default defineComponent({
  name: "MedicineWorkDrivingLicence",
  components: { TestsList },
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true,
    },
  },
  setup(props) {
    const selectedLicenceCategory = ref<categoryInterface[]>([]);
    const headers = [{ text: "Wybierz kategorię prawa jazdy", value: "text" }];
    const examinationsList = ref<Examination[]>([]);

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
    watch(selectedLicenceCategory, () => {
      const selectedHarmfulsId: number[] = selectedLicenceCategory.value.map(({ id }) => id);
      examinationsList.value = props.data.arrayValues
        .filter(({ id }) => selectedHarmfulsId.includes(id))
        .map(({ examinations }) => examinations)
        .flat();
    });
    return {
      selectedLicenceCategory,
      headers,
      examinationsList,
      getIconName,
    };
  },
});
</script>
<style scoped>
.v-icon.mdi-bus-side::before {
  font-size: 1.3em !important;
}
</style>
