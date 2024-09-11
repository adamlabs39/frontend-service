import type { App } from "vue";
import MenuOpenIcon from "./MenuOpenIcon.vue";

export default {
  install: (app: App<Element>) => {
    app.component("MenuOpenIcon", MenuOpenIcon);
  },
};
