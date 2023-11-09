<template>
  <div id="archivesDisplay">
    <div id="headerButtons">
      <DialogNewFolderVue />
      <DialogNewDocument />
    </div>
    <div id="foldersAndArchives">
      <div v-for="folder in folders" :key="folder.id">
        <DialogFolderInfo :folderName="folder.name" :folderId="folder.id" />
      </div>
      <div v-for="archive in archives" :key="archive.id">
        <DocumentDetail :archive="archive" />
      </div>
    </div>
  </div>
</template>

<script>
import { Axios } from "../config/axios";
import { color } from "../utils/colotPallete";
import DialogFolderInfo from "./dialogs/DialogFolderInfo.vue";
import DialogNewDocument from "./dialogs/DialogNewDocument.vue";
import DialogNewFolderVue from "./dialogs/DialogNewFolder.vue";
import DocumentDetail from "./tooltips/DocumentDetail.vue";
export default {
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(
        `/folder?userId=${localStorage.getItem("userId")}`
      );
      const responseDocuments = await Axios.get(
        `/document?userId=${localStorage.getItem("userId")}`
      );
      const documentsWithoutFolder = responseDocuments.data.filter(
        (document) => document.folderId == null
      );
      documentsWithoutFolder.forEach(async (document) => {
        const archiveResponse = (
          await Axios.get(`/archive/${document.archiveId}`)
        ).data;

        this.archives.push({ ...archiveResponse, documentId: document.id });
      });
      console.log(this.archives);
      // this.document
      this.folders = response.data;
      loading.close();
    } catch (error) {
      window.location.href = "/";

      console.log(error);
    }
  },
  data() {
    return {
      color: color,
      folders: [],
      archives: [],
    };
  },
  components: {
    DialogNewFolderVue,
    DialogFolderInfo,
    DialogNewDocument,
    DocumentDetail,
  },
};
</script>

<style>
#archivesDisplay {
  margin-left: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
#foldersAndArchives {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
#headerButtons {
  display: flex;
  margin-left: 350px;
}
.fileDoc {
  filter: brightness(0) saturate(100%) invert(83%) sepia(11%) saturate(6041%)
    hue-rotate(320deg) brightness(103%) contrast(91%);
  width: 60px;
  height: 60px;
}
</style>
