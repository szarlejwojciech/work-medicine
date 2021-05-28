<template>
  <v-card>
    <v-list>
      <v-list-item-group>
        <v-list-item-title class="px-3"
          >Badania do wykonania:</v-list-item-title
        >
        <v-list-item v-for="(item, i) in tests" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import medicineWorkPreliminary from "../assets/medicine_work_preliminary.json";
import medicineWorkPeriodic from "../assets/medicine_work_periodic.json";
import {
  computed,
  toRefs,
  defineComponent,
  PropType,
} from "@vue/composition-api";

interface selectedItemInterface {
  id: number;
  text: string;
  category: string;
  options: string[];
}

export default defineComponent({
  name: "TestsList",
  props: {
    selectedHarmfulFactors: {
      type: Array as PropType<selectedItemInterface[]>,
      required: true,
    },
    selectTypeWorkMedicine: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const { selectedHarmfulFactors, selectTypeWorkMedicine } = toRefs(props);
    // console.log(
    // );
    const tests = computed(() => {
      if (selectTypeWorkMedicine.value.length === 0) return [];
      const selectedHarmfulFactorsId = selectedHarmfulFactors.value.map(
        ({ id }) => id
      );
      console.log(selectTypeWorkMedicine.value);
      if (selectTypeWorkMedicine.value.includes("kontrolne (profilaktyczne)"))
        return ["Lekarz medycyny pracy"];
      else {
        const data = selectTypeWorkMedicine.value.includes("okresowe")
          ? medicineWorkPeriodic
          : medicineWorkPreliminary;
        return [
          ...new Set(
            data.arrayValues
              .filter(({ id }) => selectedHarmfulFactorsId.includes(id))
              .map(({ options }) => options)
              .flat()
          ),
        ];
      }
    });
    return { tests };
  },
});
</script>

