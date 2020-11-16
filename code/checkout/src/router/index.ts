import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ScanItens from "../views/ScanItens.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: ScanItens
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/Checkout.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
