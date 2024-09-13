import type { App } from "vue";
import MenuOpenIcon from "./MenuOpenIcon.vue";
import UserPlusIcon from "./UserPlusIcon.vue";
import BPJSIcon from "./BPJSIcon.vue";
import DatabaseUserIcon from "./DatabaseUserIcon.vue";
import MonitoringBedIcon from "./MonitoringBedIcon.vue";
import FileReportIcon from "./FileReportIcon.vue";
import FisioIcon from "./FisioIcon.vue";
import TrainingIcon from "./TrainingIcon.vue";
import DoubleBoxIcon from "./DoubleBoxIcon.vue";
import ArrowRightBrokenIcon from "./ArrowRightBrokenIcon.vue";
import GearFillIcon from "./GearFillIcon.vue";

export default {
  install: (app: App<Element>) => {
    app.component("MenuOpenIcon", MenuOpenIcon);
    app.component("UserPlusIcon", UserPlusIcon);
    app.component("BPJSIcon", BPJSIcon);
    app.component("DatabaseUserIcon", DatabaseUserIcon);
    app.component("MonitoringBedIcon", MonitoringBedIcon);
    app.component("FileReportIcon", FileReportIcon);
    app.component("FisioIcon", FisioIcon);
    app.component("TrainingIcon", TrainingIcon);
    app.component("DoubleBoxIcon", DoubleBoxIcon);
    app.component("ArrowRightBrokenIcon", ArrowRightBrokenIcon);
    app.component("GearFillIcon", GearFillIcon);
  },
};
