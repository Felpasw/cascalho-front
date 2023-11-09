<template>
  <div class="center">
    <vs-button @click="active = !active">
      Adicionar versão mais recente
      <template #animate>
        <FilePlus />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Enviar arquivo</h4>
      </template>

      <div class="con-form">
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
          <vs-button @click="onSubmit">
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
import { Axios } from "../../config/axios";
import { errorMessage, successMessage } from "../../utils/messageProperties";
import FilePlus from "../icons/FilePlus.vue";
import Send from "../icons/Send.vue";
import X from "../icons/X.vue";

export default {
  data: () => ({
    active: false,
    fileSelected: null,
  }),
  props: {
    documentId: String,
  },
  methods: {
    async onSubmit() {
      try {
        const fd = new FormData();
        fd.append("archive", this.fileSelected);
        fd.append("documentId", this.documentId);
        const response = await Axios.post(`/archive`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.$vs.notification(successMessage);
        window.location.reload();
      } catch (error) {
        console.log(error);
        this.$vs.notification(errorMessage);
      }
    },
    onFileChange(event) {
      this.fileSelected = event.target.files[0];
    },
  },
  components: { FilePlus, Send, X },
};
</script>

<style></style>
