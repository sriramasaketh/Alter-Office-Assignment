import React, {useState} from 'react'
import {createPostInFirestore} from '../firebase'
import {useAuth} from '../context/AuthContext'

const PostForm = () => {
  const {user} = useAuth()
  const [postText, setPostText] = useState('')
  const [images, setImages] = useState([])
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTextChange = event => {
    setPostText(event.target.value)
  }

  const handleImageChange = event => {
    const files = event.target.files
    if (files) {
      setImages([...images, ...Array.from(files)])
    }
  }

  const handleVideoChange = event => {
    const file = event.target.files[0]
    if (file) {
      setVideo(file)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (postText.trim() === '') {
      alert('Please enter some text for your post.')
      return
    }

    setLoading(true)

    const newPost = {
      userId: user.uid,
      text: postText,
      images: images,
      video: video,
      timestamp: new Date(),
    }

    try {
      await createPostInFirestore(newPost)

      setPostText('')
      setImages([])
      setVideo(null)
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='post-form-container'>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className='post-text'
          placeholder="What's on your mind?"
          value={postText}
          onChange={handleTextChange}
        />

        <div className='file-inputs'>
          <input
            type='file'
            multiple
            accept='image/*'
            onChange={handleImageChange}
          />
          <input type='file' accept='video/*' onChange={handleVideoChange} />
        </div>

        <button type='submit' disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </button>
      </form>

      {images.length > 0 && (
        <div className='preview-images'>
          {images.map((image, index) => (
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`preview ${index}`}
              className='preview-image'
            />
          ))}
        </div>
      )}

      {video && (
        <div className='preview-video'>
          <video controls>
            <source src={URL.createObjectURL(video)} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  )
}

export default PostForm
