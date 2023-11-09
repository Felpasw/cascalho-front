<template>
  <div :v-if="render" id="AddNewCategory">
    <vs-button @click="active = !active">
      Ver mais
      <template #animate>
        <InfoCircle />
      </template>
    </vs-button>
    <vs-dialog v-model="active" id="publicationDIalog">
      <div>
        <div id="headerPublication">
          <vs-avatar size="50">
            <img :src="imagebaseUrl + user.image" alt="" />
          </vs-avatar>
          <h2>{{ user.name }}</h2>
        </div>
        <img :src="this.imageUrl" id="imagePublication" />
        <h3 style="color: #f39f5a">{{ publication.description }}</h3>

        <DisplayComments :v-if="render" :comments="comments" />

        <div id="commentInput">
          <vs-avatar>
            <img :src="imagebaseUrl + userImage" alt="" />
          </vs-avatar>
          <vs-input
            type="text"
            placeholder="Comente algo..."
            v-model="content"
          ></vs-input>
          <vs-button @click="onSubmit">
            Comentar
            <template #animate>
              <Send />
            </template>
          </vs-button>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import { errorMessage, successMessage } from "../../utils/messageProperties";
import DisplayComments from "../DisplayComments.vue";
import InfoCircle from "../icons/InfoCircle.vue";
import Send from "../icons/Send.vue";

export default {
  async beforeMount() {
    const response = await Axios.get(`/publication/${this.publicationId}`);
    this.publication = response.data;
    console.log(this.publication);
    const userResponse = await Axios.get(`/user/${response.data.userId}`);
    this.user = userResponse.data;
    const userLogedResponse = await Axios.get(
      `/user/${localStorage.getItem("userId")}`
    );
    this.userImage = userLogedResponse.data.image;
    const responseComment = await Axios.get(
      `/comment?publicationId=${this.publicationId}`
    );
    if (responseComment.data) {
      responseComment.data.forEach(async (element) => {
        const userResponse = await Axios.get(`/user/${element.userId}`);
        console.log(userResponse);
        this.comments.push({
          ...element,
          imgSrc: userResponse.data.image,
          userName: userResponse.data.name,
          userId: userResponse.data.id,
        });
      });
    }
  },
  data: () => ({
    active: false,
    name: "",
    publication: {},
    user: {},
    content: "",
    comments: [],
    render: true,
    userImage: "",
    imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
  }),
  methods: {
    async onSubmit() {
      try {
        await Axios.post(`/comment`, {
          content: this.content,
          publicationId: this.publicationId,
          userId: localStorage.getItem("userId"),
        });
        this.$vs.notification(successMessage);
        this.reRender();
      } catch (error) {
        console.log(error);
        this.$vs.notification(errorMessage);
      }
    },
    reRender() {
      this.render = false;
      this.active = false;
      this.$nextTick(() => {
        this.active = false;
        this.render = true;
      });
    },
  },
  components: { DisplayComments, InfoCircle, Send },
  props: {
    publicationId: Number,
    imageUrl: String,
  },
};
</script>

<style>
#headerPublication {
  color: #f39f5a;
  align-self: flex-start;
  display: flex;

  justify-content: baseline;
  align-items: center;
  gap: 20px;
}
#publicationDIalog {
  display: flex;
  flex-direction: column;
}
#imagePublication {
  width: 700px;
  max-height: 400px;
}
#commentInput {
  display: flex;
  width: 100%;
  gap: 16px;
  justify-content: flex-start;
  align-items: end;
}
</style>
