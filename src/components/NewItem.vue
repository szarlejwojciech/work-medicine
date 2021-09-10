<template>
  <v-dialog v-model="isActive" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-on="on" v-bind="attrs" @click="resetData()" fab absolute top right dark color="primary" style="top: 50px" title="Dodaj">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar color="primary" dark>
        <v-row>
          <v-col cols="auto" class="d-flex align-center">Dodaj nowy element</v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              fab
              icon
              @click="
                resetData();
                isActive = false;
              "
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-card-text v-if="exam" class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nazwa badania" hide-details required v-model="item.text" outlined prepend-icon="mdi-needle"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Szczegóły"
                persistent-hint
                messages="Np. nazwa podwykonawcy lub inne szczegóły"
                required
                v-model="item.details"
                outlined
                prepend-icon="mdi-text"
              ></v-text-field>
            </v-col>
            <v-subheader>Kategoria</v-subheader>
            <v-col cols="12">
              <v-combobox
                :items="categories || ['ogólne']"
                label="kategoria"
                v-model="item.category"
                small-chips
                hide-details
                outlined
                prepend-icon="mdi-format-list-bulleted-type"
              ></v-combobox>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-text v-else class="mt-5">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="Nazwa czynnika" hide-details required v-model="item.text" outlined prepend-icon="mdi-skull-scan"></v-text-field>
            </v-col>
            <v-col cols="12" v-if="item.age">
              <v-text-field label="Nazwa" hide-details required v-model="item.age" outlined prepend-icon="mdi-sort-calendar-descending"></v-text-field>
            </v-col>
            <v-divider></v-divider>
            <v-subheader>Badania</v-subheader>
            <template v-for="(exam, i) in ['wstępne', 'okresowe', 'specjalistyczne']">
              <v-col cols="12" :key="i" v-if="i < item.examinations.length">
                <v-autocomplete
                  :items="examList"
                  :label="exam"
                  v-model="item.examinations[i].list"
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
                v-model="item.category"
                small-chips
                outlined
                prepend-icon="mdi-format-list-bulleted-type"
                persistent-hint
                hint="W celu dodania nowej grupy - wpisz jej nazwę"
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
            resetData();
            isActive = false;
          "
        >
          Anuluj
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="
            addItem();
            resetData();
            isActive = false;
          "
        >
          dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
interface Examination {
  name: string;
  list: string[];
}

interface DataItem {
  id: number | null;
  text: string;
  category?: string;
  examinations: Examination[] | [];
  type?: string;
  age?: string;
  disabled?: boolean;
  details?: string;
}

import { defineComponent, ref, PropType, reactive, toRefs } from "@vue/composition-api";
export default defineComponent({
  name: "NewItem",
  emits: ["addItem"],
  props: {
    categories: {
      type: Array,
      required: true,
    },
    examList: {
      type: Array as PropType<string[] | []>,
      required: false,
      default: [],
    },
    exam: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isActive = ref(false);
    const { exam } = toRefs(props);
    const item = reactive<DataItem>({
      id: null,
      text: "",
      category: "",
      details: "",
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
    });

    function resetData() {
      if (exam.value) {
        item.text = "";
        item.category = "";
        item.details = "";
      } else {
        item.examinations.forEach(({ list }) => {
          return (list.length = 0);
        });
        item.text = "";
        item.category = "";
        item.details = "";
        item.type = "";
        item.disabled = false;
      }
    }

    const addItem = () => {
      item.id = +new Date();

      emit("addItem", JSON.parse(JSON.stringify(item)));
    };

    return {
      isActive,
      item,
      addItem,
      resetData,
    };
  },
});
</script>
