<template>
  <div class="categories">
    <div v-for="category in categories" :key="category.id" class="card">
      <vs-card>
        <template #title>
          <h3>{{ category.name }}</h3>
        </template>
        <template #img>
          <img :src="imagebaseUrl + category.icon" class="cardCategoriesImg" />
        </template>
        <template #text>
          <p>
            <!-- Lorem ipsum dolor sit amet consectetur, adipisicing elit.aaaaaas -->
          </p>
        </template>
        <template #interactions>
          <DialogSeePublicationsRelated :id="category.id" />
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import { color } from "../../utils/colotPallete";
import DialogSeePublicationsRelated from "../dialogs/DialogSeePublicationsRelated.vue";

export default {
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/category`);
      this.categories = response.data.data;
      console.log(this.categories);
      loading.close();
    } catch (error) {
      window.location.href = "/";
      console.log(error);
    }
  },
  data() {
    return {
      categories: [],
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
      color: color,
    };
  },
  components: { DialogSeePublicationsRelated },
};
</script>

<style>
.categories {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 26px;
  margin-left: 280px;
  max-height: 700px;
  margin-top: 10px;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.cardCategoriesImg {
  width: 300px;
  height: 300px;
}
</style>
