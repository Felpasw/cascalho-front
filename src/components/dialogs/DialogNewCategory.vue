<template>
  <div id="AddNewCategory">
    <vs-button @click="active = !active">
      Adicionar categoria
      <template #animate>
        <Plus />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Adicionar categoria</h4>
      </template>

      <div id="form">
        <vs-input v-model="name" placeholder="Nome" block> </vs-input>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          @change="onFileSelected"
        />
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
import X from "../icons/X.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import Plus from "../icons/Plus.vue";
import { errorMessage, successMessage } from "../../utils/messageProperties";
import Send from "../icons/Send.vue";

export default {
  data: () => ({
    active: false,
    name: "",
    selectedFile: null,
  }),
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    async onSubmit() {
      try {
        const fd = new FormData();
        fd.append("archive", this.selectedFile);
        fd.append("name", this.name);
        await Axios.post("/category", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.$vs.notification(successMessage);
      } catch (error) {
        console.log(error);
        this.$vs.notification(errorMessage);
      }
    },
  },
  components: {
    X,
    Plus,
    Send,
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
#AddNewCategory {
}
</style>
