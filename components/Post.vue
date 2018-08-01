<template>
  <section class="hero">
    <div class="hero-body">
      <h1 class="title">
        {{ post.attributes.title }}
      </h1>
      <h2 class="subtitle">
        №{{ post.id }}
      </h2>
    </div>
    {{ post.attributes.body }}
  </section>
</template>

<script>
import api from '../src/api/http-connect';
export default {
  data() {
    return {
      post: {
        id: '',
        attributes: {
          title: '',
          body: ''
        }
      },
      errors: []
    }
  },
  async created () {
    this.getPost( this.$route.params.id );
  },
  methods: {
    async getPost (id) {
      this.post = await api.getPost(id)
    },
  }
}
</script>

<style>
  .hero-body {
    padding-left: 0;
    padding-right: 0;
  }
</style>