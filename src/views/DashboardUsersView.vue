<template>
  <div>
    <DialogNewUser />
    <SideBarMenu />
    <UserDashboardCards />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import UserDashboardCards from "../components/cards/UserDashboardCards.vue";
import DialogNewUser from "../components/dialogs/DialogNewUser.vue";

export default {
  components: { SideBarMenu, UserDashboardCards, DialogNewUser },
};
</script>

<style></style>
