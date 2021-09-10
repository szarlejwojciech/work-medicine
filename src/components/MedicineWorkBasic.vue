<template>
  <v-container>
    <v-row align="start">
      <v-col cols="8">
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Wyszukaj czynniki szkodliwe" outlined clearable></v-text-field>
        <v-spacer></v-spacer>
        <v-data-table
          v-if="selectedHarmfulFactors.length"
          class="elevation-1 mb-10"
          v-model="selectedHarmfulFactors"
          :headers="headers"
          :items="selectedHarmfulFactors"
          item-key="id"
          show-select
          disable-pagination
          disable-sort
          hide-default-footer
          checkbox-color="primary"
        >
          <template v-slot:item="{ item, isSelected, select }">
            <tr>
              <td class="text-start">
                <v-simple-checkbox :ripple="false" color="primary" :value="isSelected" @input="select($event)"></v-simple-checkbox>
              </td>
              <td class="text-start">
                {{ item.text.split(":")[1] || item.text.split(":")[0] }}
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-data-table
          class="elevation-1"
          v-model="selectedHarmfulFactors"
          :search="search"
          :headers="headers"
          v-if="selectedTypeWorkMedicine.includes('specjalistyczne')"
          :items="displayData.police.specialist.filter((item) => !selectedHarmfulFactors.includes(item))"
          item-key="id"
          show-select
          group-by="category"
          disable-pagination
          disable-sort
          hide-default-footer
          :hide-default-header="!!selectedHarmfulFactors.length"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:group.header="{ items, isOpen, toggle }">
            <th colspan="2">
              <v-icon @click="toggle">{{ isOpen ? "mdi-minus" : "mdi-plus" }} </v-icon>
              {{ items[0].category || "ogólne" }}
            </th>
          </template>
          <template v-slot:item="{ item, isSelected, select }">
            <tr>
              <td class="text-start">
                <v-simple-checkbox :ripple="false" color="primary" :value="isSelected" @input="select($event)"></v-simple-checkbox>
              </td>
              <td class="text-start">
                {{ item.text.split(":")[1] || item.text.split(":")[0] }}
              </td>
            </tr>
          </template>
        </v-data-table>
        <v-data-table
          v-if="!selectedTypeWorkMedicine.includes('specjalistyczne') || (selectedTypeWorkMedicine.includes('specjalistyczne') && selectedTypeWorkMedicine.length > 1)"
          class="elevation-1"
          v-model="selectedHarmfulFactors"
          :search="search"
          :headers="headers"
          :items="
            police ? displayData.police.basic.filter((item) => !selectedHarmfulFactors.includes(item)) : displayData.basic.filter((item) => !selectedHarmfulFactors.includes(item))
          "
          item-key="id"
          show-select
          group-by="category"
          disable-pagination
          disable-sort
          hide-default-footer
          :hide-default-header="!!selectedHarmfulFactors.length || selectedTypeWorkMedicine.includes('specjalistyczne')"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:group.header="{ items, isOpen, toggle }">
            <th colspan="2">
              <v-icon @click="toggle">{{ isOpen ? "mdi-minus" : "mdi-plus" }} </v-icon>
              {{ items[0].category || "ogólne" }}
            </th>
          </template>
          <template v-slot:item="{ item, isSelected, select }">
            <tr>
              <td class="text-start">
                <v-simple-checkbox :ripple="false" color="primary" :value="isSelected" @input="select($event)"></v-simple-checkbox>
              </td>
              <td class="text-start">
                {{ item.text.split(":")[1] || item.text.split(":")[0] }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <v-combobox
          v-model="selectedTypeWorkMedicine"
          :items="workMedicineTypes"
          label="Rodzaj badania medycyny pracy"
          :rules="[(value) => !!value.length || 'Wybierz rodzaj badania!']"
          height="2rem"
          multiple
          outlined
          chips
          clearable
          auto-select-first
        ></v-combobox>
        <v-row class="mt-0" v-if="police">
          <v-col cols="12" class="mt-0">
            <v-select
              :items="policeWorkerTypes.list"
              v-model="policeWorkerTypes.selectedType"
              label="Rodzaj pracownika"
              outlined
              color="primary"
              hide-details
              clearable
              :disabled="selectedTypeWorkMedicine.includes('specjalistyczne') && selectedTypeWorkMedicine.length === 1"
              :rules="[(value) => !!value || 'Wybierz rodzaj pracownika!']"
            ></v-select>
          </v-col>
        </v-row>
        <v-row v-if="police">
          <v-col cols="12" class="mt-0">
            <v-select
              :items="policeWorkerTypes.ageRange"
              v-model="policeWorkerTypes.selectedAge"
              label="Wiek"
              outlined
              color="primary"
              hide-details
              :disabled="policeWorkerTypes.ageRange.length === 0"
              clearable
              :rules="[(value) => !!value || 'Wybierz wiek pracownika!']"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <TestsList v-if="selectedHarmfulFactors.length > 0 && selectedTypeWorkMedicine.length > 0" :tests="testsToDo" :examinationList="examinationList" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>

<script lang="ts">
import getExaminationsList from "../helpers/getExaminationsList";

import { ref, reactive, defineComponent, computed, watch, PropType } from "@vue/composition-api";
import TestsList from "./TestsList.vue";

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
  name: "MedicineWorkBasic",
  components: { TestsList },
  props: {
    police: {
      type: Boolean,
      required: false,
      default: false,
    },
    data: {
      type: Object as PropType<Data>,
      required: true,
    },
    examinationList: {
      type: Object as PropType<Data>,
      required: true,
    },
  },
  setup(props) {
    const selectedHarmfulFactors = ref<DataItem[]>([]);
    const selectedTypeWorkMedicine = ref<string[]>(["wstępne"]);
    const headers = [{ text: "Czynniki szkodliwe", value: "text" }];
    const search = ref("");
    const testsToDo = ref<string[]>([]);
    const workMedicineTypes = [...new Set(props.data.arrayValues.map(({ examinations }) => examinations.map(({ name }) => name)).flat()), "kontrolne (profilaktyczne)"];
    const specyficSort = (prev = "", next = "") => (prev === "ogólne" || next === "ogólne" || prev > next ? 1 : prev < next ? -1 : 0);

    const displayData = reactive({
      basic: props.data.arrayValues.filter(({ disabled }) => !disabled).sort((a, b) => specyficSort(a.category, b.category)),
      police: {
        basic: props.data.arrayValues
          .filter(({ category, disabled }) => !disabled && category !== "specjalistyczne" && category !== "specyficzne")
          .sort((a, b) => specyficSort(a.category, b.category)),
        specialist: props.data.arrayValues.filter(({ category, disabled }) => !disabled && category === "specjalistyczne"),
        specyfic: props.data.arrayValues.filter(({ category, disabled }) => !disabled && category === "specyficzne"),
      },
    });

    const policeWorkerTypes: {
      list: (string | undefined)[];
      selectedType: string;
      ageRange: (string | undefined)[];
      selectedAge: string;
    } = reactive({
      list: displayData.police.specyfic.map(({ text }) => text),
      selectedType: ref(""),
      ageRange: computed(() => displayData.police.specyfic.filter(({ text }) => text === policeWorkerTypes.selectedType).map(({ age }) => age)),
      selectedAge: ref(""),
    });
    const selectedSpecyficHarmfulFactors = computed(() =>
      props.data.arrayValues.filter(({ text, age }) => text === policeWorkerTypes.selectedType && age === policeWorkerTypes.selectedAge)
    );

    watch([selectedHarmfulFactors, selectedTypeWorkMedicine, selectedSpecyficHarmfulFactors], () => {
      if (selectedTypeWorkMedicine.value.length > 1 && selectedTypeWorkMedicine.value.includes("wstępne")) {
        const index = selectedTypeWorkMedicine.value.indexOf("wstępne");
        selectedTypeWorkMedicine.value.splice(index, index + 1);
      }
      search.value = "";
      testsToDo.value = getExaminationsList([...selectedHarmfulFactors.value, ...selectedSpecyficHarmfulFactors.value], selectedTypeWorkMedicine.value, props.data);
    });

    return {
      selectedHarmfulFactors,
      headers,
      displayData,
      search,
      selectedTypeWorkMedicine,
      workMedicineTypes,
      policeWorkerTypes,
      testsToDo,
      selectedSpecyficHarmfulFactors,
    };
  },
});
</script>
