import React from 'react'
import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import FeedPage from './FeedPage'

const Home = () => {
  const {user} = useAuth()

  return (
    <div className='home'>
      {user ? (
        <FeedPage />
      ) : (
        <div className='welcome-section'>
          <h1>Welcome to SocialFeed</h1>
          <p>Discover, share, and connect with people worldwide!</p>
          <div className='auth-buttons'>
            <Link to='/login' className='btn btn-primary'>
              Login
            </Link>
            <Link to='/register' className='btn btn-secondary'>
              Register
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
