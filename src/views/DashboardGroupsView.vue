<template>
  <div>
    <SideBarMenu />
    <DialogNewGroup />
    <GroupDashboardCards />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import GroupDashboardCards from "../components/cards/GroupDashboardCards.vue";
import DialogNewGroup from "../components/dialogs/DialogNewGroup.vue";

export default {
  components: { SideBarMenu, GroupDashboardCards, DialogNewGroup },
};
</script>

<style></style>
