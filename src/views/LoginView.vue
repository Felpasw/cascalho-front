<template>
  <div id="loginAndImage">
    <FormLogin />
    <img
      id="imageMenu"
      src="https://img.pikbest.com/backgrounds/20220119/technology-intelligent-light-effect-blue-background_6235412.jpg!w700wp"
    />
  </div>
</template>

<script>
import FormLogin from "../components/FormLogin.vue";
export default {
  data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {},
  components: {
    FormLogin,
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
  margin-top: 150px;
}
#loginAndImage {
  display: flex;
}

#imageMenu {
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  width: 50%;
  height: 100vh;
  background-image: url("https://img.pikbest.com/backgrounds/20220119/technology-intelligent-light-effect-blue-background_6235412.jpg!w700wp");
}
</style>
