<template>
  <h1>Details</h1>
  <div v-if="post" class="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
    <button class="delete" @click="deletePost">delete</button>
  </div>
  <div v-else>
    <Spinner></Spinner>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import Spinner from '../components/Spinner'
import getPost from "../composables/getPost"
import { db } from '@/firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';
export default {
  components: { Spinner },
  props: ['id'],
  setup(props) {
    let route = useRoute();
    let router = useRouter();
    let { post, error, load } = getPost(route.params.id);
    load();
    let deletePost = async() => {
      let id = props.id;
      await deleteDoc(doc(db, "posts", id));
      router.push({name:'home'})
    }
    return { post, error, deletePost };
  }
}
</script>

<style>
.post {
  margin: 0 40px 30px;
  padding-bottom: 30px;
  border-bottom: 1px dashed #e7e7e7;
}
.post h2 {
  display: inline-block;
  position: relative;
  font-size: 26px;
  color: white;
  margin-bottom: 10px;
  max-width: 400px;
}
.post h2::before {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: #ff8800;
  position: absolute;
  z-index: -1;
  padding-right: 40px;
  left: -30px;
  transform: rotateZ(-1deg);
}
button.delete{
  margin: 30px auto;
  color: white;
  background: crimson;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
}
</style>