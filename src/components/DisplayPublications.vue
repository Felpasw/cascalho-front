<template>
  <div id="publications">
    <FormNewPublication />
    <div id="publicationsDiv">
      <div v-for="publication in publications" :key="publication.id">
        <vs-card class="publications">
          <template #title>
            <h3>{{ publication.description }}</h3>
          </template>
          <template #img>
            <img
              v-if="publication.documentId"
              :src="imagebaseUrl + publication.image"
            />
          </template>
          <template #text>
            <p class="publicationDescription">
              {{ publication.category }}
            </p>
            <DialogSeePublication
              :publicationId="publication.id"
              :imageUrl="imagebaseUrl + publication.image"
            />
          </template>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Axios } from "../config/axios";
import { color } from "../utils/colotPallete";
import DialogSeePublication from "./dialogs/DialogSeePublication.vue";
import FormNewPublication from "./formNewPublication.vue";

export default {
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/publication`);
      response.data.data.forEach(async (element) => {
        const responseDoc = await Axios.get(`/document/${element.documentId}`);
        const responseArchive = await Axios.get(
          `/archive/${responseDoc.data.archiveId}`
        );
        const responseCategory = await Axios.get(
          `/category/${element.categoryId}`
        );
        this.publications.push({
          ...element,
          image: responseArchive.data.name,
          category: responseCategory.data.name,
        });
      });

      loading.close();
    } catch (error) {
      window.location.href = "/";
      console.log(error);
    }
  },
  data() {
    return {
      publications: [],
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
      color: color,
    };
  },
  components: { FormNewPublication, DialogSeePublication },
};
</script>

<style>
#publications {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
  margin-left: 150px;
  width: 100%;
  align-items: center;
  width: 70%;
  max-height: 644px;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.publications {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.publicationDescription {
  color: aliceblue;
}
#publicationsDiv {
  display: flex;
  gap: 30px;
  margin-left: 200px;
  flex-wrap: wrap;
}
</style>
