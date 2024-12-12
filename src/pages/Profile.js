import React, {useState} from 'react'
import {useAuth} from '../../context/AuthContext'
import {useFeed} from '../../context/FeedContext'

const Profile = () => {
  const {user} = useAuth()
  const {posts} = useFeed()
  const [editMode, setEditMode] = useState(false)
  const [bio, setBio] = useState(user?.bio || '')

  const handleSave = () => {
    // Add logic to update the user's bio in Firestore
    setEditMode(false)
  }

  return (
    <div className='profile-page'>
      <img src={user?.photoURL} alt='Profile' className='profile-picture' />
      <h2>{user?.displayName}</h2>
      <p>{user?.email}</p>
      {editMode ? (
        <div>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder='Update your bio...'
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <p>{bio || 'No bio available'}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
      <h3>My Posts</h3>
      <div className='user-posts'>
        {posts
          .filter(post => post.userId === user?.uid)
          .map(post => (
            <div key={post.id} className='user-post'>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Profile
