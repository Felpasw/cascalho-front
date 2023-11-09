<template>
  <div class="hidden">
    <vs-sidebar
      :background="`${color.purple}`"
      absolute
      v-model="this.$route.name"
      open
      white
    >
      <img src="../assets/img/cascalho-logo.png" alt="" id="sideBarLogoImage" />

      <vs-sidebar-item class="sideBarItem" id="home" to="/home">
        <template #icon>
          <Home />
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item class="sideBarItem" id="group" to="/group">
        <template #icon>
          <GroupUser />
        </template>
        Grupos
      </vs-sidebar-item>
      <vs-sidebar-item class="sideBarItem" id="category" to="/category">
        <template #icon>
          <Category />
        </template>
        Categorias
      </vs-sidebar-item>
      <vs-sidebar-item class="sideBarItem" id="archives" to="/archives" arrow>
        <template #icon>
          <FileDoc />
        </template>
        Arquivos
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item class="sideBarItem">
            <template #icon>
              <Dashboard />
            </template>
            Dashboard
          </vs-sidebar-item>
        </template>

        <vs-sidebar-item
          id="dashboardGroups"
          class="sideBarItem"
          to="/dashboard/groups"
        >
          <template #icon>
            <GroupUserOutlined />
          </template>
          Grupos
        </vs-sidebar-item>
        <vs-sidebar-item
          id="dashboardCategories"
          class="sideBarItem"
          to="/dashboard/categories"
        >
          <template #icon>
            <CategoryOutlined />
          </template>
          Categorias
        </vs-sidebar-item>
        <vs-sidebar-item
          id="dashboardUsers"
          class="sideBarItem"
          to="/dashboard/users"
        >
          <template #icon>
            <User />
          </template>
          Usuários
        </vs-sidebar-item>
        <vs-sidebar-item
          id="dashboardPublications"
          class="sideBarItem"
          to="/dashboard/publications"
        >
          <template #icon>
            <Collection />
          </template>
          Publicações
        </vs-sidebar-item>
      </vs-sidebar-group>

      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar @click="exit()" id="exitButton">
            <Exit />
          </vs-avatar>
          <template>
            <DialogEditProfile :user="user" />
          </template>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import { color } from "../utils/colotPallete";
import Home from "./icons/Home.vue";
import Exit from "./icons/Exit.vue";
import GroupUser from "./icons/GroupUser.vue";
import Category from "./icons/Category.vue";
import FileDoc from "./icons/fileDoc.vue";
import Dashboard from "./icons/Dashboard.vue";
import { Axios } from "../config/axios";
import GroupUserOutlined from "./icons/GroupUserOutlined.vue";
import CategoryOutlined from "./icons/CategoryOutlined.vue";
import User from "./icons/User.vue";
import Collection from "./icons/Collection.vue";
import DialogEditProfile from "./dialogs/DialogEditProfile.vue";

export default {
  data: () => ({
    color: color,
    imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    user: "",
  }),
  async beforeMount() {
    try {
      const userId = localStorage.getItem("userId");
      const response = await Axios.get(`/user/${userId}`);
      this.user = {
        ...response.data,
        image: this.imagebaseUrl + response.data.image,
      };
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async exit() {
      await Axios.post("/logout");
      sessionStorage.clear();
      window.location.href = "/";
    },
  },

  components: {
    GroupUser,
    Home,
    Category,
    FileDoc,
    Dashboard,
    Exit,
    GroupUserOutlined,
    CategoryOutlined,
    User,
    Collection,
    DialogEditProfile,
  },
};
</script>

<style>
#imgLogo {
  padding: 60px;
  width: 100%;
  height: 100%;
}
#sideBarLogoImage {
  width: 90%;
  margin-bottom: 40px;
  margin-top: 30px;
}

.sideBarItem {
  color: #ffff;
}
.iconItem {
}
.selectedItem {
  filter: brightness(0) saturate(100%) invert(61%) sepia(98%) saturate(317%)
    hue-rotate(336deg) brightness(97%) contrast(96%);
}
.vs-avatar {
  background: #f39f5a;
  cursor: pointer;
}
</style>
