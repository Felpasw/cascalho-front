<template>
  <div>
    <vs-button @click="active = !active">
      <template #animate>
        <FolderPlus />
      </template>
      Adicionar pasta
    </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin">Nova pasta</h4>
      </template>

      <div id="form">
        <vs-input v-model="name" placeholder="Nome" block> </vs-input>
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
import CheckIcon from "../icons/CheckIcon.vue";
import { Axios } from "../../config/axios";
import FolderPlus from "../icons/FolderPlus.vue";
import Send from "../icons/Send.vue";

export default {
  data: () => ({
    active: false,
    name: "Nova pasta",
  }),
  components: {
    CheckIcon,
    X,
    FolderPlus,
    Send,
  },
  methods: {
    async onSubmmit() {
      try {
        await Axios.post("/folder", {
          userId: localStorage.getItem("userId"),
          name: this.name,
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
</style>
