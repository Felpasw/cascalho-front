<template>
  <div id="publicationsUser">
    <div v-for="publication in publications" :key="publication.id">
      <vs-card>
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
</template>

<script>
import { Axios } from "../config/axios";
import DialogSeePublication from "../components/dialogs/DialogSeePublication.vue";

export default {
  data: () => ({
    publications: [],
    imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
  }),
  async beforeMount() {
    try {
      const response = (
        await Axios.get(`/publication?userId=${this.$route.params.id}`)
      ).data;
      response.forEach(async (element) => {
        const responseDoc = await Axios.get(`/document/${element.documentId}`);
        const responseArchive = await Axios.get(
          `/archive/${responseDoc.data.archiveId}`
        );
        this.publications.push({
          ...element,
          image: responseArchive.data.name,
        });
      });
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  },
  components: {
    DialogSeePublication,
  },
};
</script>

<style>
#publicationsUser {
  display: flex;
  flex-wrap: wrap;
  margin-top: 190px;
  margin-left: 300px;
  gap: 35px;
  max-height: 350px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
