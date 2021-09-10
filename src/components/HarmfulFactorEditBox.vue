<template>
  <v-dialog v-model="isActive" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" @click="setData" fab icon small color="primary" title="Edytuj">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="primary" dark>
        <v-row>
          <v-col cols="auto" class="d-flex align-center">Edycja czynnika szkodliwego</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              fab
              icon
              @click="
                cancelEdiding();
                isActive = false;
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nazwa czynnika" hide-details required v-model="factor.text" outlined prepend-icon="mdi-skull-scan"></v-text-field>
            </v-col>
            <v-col cols="12" v-if="factor.age">
              <v-text-field label="Przedział wiekowy" hide-details required v-model="factor.age" outlined prepend-icon="mdi-sort-calendar-descending"></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-subheader>Badania</v-subheader>
            <template v-for="(exam, i) in ['wstępne', 'okresowe', 'specjalistyczne']">
              <v-col cols="12" :key="i" v-if="i < factor.examinations.length">
                <v-autocomplete
                  :items="examList"
                  :label="exam"
                  v-model="factor.examinations[i].list"
                  small-chips
                  deletable-chips
                  multiple
                  hide-details
                  outlined
                  hide-selected
                  prepend-icon="mdi-heart-pulse"
                ></v-autocomplete>
              </v-col>
            </template>
            <v-divider></v-divider>
            <v-subheader>Kategoria</v-subheader>
            <v-col cols="12">
              <v-combobox
                :items="categories || ['ogólne']"
                label="kategoria"
                v-model="factor.category"
                small-chips
                outlined
                prepend-icon="mdi-format-list-bulleted-type"
                persistent-hint
                messages="W celu dodania nowej grupy - wpisz jej nazwę"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="
            cancelEdiding();
            isActive = false;
          "
        >
          Anuluj
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="
            updateItem();
            isActive = false;
          "
        >
          Dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
interface Examination {
  name: string;
  list?: string[];
}

interface DataItem {
  id: number;
  text: string;
  category?: string;
  examinations: Examination[] | [];
  type?: string;
  age?: string;
  disabled?: boolean;
}

// interface ExamItem {
//   id: number;
//   name: string;
//   groupName: string;
//   details?: string;
// }

import { defineComponent, ref, PropType } from "@vue/composition-api";
export default defineComponent({
  name: "HarmfulFactorEditBox",
  emits: ["addItem", "updateItem"],
  props: {
    harmfulFactor: {
      type: Object as PropType<DataItem>,
      required: false,
      default: () => ({
        text: "",
        category: "",
        examinations: [
          {
            name: "wstępne",
            list: [],
          },
          {
            name: "okresowe",
            list: [],
          },
          {
            name: "specjalistyczne",
            list: [],
          },
        ],
        type: "",
        disabled: false,
      }),
    },
    categories: {
      type: Array,
      required: true,
    },
    examList: {
      type: Array as PropType<string[] | []>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isActive = ref(false);
    const factor = ref(props.harmfulFactor);

    // casching for cancel editing
    const cachedFactor = ref(JSON.stringify(factor.value));

    function cancelEdiding() {
      const { text, category, disabled, type, examinations, age } = JSON.parse(cachedFactor.value) as DataItem;
      {
        // factor.value.id = id;
        factor.value.text = text;
        factor.value.category = category;
        factor.value.disabled = disabled;
        factor.value.type = type;
        factor.value.age = age;
        factor.value.examinations = examinations;
      }
    }

    const updateItem = () => {
      emit("updateItem", factor.value);
      cachedFactor.value = JSON.stringify(factor.value);
    };

    const addItem = () => emit("addItem", factor.value);

    const setData = () => {
      factor.value = props.harmfulFactor;
      cachedFactor.value = JSON.stringify(factor.value);
    };

    return {
      isActive,
      factor,
      updateItem,
      cancelEdiding,
      addItem,
      setData,
    };
  },
});
</script>
