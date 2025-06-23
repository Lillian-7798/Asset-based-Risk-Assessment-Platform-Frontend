import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: () => import("../pages/Login"),
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("../pages/Register"),
  },
  {
    path: "/Help",
    name: "Help",
    component: () => import("../pages/Help"),
  },
  {
    path: "/NewAsset",
    name: "NewAsset",
    component: () => import("../pages/NewAsset"),
    children: [
      // {
      //     path: 'software',
      //     component: () => import('../pages/NewAsset/Software.vue')
      // },
      // {
      //     path: 'physical',
      //     component: () => import('../pages/NewAsset/Physical.vue')
      // },
      // {
      //     path: 'information',
      //     component: () => import('../pages/NewAsset/Information.vue')
      // },
      // {
      //     path: 'people',
      //     component: () => import('../pages/NewAsset/People.vue')
      // }
    ],
  },
  {
    path: "/RiskQuestionare/software",
    name: "Software",
    component: () => import("../pages/RiskQuestionare/Software.vue"),
  },
  {
    path: "/RiskQuestionare/physical",
    name: "Physical",
    component: () => import("../pages/RiskQuestionare/Physical.vue"),
  },
  {
    path: "/RiskQuestionare/physicalnon",
    name: "Physicalnon",
    component: () => import("../pages/RiskQuestionare/Physical_non.vue"),
  },
  {
    path: "/RiskQuestionare/information_database",
    name: "Information_database",
    component: () =>
      import("../pages/RiskQuestionare/Information_database.vue"),
  },
  {
    path: "/RiskQuestionare/information_doc",
    name: "Information_doc",
    component: () => import("../pages/RiskQuestionare/Information_doc.vue"),
  },
  {
    path: "/RiskQuestionare/information_patent",
    name: "Information_patent",
    component: () => import("../pages/RiskQuestionare/Information_patent.vue"),
  },
  {
    path: "/RiskQuestionare/people",
    name: "People",
    component: () => import("../pages/RiskQuestionare/People.vue"),
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("../pages/Home"),
    children: [
      {
        path: "asset-inventory",
        name: "AssetInventory",
        component: () => import("../pages/Home/AssetInventory.vue"),
      },
      {
        path: "risk-assessment",
        name: "RiskAssessment",
        component: () => import("../pages/Home/RiskAssessment.vue"),
      },
      {
        path: "risk-management",
        name: "RiskManagement",
        component: () => import("../pages/Home/RiskManagement.vue"),
      },
      { path: "", redirect: "/home/asset-inventory" }, // 默认重定向
    ],
  },
  {
    path: "/",
    redirect: "/Login",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
