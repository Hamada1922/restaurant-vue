import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// css files
import "@/css/all.min.css";
import "@/css/normalize.css";
import "@/css/main.scss";

createApp(App).use(store).use(router).mount("#app");
