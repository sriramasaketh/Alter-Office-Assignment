import React from 'react'

const PostCard = ({post}) => {
  return (
    <div className='post-card'>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.images && (
        <div className='post-images'>
          {post.images.map((url, index) => (
            <img key={index} src={url} alt={`Post image ${index + 1}`} />
          ))}
        </div>
      )}
      {post.video && (
        <video controls autoPlay muted>
          <source src={post.video} type='video/mp4' />
        </video>
      )}
    </div>
  )
}

export default PostCard
