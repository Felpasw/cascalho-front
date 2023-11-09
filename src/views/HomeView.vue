<template>
  <div>
    <HeaderComponent />
    <DisplayPublications />
    <SideBarMenu />
    <RightSideBar />
  </div>
</template>

<script>
import HeaderComponent from "../components/HeaderComponent.vue";
import SideBarMenu from "../components/SideBarMenu.vue";
import RightSideBar from "../components/RightSideBar.vue";
import DisplayPublications from "../components/DisplayPublications.vue";
export default {
  components: {
    SideBarMenu,
    HeaderComponent,
    RightSideBar,
    DisplayPublications,
  },
};
</script>

<style></style>
