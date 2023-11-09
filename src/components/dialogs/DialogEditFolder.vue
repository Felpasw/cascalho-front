<template>
  <div>
    <vs-button @click="active = !active">
      Gerenciar pasta
      <template #animate>
        <FilePlus />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h2 class="not-margin">Gerenciar pasta</h2>
      </template>
      <div>
        <div class="tableAndTitle">
          <h4>Na pasta</h4>
          <DocumentsInFolderTable :archives="archives" />
        </div>
        <div class="tableAndTitle">
          <h4>Fora da pasta</h4>
          <AllDocumentsTable :folderId="folderId" />
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="active = !active" danger>
            Cancelar
            <template #animate>
              <X />
            </template>
          </vs-button>
          <vs-button @click="onSubmmit">
            Enviar
            <template #animate>
              <Send />
            </template>
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import X from "../icons/X.vue";
import FilePlus from "../icons/FilePlus.vue";
import Send from "../icons/Send.vue";
import AllDocumentsTable from "../tables/AllDocumentsTable.vue";
import DocumentsInFolderTable from "../tables/DocumentsInFolderTable.vue";

export default {
  data: () => ({
    active: false,
    fileSelected: null,
  }),
  components: {
    X,
    FilePlus,
    Send,
    AllDocumentsTable,
    DocumentsInFolderTable,
  },
  props: {
    archives: Array,
    folderId: Number,
  },
  methods: {
    onFileChange(event) {
      this.fileSelected = event.target.files[0];
    },
    async onSubmmit() {},
  },
};
</script>

<style>
.tableAndTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f39f5a;
}
</style>
