<template>
  <v-container>
    <v-card class="pa-3">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Wyszukaj czynniki szkodliwe"
          outlined
          clearable
        ></v-text-field>
      </v-card-title>
      <v-row>
        <v-col cols="8">
          <v-data-table
            v-if="selected.length"
            class="elevation-1 mb-10"
            v-model="selected"
            :headers="headers"
            :items="selected"
            item-key="id"
            show-select
            disable-pagination
            disable-sort
            hide-default-footer
          >
          </v-data-table>
          <v-data-table
            class="elevation-1"
            v-model="selected"
            :search="search"
            :headers="headers"
            :items="displayData.filter((item) => !selected.includes(item))"
            item-key="id"
            show-select
            group-by="category"
            :show-group-by="false"
            disable-pagination
            disable-sort
            group-desc
            hide-default-footer
            :hide-default-header="selected.length"
          >
          </v-data-table>
        </v-col>
        <!-- <div v-for="item in selected" :key="item.id">{{ item.text }}</div> -->
        <v-col cols="4">
          <v-card>
            <v-list>
              <v-subheader>Badania do wykonania:</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in ['Okulista', 'Aspat', 'alat']"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import orgData from "../assets/org_data.json";
import dataForPortal from "../assets/data_for_portal.json";
import { ref, reactive, watch } from "@vue/composition-api";

interface orgDataItemInterface {
  id: number;
  text: string;
  category: string;
}

interface orgDataInterface {
  id: number;
  order: number;
  title: string;
  type: number;
  arrayValues: orgDataItemInterface[];
  multiple: boolean;
  visibleReception: boolean;
  isCalculated: boolean;
  calculatedText: string;
}

export default Vue.extend({
  name: "MedicineWork",
  setup() {
    const singleSelect = ref(false);
    const selected: orgDataItemInterface[] = reactive([]);
    const headers = [{ text: "Czynnik szkodliwy", value: "text" }];
    // const selectedHeaders = [{ text: "Zaznaczone czynniki", value: "text" }];
    const search = ref("");

    let displayData: orgDataItemInterface[] = reactive(
      orgData.arrayValues.map((item: orgDataItemInterface) => {
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
      })
    );

    watch(selected, () => {
      displayData = displayData.filter((item) => !selected.includes(item));
    });

    return {
      singleSelect,
      selected,
      headers,
      // selectedHeaders,
      displayData,
      search,
    };
  },
});
</script>
