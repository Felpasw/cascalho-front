<template>
  <div id="mainDoc">
    <a :href="baseUrl + documentName" class="documentLink">
      <FileDoc id="fileDocIcon" />
      <h1>{{ documentName.slice(33) }}</h1>
    </a>
    <DialogNewVersionArchive :documentId="this.$route.params.id" />
    <div v-for="archive in archives" :key="archive.id">
      <h3>
        <a :href="baseUrl + archive.name" class="documentLinkVersion">
          <FileDoc class="fileDocIcon" />
          {{ archive.name.slice(33) }} - enviada em {{ archive.createdAt }}</a
        >
        <div class="bottomButtonsDocument">
          <vs-button @click="onSubmit(archive.id)">
            Trocar para esta versao
            <template #animate>
              <Transfer />
            </template>
          </vs-button>
          <vs-button @click="removeArchive(archive.id)" danger>
            Remover versão
            <template #animate>
              <X />
            </template>
          </vs-button>
        </div>
      </h3>
    </div>
  </div>
</template>

<script>
import { Axios } from "../config/axios";
import FileDoc from "./icons/fileDoc.vue";
import { color } from "../utils/colotPallete";
import DialogNewVersionArchive from "./dialogs/DialogNewVersionArchive.vue";
import DialogExcludeItem from "./dialogs/DialogExcludeItem.vue";
import X from "./icons/X.vue";
import Transfer from "./icons/Transfer.vue";
export default {
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/document/${this.$route.params.id}`);
      if (response.data.userId != localStorage.getItem("userId")) {
        loading.close();
        window.location.href = "/archives";
      }
      this.document = response.data;

      const responseMainArchive = await Axios.get(
        `/archive/${response.data.archiveId}`
      );
      this.documentName = responseMainArchive.data.name;

      const responseArchives = await Axios.get(
        `/archive?documentId=${this.$route.params.id}`
      );
      console.log(responseArchives.data);
      this.archives = responseArchives.data.filter(
        (archive) => archive.id != response.data.archiveId
      );

      loading.close();
    } catch (error) {
      console.log(error);
    }
  },

  components: {
    FileDoc,
    DialogNewVersionArchive,
    DialogExcludeItem,
    Transfer,
    X,
  },
  data() {
    return {
      documentName: "",
      document: {},
      archives: [],
      baseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    };
  },
  methods: {
    async onSubmit(id) {
      try {
        await Axios.put(`/document/${this.$route.params.id}`, {
          archiveId: id,
        });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async removeArchive(id) {
      try {
        await Axios.delete(`/archive/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#mainDoc {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#fileDocIcon {
  filter: brightness(0) saturate(100%) invert(81%) sepia(39%) saturate(2045%)
    hue-rotate(319deg) brightness(101%) contrast(91%);
  width: 200px;
  height: 200px;
  margin-top: 100px;
}
.bottomButtonsDocument {
  display: flex;
}
.documentLink {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    transform: scale(1.05);
    transition: all 0.5s;
  }
}

.fileDocIcon {
  filter: brightness(0) saturate(100%) invert(81%) sepia(39%) saturate(2045%)
    hue-rotate(319deg) brightness(101%) contrast(91%);
  width: 50px;
  height: 50px;
}
.documentLinkVersion {
  display: flex;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: #f39f5a;
  &:hover {
    transform: scale(1.05);
    transition: all 0.5s;
  }
}
</style>
