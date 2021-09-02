<template>
  <v-container>
    <v-card class="pa-3">
      <template>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="primary"></v-tabs-slider>

          <v-tab v-for="label in tabsLabels" :key="label">
            {{ label }}
          </v-tab>
        </v-tabs>
      </template>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <WorkMedicineConfig :data="workMedicineBasic" :examList="examList" />
        </v-tab-item>
        <v-tab-item>
          <WorkMedicineConfig :data="workMedicinePolice" :examList="examList" />
        </v-tab-item>
        <v-tab-item>
          <WorkMedicineConfig :data="workMedicineDrivingLicence" :examList="examList" />
        </v-tab-item>
        <!-- <v-tab-item v-for="i in 1" :key="i"> w budowie </v-tab-item> -->
        <v-tab-item>
          <WorkMedicineConfig :data="examinationList" :examList="examList" exam />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from "@vue/composition-api";
import WorkMedicineConfig from "../components/WorkMedicineConfig.vue";

export default defineComponent({
  name: "ConfigurationPage",
  components: {
    WorkMedicineConfig,
  },
  setup() {
    const tab = ref(null);
    const tabsLabels = [
      "Medycyna pracy",
      "Medycyna pracy policja",
      "Prawo jazdy",
      // "Pozwolenie na broń",
      "konfiguracja badań",
    ];
    const data = reactive({
      workMedicinePolice: {},
      workMedicineGunPermission: {},
      workMedicineDrivingLicence: {},
      workMedicineBasic: {},
      examinationList: {},
      examList: [],
    });

    async function getData() {
      try {
        const res = await require("../assets/data.json");

        data.workMedicinePolice = res.workMedicinePolice;
        data.workMedicineGunPermission = res.workMedicineGunPermission;
        data.workMedicineDrivingLicence = res.workMedicineDrivingLicence;
        data.workMedicineBasic = res.workMedicineBasic;
        data.examinationList = res.examinationList;
        data.examList = res.examinationList.arrayValues.map(({ text }: { text: string }) => text);
      } catch (e) {
        console.log(e);
      }
    }
    getData();

    return {
      tab,
      tabsLabels,
      ...toRefs(data),
    };
  },
});
</script>
