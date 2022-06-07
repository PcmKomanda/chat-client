import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "/src/components/Dashboard.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Dashboard,
  },
  {
    path: "/room/:room_id",
    component: Dashboard,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
