<template>
  <div class="center" id="alldocumentsTable">
    <vs-table v-model="selected">
      <template #thead>
        <vs-tr>
          <vs-th>
            <vs-checkbox
              :indeterminate="selected.length == documents.length"
              v-model="allCheck"
              @change="selected = $vs.checkAll(selected, documents)"
            />
          </vs-th>
          <vs-th> Nome </vs-th>
          <vs-th> Criado em </vs-th>
          <vs-th> Id </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getPage(documents, page, max)"
          :data="tr"
          :is-selected="!!selected.includes(tr)"
        >
          <vs-td checkbox>
            <vs-checkbox :val="tr" v-model="selected" id="checkbox" />
          </vs-td>
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
        <vs-pagination v-model="page" :length="$vs.getLength(documents, max)" />
      </template>
    </vs-table>
    <vs-button @click="onSubmit"> Adicionar </vs-button>
  </div>
</template>
<script>
import { Axios } from "../../config/axios";

export default {
  async beforeMount() {
    const responseDocuments = (
      await Axios.get(`/document?userId=${localStorage.getItem("userId")}`)
    ).data;

    const pendingPromises = await responseDocuments.map(async (document) => {
      const response = await Axios.get(`/archive/${document.archiveId}`);
      return {
        ...response.data,
        documentId: document.id,
        folderId: document.folderId,
      };
    });
    const documentsUnfiltered = await Promise.all(pendingPromises);

    this.documents = documentsUnfiltered.filter(
      (document) => document.folderId != this.folderId
    );
  },
  methods: {
    async onSubmit() {
      try {
        const pendingPromises = [];
        this.selected.forEach((archive) => {
          pendingPromises.push(
            Axios.put(`/document/${archive.documentId}`, {
              folderId: this.folderId,
            })
          );
        });
        await Promise.all(pendingPromises);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
  data: () => ({
    allCheck: false,
    page: 1,
    max: 5,
    selected: [],
    documents: [],
  }),
  props: {
    folderId: Number,
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
