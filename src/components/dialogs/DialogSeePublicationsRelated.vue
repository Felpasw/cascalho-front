<template>
  <div class="center">
    <vs-button @click="active = !active">
      Ver publicações relacionadas
      <template #animate>
        <Detail />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Publicações relacionadas</h4>
      </template>
      <div id="publicationsFilterDiv">
        <div v-for="publication in publications" :key="publication.id">
          <vs-card>
            <template #title>
              <h3>{{ publication.description }}</h3>
            </template>
            <template #img>
              <img :src="imagebaseUrl + publication.image" alt="" />
            </template>
            <template #text> {{ publication.name }} </template>
            <template #interactions>
              <DialogSeePublication
                :publicationId="publication.id"
                :imageUrl="imagebaseUrl + publication.image"
              />
            </template>
          </vs-card>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import Detail from "../icons/Detail.vue";
import DialogSeePublication from "./DialogSeePublication.vue";

export default {
  data: () => ({
    active: false,
    publications: [],
    imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
  }),
  props: {
    id: Number,
  },
  async beforeMount() {
    const response = (await Axios.get(`/publication?categoryId=${this.id}`))
      .data;
    console.log(!response);
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
  },
  components: { DialogSeePublication, Detail },
};
</script>

<style>
#publicationsFilterDiv {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 23px;
}
</style>
