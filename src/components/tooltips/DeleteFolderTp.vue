<template>
  <div>
    <template>
      <div class="center">
        <vs-tooltip bottom shadow not-hover v-model="activeTooltip1">
          <vs-button @click="activeTooltip1 = !activeTooltip1" danger>
            Excluir pasta
            <template #animate>
              <FolderMinus />
            </template>
          </vs-button>

          <template #tooltip>
            <div class="content-tooltip">
              <h4 class="center">Confirmar</h4>
              <p>Você tem certeza que quer deletar essa pasta?</p>
              <footer>
                <vs-button @click="onSubmit" block danger> Excluir </vs-button>
                <vs-button
                  @click="activeTooltip1 = false"
                  transparent
                  dark
                  block
                >
                  Cancelar
                </vs-button>
              </footer>
            </div>
          </template>
        </vs-tooltip>
      </div>
    </template>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import FolderMinus from "../icons/FolderMinus.vue";

export default {
  data: () => ({
    activeTooltip1: false,
  }),
  props: {
    folderId: Number,
    documents: Array,
  },
  methods: {
    async onSubmit() {
      try {
        const promises = [];
        this.documents.forEach((document) => {
          const docWithoutFolder = { ...document, folderId: null };
          promises.push(
            Axios.put(`/document/${document.id}`, docWithoutFolder)
          );
        });
        await Promise.all(promises);
        await Axios.delete(`/folder/${this.folderId}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: { FolderMinus },
};
</script>

<style>
#tooltipBtn {
  width: 50px;
  height: 50px;
}
</style>
