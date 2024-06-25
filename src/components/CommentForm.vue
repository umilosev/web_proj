<template>
  <div>
    <h3>Add a Comment</h3>
    <form @submit.prevent="submitComment">
      <label>Name:</label>
      <input type="text" v-model="comment.name" required>
      <label>Comment:</label>
      <textarea v-model="comment.text" required></textarea>
      <button type="submit">Add Comment</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['articleId'],
  data() {
    return {
      comment: {
        name: '',
        text: '',
      },
    };
  },
  methods: {
    async submitComment() {
      try {
        const commentData = {
          autorKomentara: this.comment.name,
          tekst: this.comment.text,
          datumKreiranja: new Date().toISOString(),
          clanakId: this.articleId,
        };

        console.log(`Submitting comment to /api/komentari/clanak/${this.articleId}`, commentData);

        await this.$axios.post(`api/komentari/clanak/${this.articleId}`, commentData);

        this.$emit('comment-added');  // Emit an event when a comment is added
        this.comment.name = '';
        this.comment.text = '';
        window.location.reload();
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    }
  }
};
</script>
