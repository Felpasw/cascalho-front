<template>
  <div>
    <HeaderComponent />
    <CategoryCard />
    <SideBarMenu />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import CategoryCard from "../components/cards/CategoryCards.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
export default {
  components: { SideBarMenu, HeaderComponent, CategoryCard },
};
</script>

<style></style>
