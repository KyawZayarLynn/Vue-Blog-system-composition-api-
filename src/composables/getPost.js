import { ref } from "vue";

let getPost = (id) => {
  let post = ref(null);
  let error = ref("");
  let load = async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      let response = await fetch('http://localhost:3000/posts/' + id);
      if (response.status === 404) {
        throw new Error('Not Found');
      }
      let data = await response.json();
      post.value = data;
    } catch (err) {
      error.value = err.message;
    }
  }
  return { post, error, load };
}
export default getPost;