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
          <v-col cols="auto" class="d-flex align-center">Edycja badania</v-col>
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
              <v-text-field label="Nazwa badania" hide-details required v-model="exam.text" outlined prepend-icon="mdi-needle"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Szczegóły"
                hide-details
                required
                v-model="exam.details"
                outlined
                prepend-icon="mdi-text"
                messages="Np. nazwa podwykonawcy lub inne szczegóły"
              ></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-subheader>Kategoria</v-subheader>
            <v-col cols="12">
              <v-combobox
                :items="categories || ['ogólne']"
                label="kategoria"
                v-model="exam.category"
                small-chips
                hide-details
                outlined
                prepend-icon="mdi-format-list-bulleted-type"
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
            updateHarmfulFactor();
            isActive = false;
          "
        >
          Zapisz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
interface DataItem {
  id: number;
  text: string;
  category?: string;
  details?: string;
}

import { defineComponent, ref, PropType } from "@vue/composition-api";
export default defineComponent({
  name: "ExaminationsEditBox",
  emits: ["addHarmfulFactor", "updateHarmfulFactor"],
  props: {
    examItem: {
      type: Object as PropType<DataItem>,
      required: false,
      default: () => ({
        text: "",
        category: "",
        details: "",
      }),
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isActive = ref(false);
    const exam = ref(props.examItem);

    // casching for cancel editing
    const cachedExam = ref(JSON.stringify(exam.value));

    function cancelEdiding() {
      const { id, text, category, details } = JSON.parse(cachedExam.value) as DataItem;
      {
        exam.value.id = id;
        exam.value.text = text;
        exam.value.category = category;
        exam.value.details = details;
      }
    }

    const updateHarmfulFactor = () => {
      emit("updateHarmfulFactor", exam.value);
      cachedExam.value = JSON.stringify(exam.value);
    };

    const addHarmfulFactor = () => emit("addHarmfulFactor", exam.value);

    const setData = () => (exam.value = props.examItem);

    const clearData = () => {
      exam.value.text = "";
      exam.value.category = "";
      exam.value.details = "";
    };

    return {
      isActive,
      exam,
      updateHarmfulFactor,
      cancelEdiding,
      addHarmfulFactor,
      setData,
      clearData,
    };
  },
});
</script>
