import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "primeflex/primeflex.css";
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primeicons/primeicons.css";
import ToastService from 'primevue/toastservice';

createApp(App)
  .use(ToastService)
  .use(store)
  .use(router)
  .mount("#app");
