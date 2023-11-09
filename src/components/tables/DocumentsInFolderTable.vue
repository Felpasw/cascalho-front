<template>
  <div class="center">
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> Nome </vs-th>
          <vs-th> Criado em </vs-th>
          <vs-th> Id </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getPage(archives, page, max)"
          :data="tr"
        >
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            {{ tr.createdAt }}
          </vs-td>
          <vs-td>
            {{ tr.id }}
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-model="page" :length="$vs.getLength(archives, max)" />
      </template>
    </vs-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    max: 5,
  }),
  beforeMount() {},
  props: {
    archives: Array,
  },
};
</script>

<style>
#alldocumentsTable {
  display: flex;
  flex-direction: column;
  color: #ae445a;
}
</style>
