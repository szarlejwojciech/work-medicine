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
      <v-card-title>
        <span class="text-h5">Edycja czynnika szkodliwego</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nazwa" hide-details required v-model="factor.text" outlined></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-subheader>Badania</v-subheader>
            <template v-for="(exam, i) in ['wstępne', 'okresowe', 'specjalistyczne']">
              <v-col cols="12" :key="i" v-if="i < factor.examinations.length">
                <v-combobox :items="examList" :label="exam" v-model="factor.examinations[i].list" small-chips deletable-chips multiple hide-details outlined></v-combobox>
              </v-col>
            </template>
            <v-divider></v-divider>
            <v-subheader>Kategoria</v-subheader>
            <v-col cols="12">
              <v-select :items="harmfulsFactorCategories" label="kategoria" v-model="factor.category" small-chips hide-details outlined></v-select>
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
  disabled?: boolean;
}

// interface ExamItem {
//   id: number;
//   name: string;
//   groupName: string;
//   details?: string;
// }

import { defineComponent, ref, PropType, watch } from "@vue/composition-api";
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
    harmfulsFactorCategories: {
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
      const { id, text, category, disabled, type, examinations } = JSON.parse(cachedFactor.value) as DataItem;
      {
        factor.value.id = id;
        factor.value.text = text;
        factor.value.category = category;
        factor.value.disabled = disabled;
        factor.value.type = type;
        factor.value.examinations = examinations;
      }
    }

    const updateHarmfulFactor = () => emit("updateHarmfulFactor", factor);

    const addHarmfulFactor = () => emit("addHarmfulFactor", factor);

    const setData = () => (factor.value = props.harmfulFactor);

    watch(
      () => props.harmfulFactor.id,
      (newId, old) => {
        if (isActive.value) {
          console.log("🚩🚩🚩 - file: HarmfulFactorEditBox.vue - line 167 - isActive.value", isActive.value);

          console.log("🚩🚩🚩 - file: HarmfulFactorEditBox.vue - line 165 - props", newId, old);
        }
      }
    );
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
