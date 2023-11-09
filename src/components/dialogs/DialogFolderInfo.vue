<template>
  <div class="center">
    <vs-button @click="active = !active" class="folderBtn" danger>
      <Folder /> {{ folderName }}
    </vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <div class="profileRemoveUser">
          <h1>{{ folderName }}</h1>
        </div>
      </template>
      <div id="allContent">
        <div v-if="archives">
          <div
            v-for="archive in archives"
            :key="archive.id"
            class="documentLinksFolder"
          >
            <DocumentDetail :archive="archive" />
          </div>
        </div>
        <div class="footerContent">
          <DeleteFolderTp :folderId="folderId" :documents="this.documents" />
          <DialogNewDocument :folderId="folderId" />
          <DialogEditFolder
            :archives="this.archives"
            :folderId="this.folderId"
          />
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import Folder from "../icons/Folder.vue";
import FileDoc from "../icons/fileDoc.vue";
import DeleteFolderTp from "../tooltips/DeleteFolderTp.vue";
import DocumentDetail from "../tooltips/DocumentDetail.vue";
import DialogEditFolder from "./DialogEditFolder.vue";
import DialogNewDocument from "./DialogNewDocument.vue";

export default {
  data: () => ({
    active: false,
    archives: [],
    documents: [],
  }),
  async beforeMount() {
    try {
      const response = await Axios.get(`/document?folderId=${this.folderId}`);
      this.documents = response.data;
      response.data.forEach(async (document) => {
        console.log(document);
        const archive = await Axios.get(`/archive/${document.archiveId}`);
        this.archives.push({ ...archive.data, documentId: document.id });
      });
    } catch (error) {
      console.log(error);
    }
  },
  props: {
    folderName: String,
    folderId: Number,
  },
  components: {
    Folder,
    DeleteFolderTp,
    DialogNewDocument,
    DocumentDetail,
    DialogEditFolder,
  },
};
</script>
<style>
.profileRemoveUser {
  margin-top: 50px;
  color: #f39f5a;
}
#fileDocumentInput {
  align-self: center;
}
.footerContent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.documentLinksFolder {
  display: flex;
  color: #f39f5a;
  padding: 20px;
}
.documentFolderLink {
  color: #f39f5a;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
.documentFolderLinkIcon {
  filter: brightness(0) saturate(100%) invert(80%) sepia(79%) saturate(3535%)
    hue-rotate(314deg) brightness(98%) contrast(95%);
}
#allContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
