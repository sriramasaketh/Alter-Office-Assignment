import {db} from '../firebaseConfig'
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'

export const addPost = async postData => {
  const postsRef = collection(db, 'posts')
  await addDoc(postsRef, postData)
}

export const fetchPosts = async lastVisible => {
  const postsRef = collection(db, 'posts')
  const postsQuery = lastVisible
    ? query(
        postsRef,
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(20),
      )
    : query(postsRef, orderBy('createdAt', 'desc'), limit(20))

  const querySnapshot = await getDocs(postsQuery)
  const posts = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  const last = querySnapshot.docs[querySnapshot.docs.length - 1]
  return {posts, last}
}
