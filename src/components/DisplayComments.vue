<template>
  <div>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="commentDisplayPublication"
    >
      <vs-avatar size="40">
        <a :href="`/user/${comment.userId}`">
          <img :src="imagebaseUrl + comment.imgSrc" alt="" />
        </a>
      </vs-avatar>
      <div class="comment">
        <h3 class="userTitleComment">{{ comment.userName }}</h3>
        <p class="commentContent">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagebaseUrl: import.meta.env.VITE_API_BASE_URL + "/static/images/",
    };
  },

  props: {
    comments: Array,
  },
};
</script>

<style>
.userTitleComment {
  margin: 0px;
}

#commentDisplayPublication {
  display: flex;

  flex-direction: row;
}
.commentDisplayPublication {
  display: flex;
  gap: 12px;
  margin-bottom: 2px;
  align-items: center;
  color: #f39f5a;
}
.commentContent {
  margin: 0px;
}
.comment {
  display: flex;
  margin-right: 4px;
  flex-direction: column;
  margin: 0px;
}
</style>
