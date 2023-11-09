<template>
  <div class="center" id="usersTable">
    <vs-table v-model="selected">
      <template #thead>
        <vs-tr>
          <vs-th> </vs-th>
          <vs-th> Nome </vs-th>
          <vs-th> Email </vs-th>
          <vs-th> Id </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
          <vs-td> </vs-td>
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
    </vs-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    allCheck: false,
    selected: [],
  }),
  props: {
    users: Array,
  },
};
</script>

<style>
#usersTable {
  background-color: #f39f5a;
}
</style>
