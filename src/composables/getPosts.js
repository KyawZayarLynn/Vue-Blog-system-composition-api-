import {db} from "../firebase/config"
import { ref } from 'vue';
import { collection,getDocs, orderBy, query } from "firebase/firestore";

let getPosts = () => {
  let posts = ref([]);
    let error = ref("");
    let load = async () => {
      try {
        let q = query(collection(db, "posts"), orderBy("created_at", "desc"));
        let querySnapshot = await getDocs(q);
        posts.value = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        });
      } catch (err) {
        error.value = err.message;
      }
  }
  return { posts,error,load };
}
export default getPosts;