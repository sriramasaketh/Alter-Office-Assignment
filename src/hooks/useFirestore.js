import {useEffect, useState} from 'react'
import {db} from '../firebase'
import {collection, query, orderBy, limit, getDocs} from 'firebase/firestore'

const useFirestore = (collectionName, limitNumber = 20) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy('timestamp', 'desc'),
          limit(limitNumber),
        )
        const querySnapshot = await getDocs(q)
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setData(docs)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName, limitNumber])

  return {data, loading, error}
}

export default useFirestore
