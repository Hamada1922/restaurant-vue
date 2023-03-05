import { createRouter, createWebHistory } from "vue-router";

function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: lazyLoad("UserForm"),
  },
  {
    path: "/register",
    name: "register",
    component: lazyLoad("UserForm"),
  },
  {
    path: "/password reset",
    name: "password reset",
    component: lazyLoad("UserForm"),
  },
  {
    path: "/home",
    name: "home",
    component: lazyLoad("HomeView"),
  },
  {
    path: "/profile",
    name: "profile",
    component: lazyLoad("UserProfile"),
  },
  {
    path: "/meal_planner",
    name: "planner",
    component: lazyLoad("MealPlanner"),
  },
  {
    path: "/all_recipes",
    name: "all_Recipes",
    component: lazyLoad("DisplayView"),
  },
  {
    path: "/categories",
    name: "categories",
    component: lazyLoad("CreateView"),
  },
  {
    path: "/categories/:category",
    name: "category",
    component: lazyLoad("DisplayView"),
  },
  {
    path: "/tools",
    name: "tools",
    component: lazyLoad("CreateView"),
  },
  {
    path: "/tools/:tool",
    name: "tool",
    component: lazyLoad("DisplayView"),
  },
  {
    path: "/setting",
    name: "setting",
    component: lazyLoad("SettingView"),
  },
  {
    path: "/foods/:food",
    name: "food",
    component: lazyLoad("MealView"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// component: () => {
// import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
// }
