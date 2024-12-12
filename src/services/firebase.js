import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
  measurementId: 'your-measurement-id',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export const firestore = firebase.firestore()

export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await auth.signInWithPopup(googleProvider)
    const user = result.user
    console.log('User signed in with Google:', user)
    return user
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

export const createPostInFirestore = async postData => {
  try {
    const postsRef = firestore.collection('posts')
    await postsRef.add(postData)
    console.log('Post created successfully!')
  } catch (error) {
    console.error('Error creating post in Firestore:', error)
    throw error
  }
}

export const fetchPostsFromFirestore = async (page = 1, limit = 20) => {
  try {
    const postsRef = firestore.collection('posts')
    const snapshot = await postsRef
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get()

    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    return posts
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error)
    throw error
  }
}

export const getUserProfileFromFirestore = async userId => {
  try {
    const userDoc = await firestore.collection('users').doc(userId).get()
    if (userDoc.exists) {
      return userDoc.data()
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error('Error fetching user profile from Firestore:', error)
    throw error
  }
}
