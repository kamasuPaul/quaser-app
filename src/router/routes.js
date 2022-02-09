const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    redirect: "/students",
    children: [
      { path: "home", component: () => import("pages/Home.vue") },
      { path: "students", component: () => import("pages/Students.vue") },
      { path: "income", component: () => import("pages/Income.vue") },
      { path: "expenses", component: () => import("pages/Expenses.vue") },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
