<template>
  <div>
    <SideBarMenu />
    <PublicationsDashboardCards />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import PublicationsDashboardCards from "../components/cards/PublicationsDashboardCards.vue";
export default {
  components: {
    SideBarMenu,
    PublicationsDashboardCards,
  },
};
</script>

<style></style>
