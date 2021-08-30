<template>
  <v-card>
    <v-text-field
      v-model="search"
      label="Wyszukaj"
      outlined
      class="mt-5"
      hide-details
    ></v-text-field>
    <v-divider></v-divider>
    <v-data-iterator
      :items="harmfulsList"
      item-key="id"
      :search="search"
      :items-per-page="50"
      group-by="category"
    >
      <template v-slot:default="{ groupedItems }">
        <v-list>
          <v-list-item-group v-for="(groupedItem, i) in groupedItems" :key="i">
            <v-card>
              <v-card-title class="text-caption text-uppercase primary--text">{{
                groupedItem.name
              }}</v-card-title>
              <v-divider></v-divider>
              <v-list-item v-for="(item, i) in groupedItem.items" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn fab icon small color="primary">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-card>
          </v-list-item-group>
        </v-list>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  computed,
  watch,
  PropType,
  toRefs,
} from "@vue/composition-api";

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

interface Data {
  id: number;
  title: string;
  arrayValues: DataItem[];
}

export default defineComponent({
  name: "WorkMedicineConfig",
  props: {
    data: {
      type: Object as PropType<Data>,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const harmfulsList = toRefs(props).data.value.arrayValues;
    const search = ref("");
    return { harmfulsList, search };
  },
});
</script>
