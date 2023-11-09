<template>
  <div>
    <template>
      <div class="center">
        <vs-tooltip bottom shadow not-hover v-model="activeTooltip1">
          <vs-button
            id="tooltipBtn"
            danger
            @click="activeTooltip1 = !activeTooltip1"
            color="#662549"
          >
            Remover
          </vs-button>

          <template #tooltip>
            <div class="content-tooltip">
              <h4 class="center">Confirmar</h4>
              <p>Você tem certeza que quer deletar essa publicação?</p>
              <footer>
                <vs-button @click="onSubmit" danger block> Deletar </vs-button>
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

export default {
  data: () => ({
    activeTooltip1: false,
  }),

  props: {
    id: Number,
  },
  methods: {
    async onSubmit() {
      try {
        await Axios.delete(`/publication/${this.id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#tooltipBtn {
  width: 50px;
  height: 50px;
}
</style>
