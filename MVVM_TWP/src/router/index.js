import { createRouter, createWebHistory } from "vue-router";

import CategoriesPost from "../views/CategoriesPost.vue";
// import loginUser from "../views/auth/loginUser.vue";
// import loginUser2 from "../views/auth/loginUser2.vue";
import registerUser from "../views/auth/registerUser.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: CategoriesPost,
    },
    // {
    //   path: "/login",
    //   name: "loginUser",
    //   component: loginUser,
    // },
    // {
    //   path: "/login2",
    //   name: "loginUser2",
    //   component: loginUser2,
    // },
    {
      path: "/register",
      name: "registerUser",
      component: registerUser,
    },
  ],
});

export default router;
