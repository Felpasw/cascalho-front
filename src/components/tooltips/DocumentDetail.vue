<template>
  <div>
    <template>
      <div class="center">
        <vs-tooltip bottom not-hover shadow v-model="activeTooltip1">
          <div @click="activeTooltip1 = !activeTooltip1" class="docLink">
            <FileDoc class="fileDoc" />
            <p>
              {{
                archive.name.slice(33).length > 16
                  ? archive.name.slice(33, 50) + "..."
                  : archive.name.slice(33)
              }}
            </p>
          </div>
          <template #tooltip>
            <div class="content-tooltip">
              <h4 class="center">
                <!-- {{
                  archive.name.slice(33).length > 16
                    ? archive.name.slice(33, 50) + "..."
                    : archive.name.slice(33)
                }} -->
                {{ archive.name.slice(33) }}
              </h4>
              <p>O que deseja fazer com este documento?</p>
              <footer>
                <a
                  :href="`/document/${archive.documentId}`"
                  style="text-decoration: none"
                >
                  <vs-button block>
                    Editar versões
                    <!-- <template #animate>
                      <EditAlt class="userDetailWhite" />
                    </template> -->
                  </vs-button>
                </a>
                <vs-button @click="onSubmit" block danger>
                  Excluir
                  <!-- <template #animate>
                    <X />
                  </template> -->
                </vs-button>
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
import X from "../icons/X.vue";
import FileDoc from "../icons/fileDoc.vue";
import { successMessage, errorMessage } from "../../utils/messageProperties";
export default {
  data: () => ({
    activeTooltip1: false,
  }),
  props: {
    archive: Object,
  },
  methods: {
    async onSubmit() {
      try {
        await Axios.delete(`/document/${this.archive.documentId}`);
        this.$vs.notification(successMessage);
        window.location.reload();
      } catch (error) {
        console.log(error);
        this.$vs.notification(errorMessage);
      }
    },
  },
  components: { FileDoc, X },
};
</script>

<style>
#tooltipBtn {
  width: 50px;
  height: 50px;
}
.docLink {
  color: #f39f5a;
  text-decoration: none;
  display: flex;
  cursor: pointer;
  align-items: center;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
}
</style>
