<template>
  <div v-if="render" class="newPublication">
    <vs-input
      id="textarea"
      block
      v-model="description"
      placeholder="No que está pensando?"
    />

    <div id="categoryButtons">
      <DialogNewCategory />
      <vs-select
        placeholder="Selecionar categoria"
        v-model="value"
        id="selectCategory"
      >
        <vs-option
          v-for="category in categories"
          :label="category.name"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </vs-option>
      </vs-select>
    </div>

    <div id="bottomButtons">
      <input
        id="file-input"
        accept=".png, .jpg, .jpeg"
        type="file"
        @change="onFileChange"
      />
      <vs-button @click="onSubmmit" block>
        Enviar

        <template #animate>
          <Send />
        </template>
      </vs-button>
    </div>
  </div>
</template>

<script>
import { Axios } from "../config/axios";
import DialogNewCategory from "./dialogs/dialogNewCategory.vue";
import Send from "./icons/Send.vue";

export default {
  data() {
    return {
      categories: [],
      value: "",
      selectedFile: null,
      description: "",
      render: true,
    };
  },

  components: {
    DialogNewCategory,
    Send,
  },
  async beforeMount() {
    try {
      const response = await Axios.get("/category");
      this.categories = response.data.data;
      console.log(this.categories);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async onSubmmit() {
      try {
        const fd = new FormData();
        fd.append("userId", localStorage.getItem("userId"));
        fd.append("categoryId", this.value);
        fd.append("archive", this.selectedFile);
        fd.append("description", this.description);

        await Axios.post("/publication", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    Rerender() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
  },
};
</script>

<style>
#textarea {
  width: 90%;
  height: 100%;
  margin: 30px;
}
.newPublication {
  display: flex;
  margin: 30px;
  margin-left: 20%;
  border-radius: 30px;
  width: 80%;
  flex-direction: column;
  background-color: #451952;
  justify-content: center;
  align-items: center;
}

input[type="file"]::file-selector-button {
  border-radius: 4px;
  padding: 0 16px;
  height: 40px;
  cursor: pointer;
  background-color: #f39f5a;
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
  margin-right: 16px;
  transition: background-color 200ms;
}

input[type="file"]::file-selector-button:hover {
  background-color: #f3f4f6;
}

input[type="file"]::file-selector-button:active {
  background-color: #e5e7eb;
}
#bottomButtons {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 60%;
  margin: 40px;
  gap: 16px;
}

#categoryButtons {
  display: flex;
  width: 90%;
  justify-content: space-between;
}
#selectCategory {
  color: black;
}
</style>
