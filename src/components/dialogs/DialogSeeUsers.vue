<template>
  <div>
    <vs-button @click="active = !active">
      Ver usuários
      <template #animate>
        <UserDetailIcon class="userDetailWhite" />
      </template>
    </vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Usuários no grupo</h4>
      </template>
      <h4 v-if="!users">Nenhum usuário encontrado</h4>
      <div id="seeUsersDialog">
        <div v-for="user in users" :key="user.id" class="users">
          <div class="profile">
            <vs-avatar size="90" badge badge-color="success">
              <img :src="imagebaseUrl + user.image" alt="" />
            </vs-avatar>
            <h3 class="userTitle">{{ user.name }}</h3>
            <a :href="`/user/${user.id}`" style="text-decoration: none"
              ><vs-button>Ver mais</vs-button></a
            >
          </div>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { color } from "../../utils/colotPallete";
import { Axios } from "../../config/axios";
import UserDetailIcon from "../icons/UserDetailIcon.vue";

export default {
  async beforeMount() {
    try {
      const response = await Axios.get(`/user?groupId=${this.groupId}`);
      this.users = response.data;
      console.log("Usuários --> " + this.users);
    } catch (error) {
      console.log(error);
    }
  },
  props: {
    groupId: Number,
  },
  data: () => ({
    active: false,
    color: color,
    imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    users: [],
  }),
  components: { UserDetailIcon },
};
</script>

<style>
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
#AddNewCategory {
  display: flex;
}

.users {
  width: 33.33%;
  display: flex;
  justify-content: center;
}

.profile {
  cursor: pointer;
  align-items: center;
}

.userTitle {
  font-size: 16px;
  align-self: center;
  text-align: center;
  color: #ffff;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
}
#seeUsersDialog {
  display: flex;
  flex-wrap: wrap;
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-template-rows: repeat(3, 1fr); */
}
.userDetailWhite {
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%)
    hue-rotate(223deg) brightness(102%) contrast(102%);
}
</style>
