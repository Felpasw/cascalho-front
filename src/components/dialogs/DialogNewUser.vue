<template>
  <div id="formNewUser">
    <vs-button @click="active = !active" id="btnNew">
      Adicionar usuário
      <template #animate>
        <UserPlus />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Adicionar usuário</h4>
      </template>

      <div id="form">
        <vs-input v-model="name" placeholder="Nome" block> </vs-input>
        <vs-input v-model="email" placeholder="Email" block type="email">
        </vs-input>
        <vs-input v-model="password" placeholder="Senha" block type="password">
        </vs-input>

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
import UserPlus from "../icons/UserPlus.vue";
import { errorMessage, successMessage } from "../../utils/messageProperties";
import Send from "../icons/Send.vue";
export default {
  data: () => ({
    active: false,
    password: "",
    email: "",
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
        fd.append("password", this.name);
        fd.append("email", this.name);

        await Axios.post("/user", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.$vs.notification(successMessage);
      } catch (error) {
        this.$vs.notification(errorMessage);
      }
      window.location.reload();
    },
  },
  components: {
    CheckIcon,
    X,
    UserPlus,
    Send,
  },
};
</script>

<style>
#formNewUser {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#btnNew {
  margin-left: 290px;
  margin-top: 1%;
  width: 30%;
  align-self: center;
}
</style>
