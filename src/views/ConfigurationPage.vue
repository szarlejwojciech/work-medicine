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
          <WorkMedicineConfig :data="workMedicineBasic" />
        </v-tab-item>
        <v-tab-item>
          <WorkMedicineConfig :data="workMedicinePolice" />
        </v-tab-item>
        <v-tab-item>
          <WorkMedicineConfig :data="workMedicineDrivingLicence" />
        </v-tab-item>
        <!-- <v-tab-item v-for="i in 1" :key="i"> w budowie </v-tab-item> -->
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
      "Prawo jazdy",
      "Medycyna pracy policja",
      // "Pozwolenie na broń",
    ];
    const data = reactive({
      workMedicinePolice: {},
      workMedicineGunPermission: {},
      workMedicineDrivingLicence: {},
      workMedicineBasic: {},
      examinationList: {},
    });

    async function getData() {
      try {
        const res = await require("../assets/data.json");
        console.log(
          "🚩🚩🚩 - file: ConfigurationPage.vue - line 47 - res",
          res
        );
        data.workMedicinePolice = res.workMedicinePolice;
        data.workMedicineGunPermission = res.workMedicineGunPermission;
        data.workMedicineDrivingLicence = res.workMedicineDrivingLicence;
        data.workMedicineBasic = res.workMedicineBasic;
        data.examinationList = res.examinationList;
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
