<template>
  <v-card>
    <v-list class="pb-5">
      <v-subheader>BADANIA DO WYKONANIA</v-subheader>
      <v-list-group class="px-5" v-for="(group, i) in displayTests" :key="i" :value="true" prepend-icon="mdi-account-circle" dense no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="group[0]"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(test, i) in group[1]" :key="i" link dense>
          <v-list-item-title class="text-wrap" v-text="test.text"></v-list-item-title>
          <v-list-item-subtitle v-text="group.description"></v-list-item-subtitle>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType } from "@vue/composition-api";

interface DataItem {
  id: number;
  text: string;
  category?: string;
  disabled?: boolean;
  details?: string;
}

interface Data {
  id: number;
  title: string;
  arrayValues: DataItem[];
}

export default defineComponent({
  name: "TestsList",
  props: {
    tests: {
      type: Array as PropType<string[]>,
      required: true,
    },
    examinationList: {
      type: Object as PropType<Data>,
      required: true,
    },
  },

  setup(props) {
    const { tests } = toRefs(props);
    const listGroups = [...new Set(props.examinationList.arrayValues.filter(({ text }) => tests.value.includes(text)))];

    let displayTests = listGroups.reduce<Record<string, (string | DataItem)[]>>((r, a) => {
      if (a?.category) {
        r[a.category] = [...(r[a.category] || []), a];
      }
      return r;
    }, {});
    return { displayTests: Object.entries(displayTests) };
  },
});
</script>
