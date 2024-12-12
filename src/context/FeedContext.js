import React, {createContext, useContext, useState, useEffect} from 'react'
import {db} from '../services/firebase'
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from 'firebase/firestore'

const FeedContext = createContext()

export const FeedProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  const [lastDoc, setLastDoc] = useState(null)

  const fetchPosts = async () => {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc'),
        limit(20),
      )
      const snapshot = await getDocs(q)
      const newPosts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setPosts(prev => [...prev, ...newPosts])
      setLastDoc(snapshot.docs[snapshot.docs.length - 1])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  }

  const fetchMorePosts = async () => {
    if (!lastDoc) return

    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc'),
        startAfter(lastDoc),
        limit(20),
      )
      const snapshot = await getDocs(q)
      const newPosts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setPosts(prev => [...prev, ...newPosts])
      setLastDoc(snapshot.docs[snapshot.docs.length - 1])
    } catch (error) {
      console.error('Failed to fetch more posts:', error)
    }
  }

  return (
    <FeedContext.Provider value={{posts, fetchPosts, fetchMorePosts}}>
      {children}
    </FeedContext.Provider>
  )
}

export const useFeed = () => useContext(FeedContext)
