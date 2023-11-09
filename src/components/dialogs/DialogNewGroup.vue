<template>
  <div id="formNewGroup">
    <vs-button @click="active = !active" id="btnNewGroup">
      Adicionar grupo
      <template #animate>
        <UserPlus />
      </template>
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Adicionar grupo</h4>
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
          <vs-button color="#451952" @click="active = !active">
            <X />
          </vs-button>
          <vs-button color="#451952" @click="onSubmit">
            <CheckIcon />
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
        await Axios.post("/group", fd, {
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
    CheckIcon,
    X,
    UserPlus,
  },
};
</script>

<style>
#formNewGroup {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#btnNewGroup {
  width: 30%;
  margin-top: 1%;
  margin-left: 300px;
  align-self: center;
}
</style>
