<template>
  <v-card>
    <v-list>
      <v-list-item-group class="px-5">
        <v-subheader class="px-4">Badania do wykonania:</v-subheader>

        <!-- <template v-if="testsForDrivingLicence.length > 0">
          <v-list-item v-for="(item, i) in testsForDrivingLicence" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template> -->
        <template>
          <v-list-item v-for="(item, i) in tests" :key="i" dense>
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
// import medicineWorkPreliminary from "../assets/medicine_work_preliminary.json";
// import medicineWorkPeriodic from "../assets/medicine_work_periodic.json";
import { defineComponent } from "@vue/composition-api";

// interface examinationInterface {
//   preliminary: string[];
//   periodic: string[];
//   specjalist?: string[];
// }
// interface selectedItemInterface {
//   id: number;
//   text: string;
//   category: string;
//   examinations: examinationInterface;
// }
// interface selectedLicenceCategory {
//   id: number;
//   text: string;
//   examinations: examinationInterface;
// }
export default defineComponent({
  name: "TestsList",
  props: {
    tests: {
      type: Array,
      required: true,
    },
  },
  // props: {
  //   selectedLicenceCategory: {
  //     type: Array as PropType<selectedLicenceCategory[]>,
  //     required: false,
  //     default: () => [],
  //   },
  //   selectedHarmfulFactors: {
  //     type: Array as PropType<selectedItemInterface[]>,
  //     required: false,
  //     default: () => [],
  //   },
  //   selectTypeWorkMedicine: {
  //     type: Array as PropType<string[]>,
  //     required: false,
  //     default: () => [],
  //   },
  // },
  // setup(props) {
  //   const {
  //     selectedHarmfulFactors,
  //     selectTypeWorkMedicine,
  //     selectedLicenceCategory,
  //   } = toRefs(props);
  //   // console.log(
  //   // );
  //   const testsForDrivingLicence = computed(() =>
  //     selectedLicenceCategory.value
  //       .map(({ examinations }) => examinations)
  //       .flat()
  //   );

  //   const tests = computed(() => {
  //     if (selectTypeWorkMedicine.value.length === 0) return [];
  //     const selectedHarmfulFactorsId = selectedHarmfulFactors.value.map(
  //       ({ id }) => id
  //     );
  //     if (selectTypeWorkMedicine.value.includes("kontrolne (profilaktyczne)"))
  //       return ["Lekarz medycyny pracy"];
  //     else {
  //       const data = selectTypeWorkMedicine.value.includes("okresowe")
  //         ? medicineWorkPeriodic
  //         : medicineWorkPreliminary;
  //       return [
  //         ...new Set(
  //           data.arrayValues
  //             .filter(({ id }) => selectedHarmfulFactorsId.includes(id))
  //             .map(({ examinations }) => examinations)
  //             .flat()
  //         ),
  //       ];
  //     }
  //   });
  //   return { tests, testsForDrivingLicence };
  // },
});
</script>


