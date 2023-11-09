<template>
  <div v-if="render" id="publicationsDashboard">
    <div v-for="publication in publications" :key="publication.id">
      <vs-card class="publicationDashboardItem">
        <template #title>
          <h3>{{ publication.description }}</h3>
        </template>
        <template #img>
          <img
            v-if="publication.documentId"
            :src="imagebaseUrl + publication.image"
          />
          <img src="" alt="" />
        </template>
        <template #text>
          <div id="cardBottomButtons">
            <DialogSeePublication
              :publicationId="publication.id"
              :imageUrl="imagebaseUrl + publication.image"
            />
            <DeletePublicationTp :id="publication.id" />
          </div>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import { color } from "../../utils/colotPallete";
import DialogSeePublication from "./../dialogs/DialogSeePublication.vue";
import DeletePublicationTp from "../tooltips/DeletePublicationTp.vue";
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
        this.publications.push({
          ...element,
          image: responseArchive.data.name,
        });
      });

      console.log(this.publications);
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
      render: true,
    };
  },
  components: {
    DialogSeePublication,
    DeletePublicationTp,
  },
};
</script>

<style>
#publicationsDashboard {
  margin-top: 50px;
  margin-left: 300px;
  display: grid;
  max-height: 690px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 32px;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.publicationDescription {
  color: aliceblue;
}
#cardBottomButtons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
