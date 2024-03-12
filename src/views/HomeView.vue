<template>
  <div class="home">
    <div v-if="error">
      {{ error }}
    </div>
    {{ posts.length }}
    <div v-if="posts.length>0" class="layout">
      <div>
        <PostsList :posts="posts"></PostsList>
      </div>
      <div>
        <TagCloud :posts="posts"/>
      </div>
    </div>
    <div v-else>
      <Spinner></Spinner>
    </div>
  </div>
</template>

<script>
import TagCloud from '../components/TagCloud'
import Spinner from '../components/Spinner'
import PostsList from '../components/PostsList'
import getPosts from '../composables/getPosts';

export default {
  components: {
    TagCloud,
    Spinner, PostsList
  },
  setup() {
      let { posts, error, load } = getPosts();
      const blogs =  load().then((data)=>data);
      console.log(blogs)
      return {posts,error}
  }
}
</script>
<style>
.home{
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
.layout{
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}
</style>