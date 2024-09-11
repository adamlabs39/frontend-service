import type { App } from "vue";
import MenuOpenIcon from "./MenuOpenIcon.vue";
import UserPlusIcon from "./UserPlusIcon.vue";
import BPJSIcon from "./BPJSIcon.vue";
import DatabaseUserIcon from "./DatabaseUserIcon.vue";
import MonitoringBedIcon from "./MonitoringBedIcon.vue";
import FileReportIcon from "./FileReportIcon.vue";

export default {
  install: (app: App<Element>) => {
    app.component("MenuOpenIcon", MenuOpenIcon);
    app.component("UserPlusIcon", UserPlusIcon);
    app.component("BPJSIcon", BPJSIcon);
    app.component("DatabaseUserIcon", DatabaseUserIcon);
    app.component("MonitoringBedIcon", MonitoringBedIcon);
    app.component("FileReportIcon", FileReportIcon);
  },
};
