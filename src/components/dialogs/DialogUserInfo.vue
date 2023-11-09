<template>
  <div class="center">
    <vs-button @click="active = !active" color="#451952">
      <UserDetailIcon></UserDetailIcon>
    </vs-button>

    <vs-dialog v-model="active">
      <template #header>
        <div id="headerContent">
          <vs-avatar size="100"> <img :src="imgSrc" alt="" /> </vs-avatar>
          <h1>{{ userName }}</h1>
          <div id="titleContent">
            <h3>Comentários</h3>
          </div>
        </div>
      </template>
      <div id="allItens">
        <div class="column">
          <h2 v-if="!comments">Nenhum comentário</h2>
          <div class="cardItem" v-for="comment in comments" :key="comment.id">
            <vs-avatar size="40">
              <img :src="imgSrc" alt="" class="userCommentInfoImg" />
            </vs-avatar>

            <div class="comment">
              <h3 class="userTitleCommentInfo">
                {{
                  userName.length > 16
                    ? userName.split(0, 13) + "..."
                    : userName
                }}
              </h3>
              <p class="commentContent">
                {{
                  comment.content.length > 20
                    ? comment.content.slice(0, 20) + "..."
                    : comment.content
                }}
              </p>
            </div>

            <div class="rowIcon">
              <DialogSeeComment
                :userName="userName"
                :content="comment.content"
                :imageUrl="imgSrc"
              />
              <DeleteComment :id="comment.id" />
            </div>
          </div>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import { Axios } from "../../config/axios";
import UserDetailIcon from "../icons/UserDetailIcon.vue";
import DeleteComment from "../tooltips/DeleteCommentTp.vue";
import DialogSeeComment from "./DialogSeeComment.vue";

export default {
  async beforeMount() {
    const response = await Axios.get(`/comment?userId=${this.id}`);
    this.comments = response.data;
  },
  data: () => ({
    active: false,
    comments: [],
  }),
  components: {
    UserDetailIcon,
    DeleteComment,
    DialogSeeComment,
  },
  props: {
    userName: String,
    imgSrc: String,
    id: Number,
  },
};
</script>

<style>
h1 {
  margin: 0;
  color: #f39f5a;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f39f5a;
  gap: 28px;
  width: 100%;
  max-height: 300px;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

#header-info {
  display: flex;
}

.cardItem {
  color: #f39f5a;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #662549;
  height: 100%;
  width: 80%;
  border-radius: 500px;
  margin: 10px;
  gap: 20px;
}
#commentDisplay {
  display: flex;
  flex-direction: column;
  padding: 0px;
}
#allItens {
  display: flex;
  width: 500px;
}

#titleContent {
  display: flex;
  justify-content: space-between;
  gap: 150px;
}

#headerContent {
  display: flex;
  color: #f39f5a;

  flex-direction: column;
  align-items: center;
}
.userCommentInfo {
  margin: 0px;
}

/* .exitRowIcon .vs-button__content,
.exitRowIcon .vs-button__content svg {
  width: 30px;
  height: 30px;
} */

/* .vs-dialog__content.notFooter,
.column {
  max-height: 220px;
  height: 100%;
} */
.userTitleCommentInfo {
  padding: 0px;
  margin: 0px;
}
.rowIcon {
  display: flex;
  flex-direction: row-reverse;
}
</style>
