<template>
  <div>
    <SideBarMenu />
    <DisplayDocuments />
  </div>
</template>

<script>
import SideBarMenu from "../components/SideBarMenu.vue";
import DisplayDocuments from "../components/DisplayDocuments.vue";
export default {
  components: { SideBarMenu, DisplayDocuments },
};
</script>

<style></style>
