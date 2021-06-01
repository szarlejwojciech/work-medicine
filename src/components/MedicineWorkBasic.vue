<template>
  <v-container>
    <v-row align="start">
      <v-col cols="8">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Wyszukaj czynniki szkodliwe"
          outlined
          clearable
        ></v-text-field>
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
          disable-pagination
          disable-sort
          hide-default-footer
          :hide-default-header="!!selectedHarmfulFactors.length"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:group.header="{ items, isOpen, toggle }">
            <th colspan="2">
              <v-icon @click="toggle"
                >{{ isOpen ? "mdi-minus" : "mdi-plus" }}
              </v-icon>
              {{ items[0].category }}
            </th>
          </template>
          <template v-slot:item="{ item, isSelected, select }">
            <tr>
              <td class="text-start">
                <v-simple-checkbox
                  :ripple="false"
                  color="primary"
                  :value="isSelected"
                  @input="select($event)"
                ></v-simple-checkbox>
              </td>
              <td class="text-start">
                {{ item.text }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="4">
        <v-combobox
          v-model="selectTypeWorkMedicine"
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
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
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
import orgData from "../assets/medicine_work_preliminary_police.json";
import {
  ref,
  reactive,
  defineComponent,
  toRefs,
  computed,
} from "@vue/composition-api";
import TestsList from "./TestsList.vue";

interface orgDataItemInterface {
  id: number;
  text: string;
  category?: string;
  options?: string[];
  type?: string;
}

export default defineComponent({
  name: "MedicineWorkPolice",
  components: { TestsList },
  props: {
    police: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const { police } = toRefs(props);
    const selectedHarmfulFactors: orgDataItemInterface[] = reactive([]);
    const selectedSpecyficHarmfulFactors = ref(null);
    const selectTypeWorkMedicine = reactive<string[]>(["wstępne"]);
    // const selectedWorkerType = reactive<string>("");
    const headers = [{ text: "Czynniki ogólne", value: "text" }];
    const search = ref("");
    const workMedicineTypes = [
      "wstępne",
      "okresowe",
      "kontrolne (profilaktyczne)",
    ];
    if (police) workMedicineTypes.push("specjalistyczne");

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
      else if (!item?.category) item.category = "Ogólne";

      const newText = text.split(":")?.[1];
      if (newText) item.text = newText;
      return item;
    });

    const specificHarmufuls = displayData.filter(
      ({ type }) => type === "specyfic"
    );
    const policeWorkerTypes: {
      list: (string | undefined)[];
      selectedType: string;
      ageRange: (string | undefined)[];
      selectedAge: string;
    } = reactive({
      list: displayData
        .filter(({ type }) => type === "specyfic")
        .map(({ category }) => category),
      selectedType: ref(""),
      ageRange: computed(() =>
        displayData
          .filter(({ category }) => category === policeWorkerTypes.selectedType)
          .map(({ text }) => text)
      ),
      selectedAge: ref(""),
    });
    return {
      selectedHarmfulFactors,
      headers,
      displayData,
      search,
      selectTypeWorkMedicine,
      selectedSpecyficHarmfulFactors,
      workMedicineTypes,
      specificHarmufuls,
      policeWorkerTypes,
    };
  },
  watch: {
    selectTypeWorkMedicine: function (newValue: string[]) {
      if (newValue.length > 1 && newValue.includes("wstępne")) {
        const index = newValue.indexOf("wstępne");
        newValue.splice(index, index + 1);
      } else if (newValue.length > 1 && newValue.includes("specjalistyczne")) {
        const index = newValue.indexOf("specjalistyczne");
        console.log(newValue);
        newValue.splice(index, index + 1);
      }
    },
  },
});
</script>
