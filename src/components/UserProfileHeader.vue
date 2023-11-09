<template>
  <div id="profileHeader">
    <div id="profilePicture">
      <vs-avatar circle size="280">
        <img :src="imagebaseUrl + user.image" alt="" />
      </vs-avatar>
      <h1 id="userTitle">{{ user.name }}</h1>
    </div>
  </div>
</template>

<script>
import { Axios } from "../config/axios";
import { color } from "../utils/colotPallete";
export default {
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      this.user = (await Axios.get(`/user/${this.$route.params.id}`)).data;
      loading.close();
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
      user: {},
    };
  },
};
</script>

<style>
#profileHeader {
  width: 100%;
  background-color: #451952;
  height: 180px;
  position: relative;
}
#profilePicture {
  align-self: center;
  margin-left: 650px;
  margin-right: 550px;
}
#userTitle {
  font-size: 40px;
}
</style>
