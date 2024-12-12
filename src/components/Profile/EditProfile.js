import React, {useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import {updateUserProfile} from '../firebase'
import {useHistory} from 'react-router-dom'

const EditProfile = () => {
  const [bio, setBio] = useState('')
  const [profilePicture, setProfilePicture] = useState(null)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      setBio(user.bio || '')
    }
  }, [user])

  const handleProfilePictureChange = e => {
    setProfilePicture(e.target.files[0])
  }

  const handleBioChange = e => {
    setBio(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateUserProfile(user.uid, bio, profilePicture)
      history.push('/profile')
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='edit-profile-container'>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Profile Picture</label>
          <input
            type='file'
            accept='image/*'
            onChange={handleProfilePictureChange}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea value={bio} onChange={handleBioChange}></textarea>
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default EditProfile
