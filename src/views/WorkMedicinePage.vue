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
          <v-card>
            <MedicineWorkBasic :data="workMedicineBasic" :examinationList="examinationList" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <MedicineWorkDrivingLicence :data="workMedicineDrivingLicence" :examinationList="examinationList" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <MedicineWorkBasic police :data="workMedicinePolice" :examinationList="examinationList" />
          </v-card>
        </v-tab-item>
        <!-- <v-tab-item v-for="i in 1" :key="i"> w budowie </v-tab-item> -->
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from "@vue/composition-api";
import MedicineWorkBasic from "../components/MedicineWorkBasic.vue";
import MedicineWorkDrivingLicence from "../components/MedicineWorkDrivingLicence.vue";

export default defineComponent({
  name: "WorkMedicinePage",
  components: {
    MedicineWorkBasic,
    MedicineWorkDrivingLicence,
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

  watch: {
    selectTypeWorkMedicine: function (newValue: string[]) {
      if (newValue.length > 1 && newValue.includes("wstępne")) {
        const index = newValue.indexOf("wstępne");
        newValue.splice(index, index + 1);
      }
    },
  },
});
</script>
