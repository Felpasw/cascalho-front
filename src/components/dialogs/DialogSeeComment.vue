<template>
  <div class="center">
    <vs-button @click="active = !active" danger> Ver mais </vs-button>
    <vs-dialog v-model="active">
      <template #header>
        <h4 class="not-margin"></h4>
      </template>

      <div class="commentDetails">
        <vs-avatar size="80">
          <img :src="imageUrl" alt="" />
        </vs-avatar>
        <h1>{{ userName }}</h1>
        <h4 class="content">{{ content }}</h4>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
  }),
  props: {
    content: String,
    imageUrl: String,
    userName: String,
  },
};
</script>

<style>
.content {
  color: #f39f5a;
}
.commentDetails {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
