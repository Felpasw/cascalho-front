<template>
  <div>
    <SideBarMenu />
    <UserProfileHeader />
    <DisplayPublicationsUser />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import UserProfileHeader from "../components/UserProfileHeader.vue";
import DisplayPublicationsUser from "../components/DisplayPublicationsUser.vue";

export default {
  components: { UserProfileHeader, SideBarMenu, DisplayPublicationsUser },
};
</script>

<style></style>
