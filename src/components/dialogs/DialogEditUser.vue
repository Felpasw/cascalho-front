<template>
  <div class="center">
    <vs-button @click="active = !active" color="#451952">
      <EditAlt></EditAlt>
    </vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <div id="headerContent">
          <vs-avatar circle size="100">
            <img :src="imgSrc" alt="" />
          </vs-avatar>
          <h3>{{ userName }}</h3>
        </div>
      </template>

      <div class="con-form">
        <div id="inputContent">
          <vs-input v-model="name" placeholder="Nome">
            <template #icon> </template>
          </vs-input>
          <vs-input v-model="email" placeholder="Email">
            <template #icon> </template>
          </vs-input>
          <vs-input type="password" v-model="password" placeholder="Senha">
            <template #icon> </template>
          </vs-input>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            @change="onFileChange"
          />
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
import EditAlt from "../icons/EditAlt.vue";
import X from "../icons/X.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import Send from "../icons/Send.vue";

export default {
  data: () => ({
    active: false,
    email: "",
    password: "",
    name: "",
    selectedFile: null,
  }),
  props: {
    imgSrc: String,
    userName: String,
    id: Number,
  },
  components: {
    EditAlt,
    X,
    CheckIcon,
    Send,
  },
  methods: {
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    async onSubmit() {
      try {
        const fd = new FormData();
        if (this.name) fd.append("name", this.name);
        if (this.email) fd.append("email", this.email);
        if (this.password) fd.append("password", this.password);
        if (this.selectedFile) fd.append("archive", this.selectedFile);

        const response = await Axios.put(`/user/${this.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scope>
.vs-dialog__content {
  display: flex;
  justify-content: center;
}

#inputContent {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-dialog {
  padding-top: 15px;
}
#userTitle {
  color: #f39f5a;
}
</style>
