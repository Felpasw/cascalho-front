<template>
  <div>
    <div id="newCategoryWrapper">
      <DialogNewCategory />
    </div>
    <SideBarMenu />
    <CategoryDashboardCards />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import CategoryDashboardCards from "../components/cards/CategoryDashboardCards.vue";
import DialogNewCategory from "../components/dialogs/dialogNewCategory.vue";

export default {
  components: { SideBarMenu, CategoryDashboardCards, DialogNewCategory },
};
</script>

<style>
#newCategoryWrapper {
  margin: 13px;
  margin-left: 650px;
  width: 30%;
}
</style>
