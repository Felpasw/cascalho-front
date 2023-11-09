<template>
  <vs-sidebar right absolute primary :background="`${color.purple}`" open>
    <template #logo> ... </template>
    <template #header> </template>
    <div class="usersRightSideBar">
      <div v-for="user in users" :key="user.id" class="userDisplayRightSideBar">
        <div class="profileSideBar">
          <vs-avatar size="50">
            <img :src="imagebaseUrl + user.image" alt="" />
          </vs-avatar>
          <h3 class="userRightSideBarTitle">{{ user.name }}</h3>
        </div>
        <a :href="`/user/${user.id}`" style="text-decoration: none">
          <vs-button class="seeBtnUserRightSideBar">
            Ver perfil
            <template #animate>
              <UserDetailIcon class="userDetailWhite" />
            </template> </vs-button
        ></a>
      </div>
    </div>

    <template #footer> </template>
  </vs-sidebar>
</template>

<script>
import { color } from "../utils/colotPallete";
import { Axios } from "../config/axios";
import UserDetailIcon from "./icons/UserDetailIcon.vue";

export default {
  async beforeMount() {
    try {
      this.isLoading = true;
      const response = await Axios.get(`/user`);
      this.users = response.data.data;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({
    color: color,
    isLoading: false,
    imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    users: [],
  }),
  components: { UserDetailIcon },
};
</script>

<style>
.userRightSideBarTitle {
  color: #ffff;
  font-size: 16px;
  word-wrap: break-word;
}
#searchInput {
  margin-top: 17px;
}
.seeBtnUserRightSideBar {
  height: 35%;
  align-self: center;
}
.userDisplayRightSideBar {
  display: flex;
  margin-left: 35px;
  width: 100%;
  justify-content: space-between;
}
.usersRightSideBar {
  display: flex;
  width: 90%;
  margin-top: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.profileSideBar {
  justify-content: space-between;
}
</style>
