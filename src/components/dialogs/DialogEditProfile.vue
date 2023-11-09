<template>
  <div class="center">
    <vs-avatar @click="active = !active">
      <img :src="user.image" alt="" />
    </vs-avatar>

    <vs-dialog v-model="active">
      <template #header>
        <div id="headerContent">
          <vs-avatar circle size="100">
            <img v-if="!file" :src="user.image" alt="" />
            <img v-if="file" :src="imagePreviewURL" alt="" />
          </vs-avatar>
          <h3>{{ user.name }}</h3>
        </div>
      </template>

      <div class="con-form">
        <div id="inputContent">
          <vs-input v-model="name" placeholder="Nome"> </vs-input>
          <vs-input type="password" v-model="password" placeholder="Senha">
          </vs-input>
          <vs-input v-model="email" placeholder="E-mail"></vs-input>
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
import X from "../icons/X.vue";
import CheckIcon from "../icons/CheckIcon.vue";
import Send from "../icons/Send.vue";
export default {
  data: () => ({
    active: false,
    email: "",
    password: "",
    name: "",
    file: null,
    imagePreviewURL: null,
  }),
  props: {
    user: Object,
  },

  methods: {
    onFileChange(event) {
      this.file = event.target.files[0];
      this.imagePreviewURL = URL.createObjectURL(event.target.files[0]);
    },
    async onSubmit() {
      try {
        const fd = new FormData();
        if (this.name) fd.append("name", this.name);
        if (this.email) fd.append("email", this.email);
        if (this.password) fd.append("password", this.password);
        if (this.file) fd.append("archive", this.file);

        const response = await Axios.put(
          `/user/${localStorage.getItem("userId")}`,
          fd,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    X,
    CheckIcon,
    Send,
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
