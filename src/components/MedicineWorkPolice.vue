<template>
  <v-container>
    <v-row align="center">
      <v-col cols="8">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Wyszukaj czynniki szkodliwe"
            outlined
            clearable
          ></v-text-field>
        </v-card-title>
      </v-col>
      <v-col cols="4">
        <v-combobox
          v-model="selectTypeWorkMedicine"
          :items="workMedicineTypes"
          label="Wybierz rodzaj badania"
          :rules="[(value) => !!value.length || 'Wybierz rodzaj badania!']"
          height="2rem"
          multiple
          outlined
          chips
          clearable
        ></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
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
        >
        </v-data-table>
        <v-data-table
          class="elevation-1"
          v-model="selectedHarmfulFactors"
          :search="search"
          :headers="headers"
          :items="
            displayData.filter((item) => !selectedHarmfulFactors.includes(item))
          "
          item-key="id"
          show-select
          group-by="category"
          :show-group-by="false"
          disable-pagination
          disable-sort
          group-desc
          hide-default-footer
          :hide-default-header="!!selectedHarmfulFactors.length"
        >
        </v-data-table>
      </v-col>
      <!-- <div v-for="item in selected" :key="item.id">{{ item.text }}</div> -->
      <v-col cols="4">
        <TestsList
          v-if="
            selectedHarmfulFactors.length > 0 &&
            selectTypeWorkMedicine.length > 0
          "
          :selectedHarmfulFactors="selectedHarmfulFactors"
          :selectTypeWorkMedicine="selectTypeWorkMedicine"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import orgData from "../assets/org_data.json";
import { ref, reactive, defineComponent } from "@vue/composition-api";
import TestsList from "./TestsList.vue";

interface orgDataItemInterface {
  id: number;
  text: string;
  category?: string;
  options?: string[];
}

export default defineComponent({
  name: "MedicineWorkPolice",
  components: { TestsList },
  setup() {
    const selectedHarmfulFactors: orgDataItemInterface[] = reactive([]);
    const headers = [{ text: "Czynnik szkodliwy", value: "text" }];
    const search = ref("");
    const selectTypeWorkMedicine = reactive<string[]>(["wstępne"]);
    const workMedicineTypes = [
      "wstępne",
      "okresowe",
      "kontrolne (profilaktyczne)",
    ];

    const displayData: orgDataItemInterface[] = reactive(orgData.arrayValues);
    displayData.map((item) => {
      const { text } = item;
      if (text.includes("PW:") || text.includes("PW)"))
        item.category = "Pyły i włókna";
      else if (text.includes("CT:") || text.includes("CT)"))
        item.category = "Czynniki toksyczne";
      else if (text.includes("P:") || text.includes("P)"))
        item.category = "Pestycydy";
      else if (text.includes("CB:") || text.includes("CB)"))
        item.category = "Czynniki biologiczne";
      else if (text.includes("CPS:") || text.includes("CPS)"))
        item.category = "Niekorzystne czynniki psychospołeczne";
      else item.category = "Ogólne";

      const newText = text.split(":")?.[1];
      if (newText) item.text = newText;
      return item;
    });

    return {
      selectedHarmfulFactors,
      headers,
      displayData,
      search,
      selectTypeWorkMedicine,
      workMedicineTypes,
    };
  },
  watch: {
    selectTypeWorkMedicine: function (newValue: string[]) {
      if (newValue.length > 1 && newValue.includes("wstępne")) {
        console.log("są już wstępne!!");
        const index = newValue.indexOf("wstępne");
        console.log(index);
        newValue.splice(index, index + 1);
      }
    },
  },
});
</script>
