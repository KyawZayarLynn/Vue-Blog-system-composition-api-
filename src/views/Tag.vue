<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-if="posts.length">
    <PostsList :posts="filteredPosts"></PostsList>
  </div>
  <div v-else>
    <Spinner/>
  </div>
</template>

<script>
import PostsList from '../components/PostsList'
import { computed } from 'vue';
import Spinner from '../components/Spinner'
import getPosts from '@/composables/getPosts';

export default {
  components: {
    PostsList, Spinner },
  props: ['tag'],
  setup(props) {
    let { posts, error, load } = getPosts();
    load();
    let filteredPosts = computed(() => {
      return posts.value.filter((post) => {
        return post.tags.includes(props.tag)
      })
    });
    return { posts, error,filteredPosts };
  }
}
</script>

<style>

</style>