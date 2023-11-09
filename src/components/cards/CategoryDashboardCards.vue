<template>
  <div>
    <div id="categoryDasboardCards">
      <vs-card
        v-for="category in categories"
        :key="category.id"
        type="4"
        class="userCards"
      >
        <template #title>
          <h3>{{ category.name }}</h3>
        </template>
        <template #img>
          <img :src="imagebaseUrl + category.icon" class="imgCategory" />
        </template>
        <template #text>
          <div class="footerCategoryCardContent">
            <DialogEditCategory
              :imgSrc="imagebaseUrl + category.icon"
              :categoryName="category.name"
              :id="category.id"
            />
            <DialogExcludeItem
              :imgSrc="imagebaseUrl + category.icon"
              :name="category.name"
              :id="category.id"
              :content="'category'"
            />
          </div>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import { color } from "../../utils/colotPallete";
import DialogExcludeItem from "../dialogs/DialogExcludeItem.vue";
import { Axios } from "../../config/axios";
import DialogEditCategory from "../dialogs/DialogEditCategory.vue";
export default {
  data() {
    return {
      color: color,
      categories: [],
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    };
  },
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/category`);
      this.categories = response.data.data;

      loading.close();
    } catch (error) {
      console.log(error);
    }
  },

  components: {
    DialogExcludeItem,
    DialogEditCategory,
  },
};
</script>

<style>
#userTitle {
  text-align: center;
}
#btnNewUser {
  margin-left: 290px;
  margin-top: 40px;
  width: 30%;
  align-self: center;
}
.imgCategory {
  width: 300px;
  height: 300px;
}
.footerCategoryCardContent {
  display: flex;
  justify-content: space-around;
}
#categoryDasboardCards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-left: 360px;
  height: 700px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
