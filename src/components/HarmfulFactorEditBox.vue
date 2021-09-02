<template>
  <v-dialog v-model="isActive" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="create" v-on="on" v-bind="attrs" fab absolute top right dark color="primary" style="top: 50px" title="Dodaj">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-else v-on="on" v-bind="attrs" @click="setData" fab icon small color="primary" title="Edytuj">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="primary" dark>
        <v-row>
          <v-col cols="auto" class="d-flex align-center">{{ create ? "Dodaj nowy czynnik szkodliwy" : "Edycja czynnika szkodliwego" }}</v-col>
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
              <v-text-field label="Nazwa" hide-details required v-model="factor.text" outlined></v-text-field>
            </v-col>
            <v-col cols="12" v-if="factor.age">
              <v-text-field label="Nazwa" hide-details required v-model="factor.age" outlined></v-text-field>
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
                ></v-autocomplete>
              </v-col>
            </template>
            <v-divider></v-divider>
            <v-subheader>Kategoria</v-subheader>
            <v-col cols="12">
              <v-combobox :items="categories || ['ogólne']" label="kategoria" v-model="factor.category" small-chips hide-details outlined></v-combobox>
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
            create ? addHarmfulFactor() : updateHarmfulFactor();
            isActive = false;
          "
        >
          {{ create ? "Dodaj" : "Zapisz" }}
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
  emits: ["addHarmfulFactor", "updateHarmfulFactor"],
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
    create: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isActive = ref(false);
    const factor = ref(props.harmfulFactor);

    // casching for cancel editing
    const cachedFactor = ref(JSON.stringify(factor.value));

    const examList = ref<string[]>([]);

    async function getExamList() {
      try {
        const res = await require("../assets/examinations.json");

        //// get examinations list

        examList.value = res.items.map(({ name }: { name: string }) => name);
      } catch (e) {
        console.log(e);
      }
    }
    getExamList();

    function cancelEdiding() {
      const { id, text, category, disabled, type, examinations, age } = JSON.parse(cachedFactor.value) as DataItem;
      {
        factor.value.id = id;
        factor.value.text = text;
        factor.value.category = category;
        factor.value.disabled = disabled;
        factor.value.type = type;
        factor.value.age = age;
        factor.value.examinations = examinations;
      }
    }

    const updateHarmfulFactor = () => {
      emit("updateHarmfulFactor", factor.value);
      cachedFactor.value = JSON.stringify(factor.value);
    };

    const addHarmfulFactor = () => emit("addHarmfulFactor", factor.value);

    const setData = () => (factor.value = props.harmfulFactor);

    return {
      isActive,
      factor,
      examList,
      updateHarmfulFactor,
      cancelEdiding,
      addHarmfulFactor,
      setData,
    };
  },
});
</script>
