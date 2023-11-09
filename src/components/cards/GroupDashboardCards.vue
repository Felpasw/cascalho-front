<template>
  <div id="groupDashboardCards">
    <div v-for="group in groups" :key="group.id">
      <vs-card type="4" class="userCards">
        <template #title>
          <h3>{{ group.name }}</h3>
        </template>
        <template #img>
          <img :src="imagebaseUrl + group.image" class="imgCard" />
        </template>
        <template #text>
          <div id="iconContent">
            <DialogEditGroup
              :imgSrc="imagebaseUrl + group.image"
              :groupName="group.name"
              :id="group.id"
            />
            <DialogExclude
              :imgSrc="imagebaseUrl + group.image"
              :id="group.id"
              :name="group.name"
              :content="'group'"
            />
            <DialogEditMembersGroup
              :id="group.id"
              :imgSrc="imagebaseUrl + group.image"
              :groupName="group.name"
            />
          </div>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
import { color } from "../../utils/colotPallete";
import DialogExclude from "../dialogs/DialogExcludeItem.vue";
import DialogEditMembersGroup from "../dialogs/DialogEditMembersGroup.vue";
import { Axios } from "../../config/axios";
import DialogEditGroup from "../dialogs/DialogEditGroup.vue";
export default {
  data() {
    return {
      color: color,
      groups: [],
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    };
  },
  async beforeMount() {
    try {
      const loading = this.$vs.loading({
        background: color.darkRed,
      });
      const response = await Axios.get(`/group`);
      this.groups = response.data.data;

      loading.close();
    } catch (error) {
      window.location.href = "/";

      console.log(error);
    }
  },

  components: {
    DialogExclude,
    DialogEditMembersGroup,
    DialogEditGroup,
  },
};
</script>

<style>
#btnNewUser {
  margin-left: 290px;
  margin-top: 40px;
  width: 30%;
  align-self: center;
}
#groupDashboardCards {
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  margin-left: 360px;
  align-items: center;
  margin-top: 19px;
  height: 100%;
  gap: 12px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
