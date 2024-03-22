<template>
  <h1>Create</h1>
  <form @submit.prevent="addPost">
    <label>Title:</label>
    <input type="text" required v-model="title">
    <label>Body:</label>
    <textarea cols="30" rows="10" required v-model="body"></textarea>
    <label>Tags(hit enter to add a tag)</label>
    <input type="text" v-model="tag" @keydown.enter.prevent="handleKeydown">
    <button>Add post</button>
    <div class="pill" v-for="tag in tags" :key="tag">
      {{ tag }}
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { db,timestamp } from '@/firebase/config';
import { addDoc,collection } from 'firebase/firestore';

export default {
  setup() {
    let router = useRouter();
    let title = ref("");
    let body = ref("");
    let tag = ref("");
    let tags = ref([]);

    let handleKeydown = () => {
      if (tag.value.trim() !== '') {
        if (!tags.value.includes(tag.value)) {
        tags.value.push(tag.value)
      }
      tag.value=""
      }
    }

      let addPost = async () => {
        let newPost = {
            title: title.value,
            body: body.value,
            tags: tags.value,
            created_at: timestamp,
      }
        let post = await addDoc(collection(db, "posts"),newPost)
      router.push({ name: 'home' });
    }

    return { title, body, tag,handleKeydown,tags,addPost };
  }
}
</script>

<style>
form{
  background: white;
  padding: 20px;
  border-radius: 10px;
}
label{
  display: block;
  color: #bbb;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 20px 0 10px 0;
}
input{
  padding: 10px;
  border: 1px solid #ddd;
  width: 70%;
  box-sizing: border-box;
}
textarea{
  border: 1px solid #ddd;
  padding: 10px;
  width: 70%;
  box-sizing: border-box;
  height: 100px;
}
form button{
  display: block;
  margin: 20px auto 0;
  background: #00ce89;
  color: white;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  font-size: 16px;
}
.pill{
  display: inline-block;
  margin: 10px 10px 0 0;
  color: #444;
  background: #ddd;
  padding: 8px;
  border-radius: 20px;
  font-size: 14px;
}
</style>