import {db} from "../firebase/config"
import { ref } from 'vue';
import { collection,getDocs } from "firebase/firestore";

let getPosts = () => {
  let posts = ref([]);
    let error = ref("");
    let load = async () => {
      try {
        let querySnapshot = await getDocs(collection(db, "posts"));
        posts.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (err) {
        error.value = err.message;
      }
  }
  return { posts,error,load };
}
export default getPosts;