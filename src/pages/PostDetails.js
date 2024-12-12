import React from 'react'
import {useParams} from 'react-router-dom'
import useFirestore from '../hooks/useFirestore'

const PostDetails = () => {
  const {id} = useParams()
  const {data: posts} = useFirestore('posts')

  const post = posts?.find(post => post.id === id)

  if (!post) {
    return <p>Post not found.</p>
  }

  return (
    <div className='post-details'>
      <h2>{post.title}</h2>
      <p>{post.text}</p>
      {post.images &&
        post.images.map((url, index) => (
          <img key={index} src={url} alt={`Post content ${index + 1}`} />
        ))}
      <p>
        <strong>Posted by:</strong> {post.userName}
      </p>
      <p>
        <strong>Date:</strong> {new Date(post.timestamp).toLocaleString()}
      </p>
    </div>
  )
}

export default PostDetails
