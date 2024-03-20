import { ref } from "vue";
import { db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

let getPost = (id) => {
  let post = ref(null);
  let error = ref("");
  let load = async () => {
    try {
      let postDoc = await getDoc(doc(db, "posts", id));
      if (postDoc.exists()) {
        post.value = { id: postDoc.id, ...postDoc.data() };
      }
      else {
        error.value = "post not found";
      }
    } catch (err) {
      error.value = err.message;
    }
  }
  return { post, error, load };
}
export default getPost;