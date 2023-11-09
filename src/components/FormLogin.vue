<template>
  <div id="cardLogin">
    <a>
      <img src="../assets//img/cascalho-logo.png" id="logoImage" />
    </a>
    <vs-input
      placeholder="Email"
      v-model="email"
      :color="`${color.purple}`"
    ></vs-input>
    <vs-input
      placeholder="Senha"
      primary
      v-model="password"
      type="password"
      :color="`${color.purple}`"
    ></vs-input>
    <vs-button @click="onSubmmit" :color="`${color.purple}`">
      Entrar
      <template #animate>
        <RightArrow />
      </template>
    </vs-button>
  </div>
</template>

<script>
import RightArrow from "../components/icons/RightArrow.vue";
import { Axios } from "../config/axios";
import { errorMessage } from "../utils/messageProperties";
import { color } from "../utils/colotPallete";
export default {
  data() {
    return {
      email: "",
      password: "",
      color: color,
    };
  },
  methods: {
    async onSubmmit() {
      try {
        const response = await Axios.post(`/login`, {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("userId", `${response.data.user}`);

        setTimeout(() => {
          window.location.href = `/home`;
        }, 750);
      } catch (error) {
        console.log(error);
        this.openNotification();
      }
    },
    openNotification() {
      this.$vs.notification(errorMessage);
    },
  },
  components: {
    RightArrow,
  },
};
</script>

<style>
#cardLogin {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  margin: 0;
  margin-top: 300px;
}
#logoImage {
  width: 500px;
  margin-bottom: 40px;
  margin: 0;
  padding: 0;
  transition: all 0.75s;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
