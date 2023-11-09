<template>
  <div class="center">
    <vs-button
      v-if="content === 'user'"
      @click="active = !active"
      color="#451952"
    >
      <UserX />
    </vs-button>

    <vs-button
      v-if="content != 'user'"
      @click="active = !active"
      color="#451952"
    >
      <Trash />
    </vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <div class="profileRemoveUser">
          <vs-avatar circle size="100">
            <img :src="imgSrc" alt="" />
          </vs-avatar>
          <h2>Remover {{ name }}?</h2>
        </div>
      </template>

      <div class="footer-dialog">
        <vs-button @click="active = !active" danger>
          Cancelar
          <template #animate>
            <X />
          </template>
        </vs-button>
        <vs-button @click="removeItem">
          Confirmar
          <template #animate>
            <Send />
          </template>
        </vs-button>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import UserX from "../icons/UserX.vue";
import X from "../icons/X.vue";
import CheckIconVue from "../icons/CheckIcon.vue";
import Trash from "../icons/Trash.vue";
import { Axios } from "../../config/axios";
import { errorMessage, successMessage } from "../../utils/messageProperties";
import Send from "../icons/Send.vue";

export default {
  data: () => ({
    active: false,
  }),
  props: {
    imgSrc: String,
    name: String,
    content: String,
    id: Number,
  },
  components: {
    UserX,
    X,
    Trash,
    Send,
  },
  methods: {
    async removeItem() {
      try {
        await Axios.delete(`/${this.content}/${this.id}`);
        this.$vs.notification(successMessage);
      } catch (error) {
        console.log(error);
        this.$vs.notification(errorMessage);
      }
    },
  },
};
</script>
<style>
.profileRemoveUser {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
  color: #f39f5a;
}
</style>
