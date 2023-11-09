import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import GroupView from "../views/GroupView.vue";
import ArchivesView from "../views/ArchivesView.vue";
import CategoryView from "../views/CategoryView.vue";
import DashboardUsersView from "../views/DashboardUsersView.vue";
import DashboardCategoriesView from "../views/DashboardCategoriesView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import DashboardGroupsView from "../views/DashboardGroupsView.vue";
import DocumentView from "../views/DocumentView.vue";
import DashboardPublications from "../views/DashboardPublications.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/group",
      name: "group",
      component: GroupView,
    },
    {
      path: "/archives",
      name: "archives",
      component: ArchivesView,
    },
    {
      path: "/category",
      name: "category",
      component: CategoryView,
    },
    {
      path: "/dashboard/users",
      name: "userDashboard",
      component: DashboardUsersView,
    },
    {
      path: "/dashboard/categories",
      name: "categoriesDashboard",
      component: DashboardCategoriesView,
    },
    {
      path: "/dashboard/groups",
      name: "GroupDashboard",
      component: DashboardGroupsView,
    },
    {
      path: "/user/:id",
      name: "UserProfile",
      component: UserProfileView,
    },
    {
      path: "/document/:id",
      name: "DocumentInfo",
      component: DocumentView,
    },
    {
      path: "/dashboard/publications",
      name: "DocumentInfo",
      component: DashboardPublications,
    },
  ],
});

export default router;
