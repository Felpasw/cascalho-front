<template>
  <div>
    <HeaderComponent />
    <FolderAndArchivesDisplay />
    <SideBarMenu />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FolderAndArchivesDisplay from "../components/FolderAndArchivesDisplay.vue";
export default {
  components: { SideBarMenu, HeaderComponent, FolderAndArchivesDisplay },
};
</script>

<style></style>
