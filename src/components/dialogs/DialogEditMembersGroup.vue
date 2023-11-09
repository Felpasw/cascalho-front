<template>
  <div class="center">
    <vs-button @click="active = !active" color="#451952">
      <UserDetailIcon />
    </vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <div id="headerContent">
          <vs-avatar circle size="100">
            <img :src="imgSrc" alt="" />
          </vs-avatar>
          <h3>{{ groupName }}</h3>
        </div>
      </template>
      <div id="membersTable">
        <h4 id="groupTitle">Usuários no grupo</h4>
        <UsersTable :users="this.users" />
        <h4 id="groupTitle">Usuários fora do grupo</h4>
        <AllUsersTable :groupId="this.id" />
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import UsersTable from "../tables/UsersGroupTable.vue";
import UserDetailIcon from "../icons/UserDetailIcon.vue";
import AllUsersTable from "../tables/AllUsersTable.vue";

export default {
  async beforeMount() {
    try {
      const response = await Axios.get(`/user?groupId=${this.id}`);
      this.users = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  data: () => ({
    active: false,
    users: [],
  }),
  props: {
    imgSrc: String,
    groupName: String,
    id: Number,
  },
  components: {
    UserDetailIcon,
    UsersTable,
    AllUsersTable,
  },
  methods: {
    async onSubmit() {},
  },
};
</script>

<style scope>
.vs-dialog__content {
  display: flex;
  justify-content: center;
}

#inputContent {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-dialog {
  padding-top: 15px;
}
#groupTitle {
  color: #f39f5a;
  align-self: center;
}
#membersTable {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
