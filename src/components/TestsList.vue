<template>
  <v-card>
    <v-list class="pb-5">
      <v-subheader>BADANIA DO WYKONANIA</v-subheader>
      <v-list-group
        class="px-5"
        v-for="(group, i) in dicplayTests"
        :key="i"
        :value="true"
        prepend-icon="mdi-account-circle"
        dense
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="group.title"></v-list-item-title>
            <v-list-item-subtitle
              v-text="group.description"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>

        <v-list-item v-for="(test, i) in group.arrayValues" :key="i" link>
          <v-list-item-title
            class="text-wrap"
            v-text="test.text"
          ></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  PropType,
  computed,
} from "@vue/composition-api";
import examinationsList from "@/assets/examinationsList.json";

export default defineComponent({
  name: "TestsList",
  props: {
    tests: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  setup(props) {
    const { tests } = toRefs(props);
    const dicplayTests = computed(() =>
      examinationsList.items
        .map((item) => ({
          ...item,
          arrayValues: item.arrayValues.filter(({ text }) =>
            tests.value.includes(text)
          ),
        }))
        .filter(({ arrayValues }) => arrayValues.length)
    );

    return { dicplayTests };
  },
});
</script>
