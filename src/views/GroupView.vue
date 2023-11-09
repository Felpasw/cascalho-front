<template>
  <div>
    <HeaderComponent />
    <GroupCards />
    <SideBarMenu />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import GroupCards from "../components/cards/GroupCards.vue";

export default {
  components: { SideBarMenu, HeaderComponent, GroupCards },
};
</script>

<style></style>
