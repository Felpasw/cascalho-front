<template>
  <div>
    <vs-button @click="active = !active">
      Adicionar documento
      <template #animate>
        <FilePlus />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Novo documento</h4>
      </template>

      <div id="form">
        <vs-input
          type="text"
          v-model="fileName"
          placeholder="Nome do documento"
        />

        <input type="file" @change="onFileChange" />
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
import { Axios } from "../../config/axios";
import FilePlus from "../icons/FilePlus.vue";
import Send from "../icons/Send.vue";

export default {
  data: () => ({
    active: false,
    fileSelected: null,
    fileName: "",
  }),
  components: {
    X,
    FilePlus,
    Send,
  },
  props: {
    folderId: Number,
  },
  methods: {
    onFileChange(event) {
      this.fileSelected = event.target.files[0];
    },
    async onSubmmit() {
      try {
        const fd = new FormData();
        fd.append("archive", this.fileSelected);
        fd.append("userId", localStorage.getItem("userId"));
        if (this.fileName) fd.append("name", this.fileName);
        if (this.folderId) fd.append("folderId", this.folderId);

        await Axios.post("/document", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.active = !this.active;
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
#newFolder {
  display: flex;
  margin-left: 670px;
}
</style>
