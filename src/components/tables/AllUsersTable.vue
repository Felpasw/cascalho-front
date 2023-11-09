<template>
  <div>
    <div class="center" id="allUsersTable">
      <vs-table v-model="selected">
        <template #thead>
          <vs-tr>
            <vs-th>
              <vs-checkbox
                :indeterminate="selected.length == users.length"
                v-model="allCheck"
                @change="selected = $vs.checkAll(selected, users)"
              />
            </vs-th>
            <vs-th> Name </vs-th>
            <vs-th> Email </vs-th>
            <vs-th> Id </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr
            :key="i"
            v-for="(tr, i) in $vs.getPage(users, page, max)"
            :data="tr"
            :is-selected="!!selected.includes(tr)"
          >
            <vs-td checkbox class="checkBox">
              <vs-checkbox :val="tr" v-model="selected" id="checkbox" />
            </vs-td>
            <vs-td>
              {{ tr.name }}
            </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>
            <vs-td>
              {{ tr.id }}
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(users, max)" />
        </template>
      </vs-table>
    </div>
    <vs-button @click="onSubmit" block id="addBtn"> Adicionar </vs-button>
  </div>
</template>
<script>
import { Axios } from "../../config/axios";

export default {
  async beforeMount() {
    const response = await Axios.get("/user");

    this.users = response.data.data.filter(
      (user) => user.groupId != this.groupId
    );
  },
  data: () => ({
    allCheck: false,
    page: 1,
    max: 5,
    selected: [],
    users: [],
  }),
  props: {
    groupId: Number,
  },
  methods: {
    async onSubmit() {
      try {
        const pendingPromises = [];
        this.selected.forEach((user) => {
          pendingPromises.push(
            Axios.put(`/user/${user.id}`, { groupId: this.groupId })
          );
        });
        await Promise.all(pendingPromises);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
#allUsersTable {
  display: flex;
  flex-direction: column;
  color: #ae445a;
}
#addBtn {
  margin-top: 30px;
}
</style>
