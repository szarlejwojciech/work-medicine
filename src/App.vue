<template>
  <v-app class="app-root">
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in [
            {
              title: 'Medycyna pracy',
              icon: 'mdi-serch',
              link: '/registration/work-medicine',
            },
            {
              title: 'Konfiguracja czynników',
              icon: 'mdi-serch',
              link: '/registration/work-medicine-configuration',
            },
          ]"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <router-link :to="item.link" class="black--text text-decoration-none">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark> ALLMEDICA </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->

      <router-view></router-view>

      <!-- <v-main class="ma-2 pb-12" style="padding: 48px 0px 0px 250px">
    </v-main> -->
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
});
</script>
