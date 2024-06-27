<template>
<h>you've been gnomed by id  {{activityId}}, {{activity.title}} </h>
</template>

<script>
export default {
  data() {
    return {
      activityId: null,
      activity: null
    };
  },
  async mounted() {
    // Accessing the id parameter from the route
    this.activityId = this.$route.params.id;
    await this.fetchActivityDetails(this.activityId);
  },
  methods: {
    async fetchActivityDetails(activityId) {
      const activityResponse = await this.$axios.get(`/api/aktivnosti/${activityId}`);

      this.activity = activityResponse.data;
    }
  }
};
</script>

<style scoped>

</style>