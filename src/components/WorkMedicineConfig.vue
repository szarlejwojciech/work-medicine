<template>
  <v-card>
    <v-text-field v-model="search" label="Wyszukaj" outlined class="mt-5" hide-details style="max-width: 600px"></v-text-field>
    <v-divider class="my-5"></v-divider>
    <NewItem :categories="categories" :examList="examList" :exam="exam" @addItem="addItem" />
    <v-data-iterator :items="harmfulsFactorsList" item-key="id" :search="search" :items-per-page="50" group-by="category">
      <template v-slot:default="{ groupedItems }">
        <v-list>
          <v-list-item-group v-for="(groupedItem, i) in groupedItems" :key="i">
            <v-card>
              <v-card-title class="text-caption text-uppercase primary--text">
                {{ groupedItem.name }}
              </v-card-title>
              <v-divider></v-divider>
              <v-list-item v-for="(item, i) in groupedItem.items" :key="i">
                <v-list-item-content>
                  <v-list-item-title>
                    <span>{{ item.text }}</span>
                    <small v-if="item.age"> - {{ item.age }}</small>
                    <small v-if="item.details"> - {{ item.details }}</small>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-row>
                    <ExaminationsEditBox v-if="exam" :examItem="item" :categories="categories" @updateItem="updateItem" />
                    <HarmfulFactorEditBox v-else :harmfulFactor="item" :categories="categories" :examList="examList" @updateItem="updateItem" exam />
                    <v-btn small fab icon color="error" @click="() => deleteItem(item.id)" title="Usuń">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
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
import { ref, defineComponent, PropType, computed } from "@vue/composition-api";
import HarmfulFactorEditBox from "../components/HarmfulFactorEditBox.vue";
import ExaminationsEditBox from "../components/ExaminationsEditBox.vue";
import NewItem from "../components/NewItem.vue";

interface Examination {
  name: string;
  list?: string[];
}

interface DataItem {
  id: number;
  text: string;
  age?: string;
  category?: string;
  examinations: Examination[] | [];
  type?: string;
  disabled?: boolean;
  details?: string;
}

interface Data {
  id: number;
  title: string;
  arrayValues: DataItem[];
}

export default defineComponent({
  name: "WorkMedicineConfig",
  components: { HarmfulFactorEditBox, ExaminationsEditBox, NewItem },
  props: {
    data: {
      type: Object as PropType<Data>,
      required: false,
      default: false,
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
  setup(props) {
    const harmfulsFactorsList = ref(props.data.arrayValues);
    const categories = computed(() => {
      const categories = [...new Set(props.data.arrayValues.map(({ category }) => category))];
      return !categories?.[0] ? ["ogólne"] : categories;
    });
    const search = ref("");
    const formIsVisible = ref(false);

    function deleteItem(idToRemove: number) {
      harmfulsFactorsList.value = harmfulsFactorsList.value.filter(({ id }) => id !== idToRemove);

      const paylad = { itemId: idToRemove, listId: props.data.id };

      //// delete on server
    }

    function addItem(item: DataItem) {
      harmfulsFactorsList.value.push(item);

      const paylad = { item, listId: props.data.id };

      ///// add harmful factor on server
    }

    function updateItem(item: DataItem) {
      const index = harmfulsFactorsList.value.findIndex(({ id }) => id === item.id);
      harmfulsFactorsList.value[index] = item;

      const paylad = { itemId: item.id, listId: props.data.id };
      ///// update harmful factor on server
    }

    return {
      harmfulsFactorsList,
      search,
      formIsVisible,
      categories,
      deleteItem,
      addItem,
      updateItem,
    };
  },
});
</script>
method: deleteHarmfulFactor(): localization: "file: @/src/components/WorkMedicineConfig.vue - line 99" method: addHarmfulFactor(): localization: "file:
@/src/components/WorkMedicineConfig.vue - line 106" method: updateHarmfulFactor(): localization: "file: @/src/components/WorkMedicineConfig.vue - line 115" method: getData():
localization: "file: @/src/views/WorkMedicinePage.vue - line 64" method: getData(): localization: "file: @/src/views/ConfigurationPage.vue - line 61"
