<template>
  <div id="groups">
    <div v-for="group in groups" :key="group.id" class="card">
      <vs-card>
        <template #title>
          <h3 class="groupTitle">{{ group.name }}</h3>
        </template>
        <template #img>
          <img :src="imagebaseUrl + group.image" class="groupImgCards" />
        </template>
        <template #text>
          <p></p>
        </template>
        <template #interactions>
          <dialogSeeUsers :groupId="group.id" :key="group.id" />
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import { color } from "../../utils/colotPallete";
import dialogSeeUsers from "./../dialogs/dialogSeeUsers.vue";

export default {
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/group`);
      this.groups = response.data.data;

      console.log(this.groups);
      loading.close();
    } catch (error) {
      window.location.href = "/";

      console.log(error);
    }
  },
  data() {
    return {
      groups: [],
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
      color: color,
    };
  },
  components: {
    dialogSeeUsers,
  },
};
</script>

<style>
#groups {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-height: 700px;

  margin-top: 10px;
  margin-left: 280px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.groupTitle {
  width: 100%;
  margin-bottom: 70px;
}
.groupImgCards {
  width: 300px;
  height: 300px;
}
</style>
