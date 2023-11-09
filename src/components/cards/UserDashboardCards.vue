<template>
  <div id="userCards">
    <div v-for="user in users" :key="user.id">
      <vs-card type="4" class="userCards">
        <template #title>
          <h3>{{ user.name }}</h3>
        </template>
        <template #img>
          <img :src="imagebaseUrl + user.image" class="imgCard" />
        </template>
        <template #text>
          <div id="iconContent">
            <DialogEdit
              :imgSrc="imagebaseUrl + user.image"
              :userName="user.name"
              :id="user.id"
            />
            <DialogExclude
              :imgSrc="imagebaseUrl + user.image"
              :name="user.name"
              :content="'user'"
              :id="user.id"
            />
            <DialogUserInfo
              :imgSrc="imagebaseUrl + user.image"
              :userName="user.name"
              :id="user.id"
            />
          </div>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import { color } from "../../utils/colotPallete";
import DialogEdit from "../dialogs/DialogEditUser.vue";
import DialogExclude from "../dialogs/DialogExcludeItem.vue";
import { Axios } from "../../config/axios";
import DialogUserInfo from "../dialogs/DialogUserInfo.vue";
export default {
  data() {
    return {
      color: color,
      users: [],
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    };
  },
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/user`);
      this.users = response.data.data;

      loading.close();
    } catch (error) {
      window.location.href = "/";

      console.log(error);
    }
  },

  components: {
    DialogEdit,
    DialogExclude,
    DialogUserInfo,
  },
};
</script>

<style>
#userCards {
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  margin-top: 19px;
  margin-left: 360px;

  height: 100%;
  gap: 12px;
  overflow-y: scroll;
  max-height: 640px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
#userTitle {
  text-align: center;
}
.userCards {
  margin-bottom: 150px;
}
.imgCard {
  width: 400px;
  height: 300px;
  max-width: 400px;
  max-height: 400px;
}
</style>
