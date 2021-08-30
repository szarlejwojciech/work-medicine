import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import pl from "vuetify/src/locale/pl";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pl },
    current: "pl",
  },
});
