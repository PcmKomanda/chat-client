import "@fortawesome/fontawesome-free/css/all.min.css";
import moment from "moment";
import "spectre.css/dist/spectre.min.css";
import { createApp } from "vue";
import VueSocketIO from "vue-3-socket.io";
import VueCookies from "vue3-cookies";
import App from "./App.vue";
import "./assets/bulma.css";
import router from "./router/index";
var app = createApp(App);

app.use(
  new VueSocketIO({
    debug: false,
    connection:
      process.env.NODE_ENV !== "production"
        ? "ws://" + import.meta.env.VITE_DEV_URL
        : "wss://" + import.meta.env.VITE_PROD_URL,
  })
);
app.use(router);
app.use(VueCookies, {
  expireTimes: 60 * 60 * 24,
});

app.config.globalProperties.$moment = moment;

app.mount("#app");
