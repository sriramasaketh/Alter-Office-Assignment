import React, {useState, useEffect} from 'react'
import {useAuth} from '../context/AuthContext'
import {getUserProfile} from '../firebase'
import {Link, useParams} from 'react-router-dom'
import MyPosts from '../components/Profile/MyPosts'

const UserProfile = () => {
  const {user} = useAuth()
  const {userId} = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile(userId)
        setProfile(profileData)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!profile) {
    return <div>User profile not found.</div>
  }

  return (
    <div className='user-profile-container'>
      <div className='profile-header'>
        <img
          src={profile.photoURL || 'default-avatar.png'} // Show default avatar if no photoURL
          alt='Profile'
          className='profile-picture'
        />
        <div className='profile-info'>
          <h2>{profile.displayName}</h2>
          <p>{profile.bio}</p>
          {user && user.uid === userId ? (
            <Link to='/edit-profile'>Edit Profile</Link>
          ) : null}
        </div>
      </div>
      <div className='posts-section'>
        <h3>Posts</h3>
        <MyPosts userId={userId} />
      </div>
    </div>
  )
}

export default UserProfile
